const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const transferRoutes = require('./routes/transferRoutes');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groups');

const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
// const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = require('http').createServer(app);
// const io = new Server(server);

const port = process.env.PORT || 5000;

app.use('/images', express.static(path.join(__dirname, 'public/images')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser()); // Add cookie-parser middleware

// Serve avatar images from the 'avatars' directory
app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/MonageX1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/user', userRoutes);
app.use('/groups', groupRoutes);

// Route to get the current user
app.get('/getcurruser', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (user) {
      const { _id, username, email } = user;
      res.status(200).json({ user: { _id, username, email } });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error in /getcurruser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
