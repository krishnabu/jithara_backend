const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const Application = require('../models/Application');

// POST /jobs - Create a job
router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

// GET /jobs - Get all jobs
router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

// GET /jobs/:id - Get job by ID
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

// POST /jobs/:id/apply - Apply for a job
router.post('/:id/apply', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const application = new Application({
    jobId: req.params.id,
    applicantName: req.body.applicantName,
    resumeLink: req.body.resumeLink
  });

  await application.save();
  res.status(201).json({ message: 'Application submitted', application });
});

module.exports = router;
