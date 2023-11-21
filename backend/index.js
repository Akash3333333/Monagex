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
const friendRequestRoutes = require('./routes/FriendReq');
const splitRoutes = require('./routes/Split');
const path = require('path');
const multer = require('multer');
const dotenv = require('dotenv');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const User = require('./models/User');
const uploadRoute = require('./routes/upload');
// const authenticateJWT = require('./routes/authMiddleware');

dotenv.config();
const jwtSecretKey =  process.env.JWT_SECRET_KEY;

const app = express();
const server = require('http').createServer(app);

// Passport configuration
// require(path.join(__dirname, 'config', 'passport'));
// require('./config/passport')(passport);

// const path = require('path');
// const passportConfig = require(path.join(__dirname, 'config', 'passport'));

app.use(session({ secret: jwtSecretKey, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;

// app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

app.use(cors({ credentials: true, origin: 'http://localhost:3000' })); 
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// app.use('/avatars', express.static(path.join(__dirname, 'public', 'avatars')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb://localhost:27017/MonageX1');

app.use('/auth', authRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/user', userRoutes);
app.use('/groups', groupRoutes);
app.use('/api/friend-requests', friendRequestRoutes);
app.use('/api/split', splitRoutes);
app.use('/api/uploadphoto', uploadRoute);


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
