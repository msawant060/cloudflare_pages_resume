const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes

// Users API
app.get('/api/users/:id', (req, res) => {
  try {
    // TODO: Implement database query
    res.json({
      id: req.params.id,
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      message: 'User data endpoint - implement with database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Skills API
app.get('/api/skills', (req, res) => {
  try {
    res.json({
      skills: [
        { name: 'UI Design', level: 9 },
        { name: 'Illustration', level: 8 },
        { name: 'Branding', level: 9 }
      ],
      message: 'Skills endpoint - implement with database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Education API
app.get('/api/education', (req, res) => {
  try {
    res.json({
      education: [
        {
          institution: 'RISD',
          degree: 'Master of Fine Arts',
          year: 2018
        }
      ],
      message: 'Education endpoint - implement with database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Work Experience API
app.get('/api/work-experience', (req, res) => {
  try {
    res.json({
      experience: [
        {
          company: 'Innovative Design Studio',
          position: 'Senior Creative Director',
          startDate: '2020',
          current: true
        }
      ],
      message: 'Work experience endpoint - implement with database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Projects API
app.get('/api/projects', (req, res) => {
  try {
    res.json({
      projects: [
        {
          title: 'Project 1',
          description: 'Description here',
          technologies: ['React', 'Tailwind CSS']
        }
      ],
      message: 'Projects endpoint - implement with database'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    status: err.status || 500
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Backend API running on port ${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
});

module.exports = app;
