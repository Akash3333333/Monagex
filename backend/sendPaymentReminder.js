const cron = require('node-cron');
const axios = require('axios');

// This function sends payment reminders
const sendPaymentReminder = async () => {
  try {
    // Make a request to your server to fetch users with payments due
    const response = await axios.get('http://localhost:5000/api/payment-reminders');

    const usersWithPaymentsDue = response.data;

    // Iterate through users and send reminders
    usersWithPaymentsDue.forEach(async (user) => {
      // You can use a notification library or any other means to send reminders
      // For simplicity, let's log a message here
      console.log(`Send payment reminder to user: ${user.username}`);
    });
  } catch (error) {
    console.error('Error sending payment reminders:', error.message);
  }
};

// Schedule the reminder to run every day at a specific time
cron.schedule('* * * * *', sendPaymentReminder); // This will run every day at midnight

console.log('Payment reminder scheduler started.');
