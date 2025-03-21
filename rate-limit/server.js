const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();

// Basic rate limiter: 100 requests per 15 minutes per IP
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    status: 429,
    error: 'Too many requests, please try again later.'
  }
});

app.use(apiLimiter); // Apply to all routes

// Your routes go here...
app.get('/', (req, res) => {
  res.send('You are not rate-limited!');
});

// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));
