const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

dotenv.config();

// MongoDB connection
mongoose.connect(process.env.MONGO_URI);


const port = process.env.PORT || 5000;
const app = express();
const server = require('http').createServer(app);

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS Configuration
const corsOptions = {
  origin: 'https://monagex-frontend.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true // enable credentials (cookies)
};

// Enable CORS for all routes
app.use(cors(corsOptions));

// Handle OPTIONS requests
app.options('*', cors(corsOptions));

// Routes
app.use('/auth', require('./routes/authRoutes'));
app.use('/api/balance', require('./routes/balanceRoutes'));
app.use('/api/finance', require('./routes/financeRoutes'));
app.use('/api/friends', require('./routes/friendRoutes'));
app.use('/api/groups', require('./routes/groupRoutes'));
app.use('/api/profile', require('./routes/profileRoutes'));
app.use('/api/records', require('./routes/recordsRoutes'));
app.use('/api/settle', require('./routes/settleRoutes'));
app.use('/api/simplifyDebts', require('./routes/simplifyDebtsRoutes'));
app.use('/api/split', require('./routes/splitRoutes'));
app.use('/api/transactionHistory', require('./routes/transactionHistoryRoutes'));

// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
