.PHONY: help up down build rebuild logs logs-frontend logs-backend logs-nginx \
        db-shell db-reset shell test lint clean restart status

# Variables
COMPOSE := docker-compose
COMPOSE_FILE := docker-compose.yml
SERVICES := frontend backend nginx postgres redis pgadmin

help:
	@echo "╔════════════════════════════════════════════════════════════╗"
	@echo "║     Resume Application - Docker & Microservices CLI        ║"
	@echo "╚════════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "🚀 Service Management:"
	@echo "  make up              - Start all services"
	@echo "  make down            - Stop all services"
	@echo "  make restart         - Restart all services"
	@echo "  make rebuild         - Rebuild and restart services"
	@echo "  make status          - Show services status"
	@echo ""
	@echo "📊 Logs & Debugging:"
	@echo "  make logs            - View all logs"
	@echo "  make logs-frontend   - View frontend logs"
	@echo "  make logs-backend    - View backend logs"
	@echo "  make logs-nginx      - View nginx logs"
	@echo ""
	@echo "💾 Database Management:"
	@echo "  make db-shell        - Connect to PostgreSQL"
	@echo "  make db-reset        - Reset database"
	@echo "  make db-backup       - Backup database"
	@echo ""
	@echo "🔨 Development:"
	@echo "  make shell           - Open bash shell in backend container"
	@echo "  make clean           - Remove stopped containers and volumes"
	@echo "  make test            - Run tests"
	@echo "  make lint            - Run linters"
	@echo ""
	@echo "📚 Monitoring:"
	@echo "  make health          - Check all services health"
	@echo "  make ps              - List running containers"

# Service Management
up:
	@echo "🚀 Starting services..."
	@$(COMPOSE) up -d
	@sleep 3
	@$(COMPOSE) ps
	@echo "✅ Services started!"
	@echo ""
	@echo "Access points:"
	@echo "  📱 Frontend:  http://localhost:3000"
	@echo "  🔌 Backend:   http://localhost:5000"
	@echo "  🌐 Nginx:     http://localhost"
	@echo "  📊 pgAdmin:   http://localhost:5050"

down:
	@echo "⏹️  Stopping services..."
	@$(COMPOSE) down
	@echo "✅ Services stopped!"

restart: down up
	@echo "🔄 Services restarted!"

rebuild:
	@echo "🔨 Rebuilding services..."
	@$(COMPOSE) down
	@$(COMPOSE) build --no-cache
	@$(COMPOSE) up -d
	@sleep 3
	@$(COMPOSE) ps
	@echo "✅ Services rebuilt and started!"

status:
	@echo "📊 Service Status:"
	@$(COMPOSE) ps
	@echo ""
	@echo "🔍 Resource Usage:"
	@docker stats --no-stream

# Logs
logs:
	@$(COMPOSE) logs -f

logs-frontend:
	@$(COMPOSE) logs -f frontend

logs-backend:
	@$(COMPOSE) logs -f backend

logs-nginx:
	@$(COMPOSE) logs -f nginx

# Database Management
db-shell:
	@$(COMPOSE) exec postgres psql -U resume_user -d resume_db

db-reset:
	@echo "⚠️  Resetting database..."
	@$(COMPOSE) down -v
	@$(COMPOSE) up -d postgres
	@sleep 5
	@$(COMPOSE) up -d
	@echo "✅ Database reset!"

db-backup:
	@echo "💾 Backing up database..."
	@$(COMPOSE) exec -T postgres pg_dump -U resume_user resume_db > backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup completed!"

# Development
shell:
	@$(COMPOSE) exec backend /bin/sh

test:
	@echo "🧪 Running tests..."
	@$(COMPOSE) exec backend npm test
	@echo "✅ Tests completed!"

lint:
	@echo "🔍 Running linters..."
	@$(COMPOSE) exec backend npm run lint || true
	@echo "✅ Linting completed!"

# Monitoring
health:
	@echo "❤️  Checking service health..."
	@echo ""
	@echo "Frontend Health:"
	@curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend is healthy" || echo "❌ Frontend is down"
	@echo ""
	@echo "Backend Health:"
	@curl -s http://localhost:5000/health | jq . || echo "❌ Backend is down"
	@echo ""
	@echo "Nginx Health:"
	@curl -s http://localhost/health | head -c 20 && echo " ✅ Nginx is healthy" || echo "❌ Nginx is down"

ps:
	@$(COMPOSE) ps

# Cleanup
clean:
	@echo "🧹 Cleaning up..."
	@$(COMPOSE) down -v
	@docker system prune -f
	@echo "✅ Cleanup completed!"

# Default target
.DEFAULT_GOAL := help
