const nodemailer = require('nodemailer');
const User = require('../models/User'); // Adjust the path to your User model
require('dotenv').config();

// Function to send notification emails
const sendNotificationEmail = async (email, description, amount, borrowers, yourShare, date, htmlContent, attachments) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.SMTP_USER, // Your Gmail address
      pass: process.env.SMTP_PASS, // Your Gmail password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Monagex: Expense Split",
    html: htmlContent,
    attachments: attachments,
  };

  await transporter.sendMail(mailOptions);
};

// Function to send group notifications
const sendGroupNotification = async (group, loggedInUserId, description, amount, borrowers, yourShare, date) => {
  try {
    const loggedInUser = await User.findById(loggedInUserId);
    if (!loggedInUser) {
      console.log(`User with ID ${loggedInUserId} not found`);
      return;
    }

    const memberEmails = [];
    const loggedInUserEmail = loggedInUser.email;
    const borrowername = loggedInUser.username;
    memberEmails.push(loggedInUserEmail);

    const borrowerDetails = [];
    const groupName = group.groupName;

    for (const borrowerId in borrowers) {
      const user = await User.findById(borrowerId).exec();
      if (user) {
        borrowerDetails.push({ username: user.username, share: borrowers[borrowerId] });
        memberEmails.push(user.email);
      } else {
        console.log(`User with ID ${borrowerId} not found`);
        // Send a fake email to Mailtrap for non-existing users
        await sendFakeEmailToMailtrap(`user${borrowerId}@example.com`);
      }
    }

    const htmlContent = `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            text-align: center;
          }
          p {
            color: #666;
            margin-bottom: 10px;
          }
          ul {
            list-style-type: none;
            padding-left: 0;
          }
          li {
            margin-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
          }
          .logo {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo img {
            width: 100px;
            height: auto;
          }
        </style>
      </head>
      <body>
        
        <div class="container">
        <div class="logo">
          <img src="cid:logo" alt="Company Logo">
        </div>
          <h1>🌟 Monagex Notification - Expense Split 🌟</h1>
          <p>Hello✨,</p>
          <p>We're thrilled to inform you that you've successfully split an expense in your Monagex group. Here's a glimpse of the details:</p>
          <ul>
            <li>👥 <strong>Group:</strong> ${groupName}</li>
            <li>💸 <strong>Amount Split:</strong> ₹ ${amount}</li>
            <li>🤝 <strong>${borrowername}'s Share:</strong> ₹ ${yourShare}</li>
            <li>📝 <strong>Description:</strong> ${description}</li>
          </ul>
          <p><strong>Shares of Other Members:</strong></p>
          <table>
            <thead>
              <tr>
                <th>Member</th>
                <th>Share</th>
              </tr>
            </thead>
            <tbody>
              ${borrowerDetails.map(borrower => `
                <tr>
                  <td>${borrower.username}</td>
                  <td>₹ ${borrower.share}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <p>Keep enjoying seamless expense management with Monagex! 🎉</p>
          <p>Notification sent on: ${date}</p>
        </div>
      </body>
      </html>
      `;

    const attachments = [{
      filename: 'vlogo1.jpg',
      path: 'public/images/vlogo1.jpg',
      cid: 'logo' // same cid value as in the src attribute of the img tag
    }];

    for (const email of memberEmails) {
      await sendNotificationEmail(email, description, amount, borrowers, yourShare, date, htmlContent, attachments);
    }
  } catch (error) {
    console.error('Error sending group notification:', error);
  }
};

// Function to send fake email to Mailtrap for non-existing users
const sendFakeEmailToMailtrap = async (email) => {
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
    subject: 'Fake Email Notification',
    html: '<p>This is a fake email sent because the user does not exist.</p>',
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendGroupNotification,
  sendNotificationEmail,
};
