const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Group=require('../models/Group');

router.post('/getgroup', async (req, res) => {
  try {

    const userId = req.body.id;
    // console.log("hi");
    // console.log(userId);

    const user = await User.findById(userId);

    // console.log(user);
    const user_grp = user.groups;
    const grp_arr = [];

    for (let i = 0; i < user_grp.length; i++) {
      const grp = await Group.findById(user_grp[i].group);
      grp_arr.push(grp);
    }

    console.log(grp_arr);

    res.status(200).json({ group: grp_arr });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/getmember', async (req, res) => {
  try {
    const gId = req.body.id;

    // Assuming Group.findById returns a promise
    const grp_arr = await Group.findById(gId);

    const arr = [];

    // Use Promise.all to wait for all user queries to complete
    await Promise.all(grp_arr.members.map(async (userId) => {
      const user = await User.findById(userId);
      arr.push(user);
    }));


    res.status(200).json({ members: arr,name:grp_arr.groupName });
  } catch (error) {
    console.error('Error fetching group members:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



router.post('/split/:groupId', async (req, res) => {
  try {
    const group = await Group.findById(req.params.groupId);//Group
    const groupMemberCount = group.members.length;//length of grp
    const amount = req.body.amount / groupMemberCount;//Done
    const currUserId=req.body.id;//Log usre id
    for (const member of group.members) {

      const user = await User.findById(member);//Id ka user
      let groupIndex;
      for (let i = 0; i < user.groups.length; i++) {
        console.log(user.groups[i].group+' '+req.params.groupId)
        if (user.groups[i].group == req.params.groupId) {
          groupIndex=i;
          break;
        }
      }

      if(user._id==currUserId){
        let cAmount=req.body.amount-amount;
        if (user.groups[groupIndex].owe >=cAmount) {
          user.groups[groupIndex].owe -= cAmount;
        } else {
          user.groups[groupIndex].lent += cAmount - user.groups[groupIndex].owe;


          user.groups[groupIndex].owe = 0;
        }
        await user.save();
        continue;
      }
      if (user.groups[groupIndex].lent >=amount) {
        user.groups[groupIndex].lent -= amount;
      } else {
        user.groups[groupIndex].owe += amount - user.groups[groupIndex].lent;
        user.groups[groupIndex].lent = 0;
      }
      await user.save();

    }
    res.json({ message: 'Successfully updated "owe" and "lent" fields for all members of group' });
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
        console.log(user.groups[i].group+' '+req.params.groupId)
        if (user.groups[i].group == req.params.groupId) {
          groupIndex=i;
          break;
        }
      }

      user.groups[groupIndex].owe -= amount;  
      // Save the updated user document
      await user.save();
 
      res.json({ message: 'Successfully updated "owe" field for the user' });
    } catch (error) {
      console.error('Error updating "owe" field:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;
