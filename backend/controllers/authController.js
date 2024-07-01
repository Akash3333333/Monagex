// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');
require('dotenv').config();

const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.signup = async (req, res) => {
  try {
    const { username, email, password, cpassword } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
      cpassword: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ email: user.email, userId: user._id }, jwtSecretKey, { expiresIn: '1h' });
   
    res.status(201).json({ message: 'User registered successfully', token, userId: user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const expiresIn = '1h';
  
    res.json({ token , user, expiresIn });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

function generateResetToken(email) {
  return jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: '1hr' });
}

async function saveResetTokenToUser(user, resetToken) {
  user.resetToken = resetToken;
  await user.save();
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("fp - " + email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      await sendResetEmailToMailtrap(email);
      return res.status(404).json({ message: 'If an account with this email exists, a password reset link has been sent to it. Please check your inbox.' });
    }

    const resetToken = generateResetToken(user.email);
    await saveResetTokenToUser(user, resetToken);
    await sendResetEmailToUser(email, resetToken);

    res.json({ message: 'If an account with this email exists, a password reset link has been sent to it. Please check your inbox.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing your request. Please try again later.' });
  }
};

async function sendResetEmailToUser(email, resetToken) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Reset Your Password',
    html: `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            width: 150px;
            height: auto;
          }
          .content {
            text-align: justify;
            font-size: 16px;
            line-height: 1.6;
            color: #2c2d31;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            background-color: #2c2d31;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="cid:logo" alt="Logo">
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>You have requested to reset your password. Please click the button below to reset your password:</p>
            <p style="text-align: center; color:'#fff"><a class="btn" style="color:#fff;" href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a></p>
            <p>If you did not request this, you can safely ignore this email.</p>
            <p>Regards,<br>MonageX Team</p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [{
      filename: 'vlogo1.jpg',
      path: 'public/images/vlogo1.jpg',
      cid: 'logo'
    }]
  };

  await transporter.sendMail(mailOptions);
}

async function sendResetEmailToMailtrap(email) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Password Reset (Fake)',
    html: '<p>This email was sent to a non-existing user for password reset.</p>',
  };

  await transporter.sendMail(mailOptions);
}

exports.resetPassword = async (req, res) => {
  const resetToken = req.params.token;
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found or invalid token' });
    }
    
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const tokenExpireTimestamp = jwt.decode(resetToken).exp * 1000;

    if (currentTimestamp > tokenExpireTimestamp) {
      return res.status(400).json({ message: 'Token has expired' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.cpassword = hashedPassword;
    user.resetToken = null;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error during logout' });
  }
};
