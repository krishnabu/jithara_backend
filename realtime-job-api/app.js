const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Enable CORS for frontend connection
app.use(cors());
app.use(express.json());

//  Set up Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*', // Or your frontend URL
    methods: ['GET', 'POST']
  }
});

// Store job data in memory
let jobs = [];

//  When a client connects
io.on('connection', (socket) => {
  console.log(' A user connected:', socket.id);

  // Send current jobs on connect
  socket.emit('jobList', jobs);

  socket.on('disconnect', () => {
    console.log(' A user disconnected:', socket.id);
  });
});

// REST endpoint to post a job
app.post('/jobs', (req, res) => {
  const job = {
    id: jobs.length + 1,
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    postedAt: new Date()
  };

  jobs.push(job);

  // Broadcast job to all connected clients
  io.emit('newJob', job);

  res.status(201).json({ message: 'Job posted!', job });
});

// Start server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
