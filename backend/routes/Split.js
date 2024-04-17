const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: process.env.SMTP_PORT,
  // secure: false,
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

router.post('/getgroup', async (req, res) => {
  try {
    const userId = req.body.id;
    // console.log(req.body)
    // Validate userId
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Proceed with database query
    const user = await User.findById(userId);
    const user_grp = user.groups;
    const grp_arr = [];

    for (let i = 0; i < user_grp.length; i++) {
      const grp = await Group.findById(user_grp[i].group);
      grp_arr.push(grp);
    }

    res.status(200).json({ group: grp_arr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getmember', async (req, res) => {
  try {
    const gId = req.body.id;
    const grp_arr = await Group.findById(gId);
    const arr = [];

    await Promise.all(grp_arr.members.map(async (userId) => {
      const user = await User.findById(userId);
      arr.push(user);
    }));

    res.status(200).json({ members: arr, name: grp_arr.groupName });
  } catch (error) {
    console.error('Error fetching group members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ...

router.post('/split/:groupId', async (req, res) => {
  try {

    const group = await Group.findById(req.params.groupId);
    const groupMemberCount = group.members.length;
    const amount = req.body.amount / groupMemberCount;
    const currUserId = req.body.id;

    for (const member of group.members) {
      const user = await User.findById(member);

      let groupIndex;
      for (let i = 0; i < user.groups.length; i++) {
        if (user.groups[i].group == req.params.groupId) {
          groupIndex = i;
          break;
        }
      }

      if (user._id == currUserId) {
        let cAmount = req.body.amount - amount;
      //   if (user.groups[groupIndex].owe >= cAmount) {
      //     user.groups[groupIndex].owe -= cAmount;
      //   } else {
      //     user.groups[groupIndex].lent += cAmount - user.groups[groupIndex].owe;
      //     user.groups[groupIndex].owe = 0;
      //   }

      //   await user.save();

      //   // Send email notification to the user
      //   const subject = 'Split Successful';
      //   const message = `Amount has been split successfully in group ${group.groupName}. You now owe ${user.groups[groupIndex].owe} and lent ${user.groups[groupIndex].lent}.`;

      //   const mailOptions = {
      //     from: process.env.SMTP_USER,
      //     to: user.email,
      //     subject,
      //     text: message,
      //   };

      //   await transporter.sendMail(mailOptions);

      //   continue;
      // }

      if (user.groups[groupIndex].lent >= amount) {
        user.groups[groupIndex].lent -= amount;
      } else {
        user.groups[groupIndex].owe += amount - user.groups[groupIndex].lent;
        user.groups[groupIndex].lent = 0;
      }
      await user.save();

      // Send email notification to the user
      const subject = 'Split Successful';

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject,
        html: `
        <html>
        <head>
          <style>
            body {
              font-family: Arial, helvetica;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
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
              font-weight: 500;
              font-size: 18px;
              margin-bottom: 20px; /* Add margin bottom */
            }
            .details {
              margin-top: 20px; /* Adjust margin top */
            }
            .details p {
              margin: 0;
              font-size: 16px;
              font-weight: bold;
            }
            .details span {
              font-weight: normal;
            }
            .contact {
              margin-top: 20px; /* Adjust margin top */
              text-align: center;
            }
            .contact a {
              color: #007bff; /* Change link color */
              text-decoration: none;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <img src="cid:logo" alt="Logo">
            </div>
            <div class="content">
              Dear Member,
        
              We're pleased to inform you that the amount has been successfully split within the group "<strong>${group.groupName}</strong>". Your updated financial details are as follows:
            </div>
            <div class="details">
              <p>You now owe: <span>${user.groups[groupIndex].owe}</span></p>
              <p>You have lent: <span>${user.groups[groupIndex].lent}</span></p>
            </div>
            <div class="content">
              For any queries or assistance, feel free to reach out to us at <a href="mailto:monagexteam@gmail.com">monagexteam@gmail.com</a>.
              
              Best regards,<br>
              MonageX Team
            </div>
          </div>
        </body>
        </html>        
      `,
  attachments: [{
    filename: 'vlogo1.jpg',
    path: 'public/images/vlogo1.jpg',
    cid: 'logo' // same cid value as in the src attribute of the img tag
  }]
      };

      await transporter.sendMail(mailOptions);
    }
  }

    res.json({ message: 'Successfully updated owe and lent fields for all members of the group' });
  } catch (error) {
    console.error('Error updating owe and lent fields:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/settle/:groupId', async (req, res) => {
  try {
    // console.log(req.params.groupId);
    // console.log(req.body.id);
    const group = await Group.findById(req.params.groupId);
    const amount = req.body.amount;
    const userId = req.body.id;
    const user = await User.findById(userId);

    let groupIndex;
    for (let i = 0; i < user.groups.length; i++) {
      if (user.groups[i].group == req.params.groupId) {
        groupIndex = i;
        break;
      }
    }

    user.groups[groupIndex].owe -= amount;

    if(user.groups[groupIndex].owe>=0){
    await user.save();

    // Send email notification to the user
    const subject = 'Settle Successful';

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject,
      html: `
      <html>
      <head>
        <style>
          body {
            font-family: Arial, helvetica;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
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
            font-weight: 500;
            font-size: 18px;
            margin-bottom: 20px; /* Add margin bottom */
          }
          .btn {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
          }
          /* Added new styles */
          .details {
            margin-top: 20px; /* Adjust margin top */
          }
          .details p {
            margin: 0;
            font-weight: bold;
          }
          .details span {
            font-weight: normal;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <img src="cid:logo" alt="Logo">
          </div>
          <div class="content">
            Dear Member,

            We're delighted to inform you that the amount has been successfully settled within the group "<strong>${group.groupName}</strong>". Your updated financial details are as follows:
          </div>
          <div class="details">
            <p>You now owe: <span>${user.groups[groupIndex].owe}</span></p>
            <p>You have lent: <span>${user.groups[groupIndex].lent}</span></p>
          </div>
          <div class="content">
            For any further assistance, don't hesitate to contact us at <a href="mailto:monagexteam@gmail.com">monagexteam@gmail.com</a>.
            
            Best regards,<br>
            MonageX Team
          </div>
        </div>
      </body>
      </html>

    `,
    attachments: [{
      filename: 'vlogo1.jpg',
      path: 'public/images/vlogo1.jpg',
      cid: 'logo' // same cid value as in the src attribute of the img tag
    }]
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Successfully updated owe field for the user' });
  }
else{
  res.json({ message: 'Cannot update "owe" field as owe is 0' })
}

}
   catch (error) {
    console.error('Error updating "owe" field:', error);
    res.status(500).json({ error: 'Internal Server Error' });

}
});

// ...

module.exports = router;