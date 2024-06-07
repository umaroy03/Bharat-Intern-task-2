const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/your-database-name'; // Replace 'your-database-name' with the actual database name

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define a schema and model for transactions
const transactionSchema = new mongoose.Schema({
  date: String,
  amount: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// Define routes
app.get('/api/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Serve static files
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
