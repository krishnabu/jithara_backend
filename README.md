A simple and modular backend API built using **Node.js** and **Express.js**.  
It supports **job posting**, **retrieving job listings**, and includes **rate limiting** using `express-rate-limit` for enhanced API security.

Authentication:
Fully implemented JWT-based login/signup flow for secure user authentication.

Database Integration:
Job postings are now stored in MongoDB, providing persistent data storage.
Connected via Mongoose for easier data modeling and queries.

WebSocket Support:
Integrated real-time job update notifications using WebSockets (e.g., with Socket.IO).
Clients receive instant updates when new jobs are posted.

REST API Endpoints:
POST /api/jobs to create a job.
GET /api/jobs to retrieve all jobs.

Rate Limiting:
Implemented using express-rate-limit to secure API against abuse (100 req/15 min per IP).

Clean Project Structure:
Organized into modular folders (routes, controllers, config, middlewares).
