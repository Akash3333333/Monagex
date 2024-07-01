const User = require('../models/User');

// Send friend request
exports.sendFriendRequest = async (req, res) => {
  const { to_be_added } = req.body;
  const userId=req.user.id;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(to_be_added);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if a request has already been sent or they are already friends
    if (user.sent.includes(to_be_added) || user.friends.includes(to_be_added)) {
      return res.status(400).json({ message: 'Friend request already sent or you are already friends' });
    }

    // Add friend request
    user.sent.push(to_be_added);
    friend.requests.push(userId);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend request sent successfully' });
  } catch (error) {
    console.error('Error sending friend request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  const { from } = req.body;
  const to = req.user.id;

  try {
    const user = await User.findById(to);
    const friend = await User.findById(from);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the request exists
    if (!user.requests.includes(from)) {
      return res.status(400).json({ message: 'Friend request not found' });
    }

    // Add each other as friends
    user.friends.push(from);
    friend.friends.push(to);

    // Remove the request
    user.requests = user.requests.filter(requestId => requestId.toString() !== from);
    friend.sent = friend.sent.filter(sentId => sentId.toString() !== to);

    await user.save();
    await friend.save();

    res.status(200).json({ message: 'Friend request accepted successfully' });
  } catch (error) {
    console.error('Error accepting friend request:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all friends
exports.getAllFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('friends');
    res.json({ friends: user.friends });
  } catch (error) {
    console.error('Error fetching friends:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch a maximum of 3 friends
exports.getLimitedFriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'friends',
        options: { limit: 3 }
      });

    res.json({ friends: user.friends });
  } catch (error) {
    console.error('Error fetching limited friends:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all friend requests
exports.getAllFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('requests');
    res.json({ requests: user.requests });
  } catch (error) {
    console.error('Error fetching requests:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Fetch all users excluding current user, their friends, and sent requests
exports.getAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    const currentUser = await User.findById(userId).populate('friends').populate('sent');
    if (!currentUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendIds = currentUser.friends.map(friend => friend._id);
    const sentRequestIds = currentUser.sent.map(request => request._id);

    const allUsers = await User.find({
      _id: { $ne: userId, $nin: [...friendIds, ...sentRequestIds] }
    });
    res.json({ users: allUsers });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
