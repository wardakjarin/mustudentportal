const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Test DB Connection
(async () => {
  try {
    await db.authenticate();
    console.log('Database connected...');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
})();

// Routes placeholder
// const apiRoutes = require('./routes/api');
// app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
