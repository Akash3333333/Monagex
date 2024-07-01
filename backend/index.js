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
mongoose.connect('mongodb+srv://akashchimu1718:MonageX%40123@monagex.stn30d1.mongodb.net/');


const port = process.env.PORT || 5000;
const app = express();
const server = require('http').createServer(app);

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Auth Routes
app.use('/auth', require('./routes/authRoutes'));

// Balance Routes
app.use('/api/balance', require('./routes/balanceRoutes'));

// Finance Routes
app.use('/api/finance', require('./routes/financeRoutes'));

// Friend Routes
app.use('/api/friends', require('./routes/friendRoutes'));

// Group Routes
app.use('/api/groups', require('./routes/groupRoutes'));

// Profile Routes
app.use('/api/profile', require('./routes/profileRoutes'));

// Records Routes
app.use('/api/records', require('./routes/recordsRoutes'));

// Settle Routes
app.use('/api/settle', require('./routes/settleRoutes'));

// Simplify Debts Routes
app.use('/api/simplifyDebts', require('./routes/simplifyDebtsRoutes'));

// Split Routes
app.use('/api/split', require('./routes/splitRoutes'));

// Transaction History Routes
app.use('/api/transactionHistory',require('./routes/transactionHistoryRoutes'));




// Start server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
