# 📁 Project Structure & File Overview

Complete Docker & Microservices setup for the Vintage Resume Application.

## 🎯 Quick Start

```bash
# Windows (PowerShell)
.\setup.ps1

# macOS/Linux (Bash)
bash setup.sh

# Or manual
docker-compose up -d
```

## 📂 File Tree

```
new_frontend/
├── 📋 Configuration Files
│   ├── docker-compose.yml          # Microservices orchestration (7 services)
│   ├── Dockerfile                  # Multi-stage React build
│   ├── .env.example                # Environment variables template
│   ├── .dockerignore              # Docker build exclusions
│   └── .gitignore                 # Git exclusions
│
├── 📚 Documentation
│   ├── DOCKER_README.md            # Complete Docker guide
│   ├── KUBERNETES_MIGRATION.md     # K8s deployment guide
│   └── README.md                   # Project README (optional)
│
├── 🔧 Setup Scripts
│   ├── setup.ps1                  # Windows setup script
│   ├── setup.sh                   # Unix/Linux/macOS setup script
│   └── Makefile                   # Convenient CLI commands
│
├── 💾 Database
│   └── init-db.sql                # PostgreSQL initialization script
│
├── 🌐 Web Server
│   └── nginx/
│       ├── nginx.conf             # Main Nginx configuration
│       └── conf.d/
│           └── default.conf       # Server blocks & routing
│
├── 🎨 Frontend (React)
│   └── VintageResume.jsx          # Resume component
│       ├── Header (Parallax effect)
│       ├── Hero (2-column: portrait + bio)
│       ├── Body (2-column: left sections + right skills)
│       ├── Micro-interactions (animations)
│       └── Responsive design
│
├── 🔌 Backend (Node.js/Express)
│   └── backend/
│       ├── package.json           # Dependencies
│       ├── server.js              # Express API server
│       └── routes/                # API routes (placeholder)
│           ├── users.js
│           ├── skills.js
│           ├── education.js
│           ├── work-experience.js
│           └── projects.js
│
└── ⚙️ Future Microservices (templates)
    ├── backend-email/            # Email service
    ├── backend-storage/          # File storage service
    ├── backend-auth/             # Authentication service
    └── backend-search/           # Search service
```

## 🐳 Docker Services Included

### 1. **Frontend** (port 3000)
- React application
- Tailwind CSS styling
- Vintage newspaper design
- Multi-stage production build
- Health checks

### 2. **Backend** (port 5000)
- Node.js/Express API
- RESTful endpoints
- Ready for microservice expansion
- CORS enabled

### 3. **Nginx** (port 80, 443)
- Reverse proxy/API Gateway
- URL routing
- Static file caching
- Security headers
- Rate limiting
- WebSocket support
- SSL/TLS ready

### 4. **PostgreSQL** (port 5432)
- Primary data store
- 7 pre-configured tables
- Automatic schema initialization
- Backup and restore ready

### 5. **Redis** (port 6379)
- Session cache
- Real-time data caching
- Scalable across microservices

### 6. **pgAdmin** (port 5050)
- Database management UI
- Development and debugging
- Default: admin@example.com / admin

## 📊 Key Files Explained

### `docker-compose.yml`
Orchestrates 6 services with:
- Health checks for all services
- Networking (bridge network: `resume-network`)
- Volume management (postgres_data, redis_data)
- Environment variables
- Dependency management
- Restart policies
- Resource constraints

### `Dockerfile`
Multi-stage build for React:
- **Stage 1**: Build optimized bundle
- **Stage 2**: Production image with minimal footprint
- Uses `serve` for production serving
- Health checks configured

### `nginx/conf.d/default.conf`
Complete server configuration:
- Security headers (X-Frame-Options, CSP, etc.)
- Gzip compression
- Rate limiting (10r/s general, 30r/s API)
- CORS headers for API
- WebSocket proxying
- Static file caching (1 year expiry)
- Sensitive file protection

### `backend/server.js`
Express server template:
- Helmet for security
- Morgan for logging
- CORS configuration
- Health endpoint
- 5 API routes (users, skills, education, work-experience, projects)
- Error handling
- TODO comments for database integration

### `init-db.sql`
PostgreSQL schema:
- 7 tables: users, education, work_experience, skills, languages, projects, portfolio
- UUID primary keys
- Foreign key relationships
- Indexes for performance
- Automatic timestamp management
- Sample data insertion

## 🚀 Usage Guide

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f [service_name]
```

### Access Services
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API via Nginx: http://localhost/api
- pgAdmin: http://localhost:5050

### Execute Commands
```bash
# Backend shell
docker-compose exec backend /bin/sh

# Database query
docker-compose exec postgres psql -U resume_user -d resume_db

# Frontend logs
docker-compose logs -f frontend
```

## 📚 Make Commands

```bash
make up              # Start all services
make down            # Stop all services
make restart         # Restart services
make rebuild         # Rebuild images
make logs            # View all logs
make db-shell        # Connect to database
make db-backup       # Backup database
make test            # Run tests
make health          # Check service health
make help            # Show all commands
```

## 🏗️ Microservice Architecture

### Current Setup
```
┌─────────────────────────────────────────────────────┐
│                    Nginx (80)                        │
│              Reverse Proxy & API Gateway             │
├──────────────┬──────────────────────────────────────┤
│              │                                       │
│              ↓                                       ↓
│        Frontend (3000)                        Backend (5000)
│        React + Tailwind                       Express + Node
│                                                      │
└──────────────────────────────────────────────────────┤
│              │              │              │
│              ↓              ↓              ↓
│        PostgreSQL      Redis Cache      pgAdmin
│        (5432)          (6379)           (5050)
└──────────────────────────────────────────────────────┘
```

### Extensible for New Microservices
```
                    Nginx (API Gateway)
                           │
        ┌──────┬──────┬────┼────┬─────────┬──────────┐
        ↓      ↓      ↓    ↓    ↓         ↓          ↓
      Frontend Backend Email Auth Search Notification Payment
       (3000)  (5000)  (5001) (5002) (5003) (5004)   (5005)
```

## 🔐 Security Features

- ✅ Helmet.js (security headers)
- ✅ CORS configuration
- ✅ Rate limiting
- ✅ Environment variables (secrets)
- ✅ Non-root user containers
- ✅ SSL/TLS ready
- ✅ Network isolation
- ✅ Health checks
- ✅ Sensitive file protection

## 📈 Production Readiness

Before deploying to production:

- [ ] Change all default passwords
- [ ] Update JWT_SECRET and SESSION_SECRET
- [ ] Configure SSL certificates
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS in Nginx
- [ ] Configure proper logging
- [ ] Set up monitoring (Prometheus/Grafana)
- [ ] Set up log aggregation (ELK)
- [ ] Configure backups
- [ ] Test all endpoints
- [ ] Review security headers
- [ ] Set up CI/CD pipeline
- [ ] Plan scaling strategy

## 🚀 Kubernetes Migration

See `KUBERNETES_MIGRATION.md` for:
- Converting to K8s manifests
- Deploying to production clusters
- Setting up Ingress
- Configuring auto-scaling
- Monitoring and logging
- Security policies

## 📞 Getting Help

### Useful Resources
- Docker: https://docs.docker.com/
- Docker Compose: https://docs.docker.com/compose/
- Nginx: https://nginx.org/docs/
- PostgreSQL: https://www.postgresql.org/docs/
- Redis: https://redis.io/
- Kubernetes: https://kubernetes.io/docs/

### Troubleshooting
1. Check logs: `docker-compose logs [service]`
2. Check status: `docker-compose ps`
3. Check health: `make health`
4. Restart service: `docker-compose restart [service]`
5. Reset everything: `docker-compose down -v && docker-compose up -d`

## 🎯 Next Steps

1. **Local Development**
   - Run `./setup.sh` (or `setup.ps1` on Windows)
   - Access http://localhost:3000
   - Modify resume data in backend/server.js

2. **Database Integration**
   - Connect backend to PostgreSQL
   - Implement CRUD operations
   - Add authentication

3. **Add New Services**
   - Follow microservice template in docker-compose.yml
   - Update Nginx routing
   - Integrate with existing services

4. **Production Deployment**
   - Follow KUBERNETES_MIGRATION.md
   - Set up CI/CD pipeline
   - Configure monitoring
   - Plan scaling strategy

---

**Ready to deploy!** 🚀 Start with `docker-compose up -d`
