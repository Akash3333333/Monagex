const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group = require('../models/Group');
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // Replace with your SMTP host
  port: process.env.SMTP_PORT, // Replace with your SMTP port
  auth: {
    user: process.env.SMTP_USER, // Replace with your SMTP username
    pass: process.env.SMTP_PASS, // Replace with your SMTP password
  },
});

router.post('/getgroup', async (req, res) => {
  try {
    const userId = req.body.id;
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
        if (user.groups[groupIndex].owe >= cAmount) {
          user.groups[groupIndex].owe -= cAmount;
        } else {
          user.groups[groupIndex].lent += cAmount - user.groups[groupIndex].owe;
          user.groups[groupIndex].owe = 0;
        }
        await user.save();

        // Send email notification to the user
        const subject = 'Split Successful';
        const message = `Amount has been split successfully in group ${group.groupName}. You now owe ${user.groups[groupIndex].owe} and lent ${user.groups[groupIndex].lent}.`;

        const mailOptions = {
          from: process.env.SMTP_USER,
          to: user.email,
          subject,
          text: message,
        };

        await transporter.sendMail(mailOptions);

        continue;
      }

      if (user.groups[groupIndex].lent >= amount) {
        user.groups[groupIndex].lent -= amount;
      } else {
        user.groups[groupIndex].owe += amount - user.groups[groupIndex].lent;
        user.groups[groupIndex].lent = 0;
      }
      await user.save();

      // Send email notification to the user
      const subject = 'Split Successful';
      const message = `Amount has been split successfully in group ${group.groupName}. You now owe ${user.groups[groupIndex].owe} and lent ${user.groups[groupIndex].lent}.`;

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject,
        text: message,
      };

      await transporter.sendMail(mailOptions);
    }

    res.json({ message: 'Successfully updated "owe" and "lent" fields for all members of the group' });
  } catch (error) {
    console.error('Error updating "owe" and "lent" fields:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/settle/:groupId', async (req, res) => {
  try {
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
    await user.save();

    // Send email notification to the user
    const subject = 'Settle Successful';
    const message = `Amount has been settled successfully in group ${group.groupName}. You now owe ${user.groups[groupIndex].owe} and lent ${user.groups[groupIndex].lent}.`;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Successfully updated "owe" field for the user' });
  } catch (error) {
    console.error('Error updating "owe" field:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ...

module.exports = router;
