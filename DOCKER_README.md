# Vintage Resume Application - Docker & Microservices Setup

A modern vintage newspaper-style resume built with React, Tailwind CSS, and microservices architecture. This project is designed to be easily extensible with additional microservices.

## 📋 Project Structure

```
├── VintageResume.jsx          # React resume component
├── Dockerfile                 # Frontend production image
├── docker-compose.yml         # Microservices orchestration
├── .env.example              # Environment variables template
├── .dockerignore             # Docker build exclusions
├── init-db.sql               # Database initialization script
│
├── nginx/                     # Reverse proxy configuration
│   ├── nginx.conf            # Main nginx config
│   └── conf.d/
│       └── default.conf      # Server block configuration
│
└── backend/                   # Backend API service
    ├── package.json          # Node dependencies
    ├── server.js             # Express server
    └── routes/               # API routes (placeholder)
```

## 🐳 Docker Services

### 1. **Frontend Service** (`frontend:3000`)
- React application with Tailwind CSS
- Multi-stage build for optimized production image
- Hot-reload enabled in development mode
- Health checks configured

### 2. **Backend Service** (`backend:5000`)
- Node.js/Express API server
- RESTful endpoints for resume data
- Ready for microservice expansion
- Health check endpoint

### 3. **Nginx Reverse Proxy** (`nginx:80, 443`)
- API Gateway for all services
- URL routing (`/` → frontend, `/api/` → backend)
- Rate limiting and security headers
- Static file caching
- WebSocket support for real-time features

### 4. **PostgreSQL Database** (`postgres:5432`)
- Primary data store
- Pre-configured schema with tables for:
  - Users
  - Education
  - Work Experience
  - Skills
  - Projects
  - Portfolio management

### 5. **Redis Cache** (`redis:6379`)
- Session management
- Cache layer for microservices
- Real-time data caching

### 6. **pgAdmin** (`pgadmin:5050`)
- Web UI for PostgreSQL management
- Useful for development and debugging

## 🚀 Quick Start

### Prerequisites
- Docker Desktop (includes Docker & Docker Compose)
- Git
- (Optional) Node.js 18+ for local development

### 1. Clone/Setup Project

```bash
cd new_frontend
```

### 2. Create Environment File

```bash
cp .env.example .env
# Edit .env with your configuration if needed
```

### 3. Build and Start Services

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f frontend
```

### 4. Access Applications

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000 (or http://localhost/api via Nginx)
- **Nginx**: http://localhost
- **pgAdmin**: http://localhost:5050
  - Email: admin@example.com
  - Password: admin

## 📝 Environment Variables

Copy `.env.example` to `.env` and customize:

```bash
cp .env.example .env
```

Key variables:
- `REACT_APP_API_URL`: Backend API endpoint
- `DB_*`: PostgreSQL connection details
- `REDIS_*`: Redis cache details
- `JWT_SECRET`: Authentication secret (change for production!)

## 🔧 Docker Compose Commands

```bash
# Start services
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down

# Rebuild images
docker-compose build

# View logs
docker-compose logs -f [service_name]

# Execute command in container
docker-compose exec [service_name] [command]

# View running containers
docker-compose ps

# Remove volumes (careful!)
docker-compose down -v
```

## 📊 Database Management

### Access PostgreSQL

```bash
# Connect via psql
docker-compose exec postgres psql -U resume_user -d resume_db

# Common queries
\dt                     # List tables
\d [table_name]        # Describe table
SELECT * FROM users;   # Query data
```

### Access via pgAdmin

1. Navigate to http://localhost:5050
2. Login: admin@example.com / admin
3. Add server:
   - Host: `postgres`
   - Port: `5432`
   - Username: `resume_user`
   - Password: `resume_password`

## 🏗️ Extending to Microservices

The architecture is designed for easy microservice addition:

### Adding a New Microservice (Example: Email Service)

1. **Create service directory**:
```bash
mkdir backend-email
cd backend-email
```

2. **Add to docker-compose.yml**:
```yaml
email-service:
  build: ./backend-email
  container_name: resume-email-service
  ports:
    - "5001:5001"
  environment:
    - PORT=5001
  volumes:
    - ./backend-email:/app
  networks:
    - resume-network
  depends_on:
    - redis
  restart: unless-stopped
```

3. **Update nginx config** (`nginx/conf.d/default.conf`):
```nginx
upstream email_service {
    server email-service:5001;
}

location /api/email/ {
    proxy_pass http://email_service/;
    # ... proxy settings
}
```

4. **Update docker-compose**:
```bash
docker-compose down
docker-compose up -d
```

## 🔐 Production Deployment

### Security Checklist

- [ ] Change `JWT_SECRET` in `.env`
- [ ] Update PostgreSQL password
- [ ] Enable HTTPS in nginx (uncomment in `nginx/conf.d/default.conf`)
- [ ] Configure SSL certificates
- [ ] Update CORS origins
- [ ] Set `NODE_ENV=production`
- [ ] Configure proper database backups
- [ ] Enable Redis authentication

### Example Production Nginx HTTPS

Uncomment and configure in `nginx/conf.d/default.conf`:

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
}
```

### Docker Compose for Production

```bash
# Build images without cache
docker-compose build --no-cache

# Start with resource limits
docker-compose up -d

# Check service health
docker-compose ps
```

## 🧪 Testing Services

### Test Frontend
```bash
docker-compose exec frontend npm test
```

### Test Backend
```bash
docker-compose exec backend npm test
```

### Test API Endpoints

```bash
# Health check
curl http://localhost/health

# Get skills
curl http://localhost/api/skills

# Get education
curl http://localhost/api/education

# Get work experience
curl http://localhost/api/work-experience
```

## 📈 Monitoring & Logging

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 nginx
```

### Health Checks

Configured services include health checks:

```bash
# Check status
docker-compose ps

# Manual health check
curl http://localhost/health
```

## 🚨 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000

# Kill process (macOS/Linux)
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Issues
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U resume_user -d resume_db -c "SELECT 1;"
```

### Container Won't Start
```bash
# View detailed error logs
docker-compose logs [service_name]

# Rebuild service
docker-compose build --no-cache [service_name]

# Remove and restart
docker-compose rm [service_name]
docker-compose up -d [service_name]
```

## 📚 API Documentation

### Base URL
- Local: `http://localhost:5000`
- Via Nginx: `http://localhost/api`

### Endpoints

#### Users
- `GET /api/users/:id` - Get user details

#### Skills
- `GET /api/skills` - List all skills

#### Education
- `GET /api/education` - List education history

#### Work Experience
- `GET /api/work-experience` - List work history

#### Projects
- `GET /api/projects` - List projects

## 🛠️ Development Workflow

### Local Development without Docker

```bash
# Frontend
cd .
npm install
npm start

# Backend (in separate terminal)
cd backend
npm install
npm start
```

### Development with Docker (Hot Reload)

Volumes are configured in `docker-compose.yml` for hot-reload:

```bash
docker-compose up -d
# Edit files and changes will reflect immediately
```

## 📦 Building for Production

### Production Build

```bash
# Build production images
docker-compose build --no-cache

# Push to registry (example: Docker Hub)
docker tag resume-frontend:latest myregistry/resume-frontend:1.0.0
docker push myregistry/resume-frontend:1.0.0
```

### Docker Swarm / Kubernetes Deployment

Convert to Kubernetes manifests:

```bash
# Install Kompose
# https://kompose.io/

kompose convert -f docker-compose.yml -o k8s/
```

## 📞 Support & Resources

- Docker Docs: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Nginx Docs: https://nginx.org/
- PostgreSQL Docs: https://www.postgresql.org/docs/
- Redis Docs: https://redis.io/documentation/

## 📄 License

MIT License - Feel free to use this project as a template.

## 🎯 Future Enhancements

- [ ] Add authentication service (JWT)
- [ ] Email service microservice
- [ ] File upload service (S3 integration)
- [ ] Analytics service
- [ ] Notification service
- [ ] Search service (Elasticsearch)
- [ ] CDN integration
- [ ] Automated backups
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Kubernetes deployment manifests

---

**Built with ❤️ using React, Node.js, PostgreSQL, and Docker**
