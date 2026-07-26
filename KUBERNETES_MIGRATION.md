# Kubernetes Migration Guide

This guide helps you migrate from Docker Compose to Kubernetes (K8s) for production deployment.

## 📋 Prerequisites

- Kubernetes cluster (local: Minikube, Docker Desktop; cloud: EKS, GKE, AKS)
- `kubectl` CLI configured
- `kompose` or manual manifest creation
- Container registry (Docker Hub, ECR, GCR, ACR)

## 🔄 Migration Path

```
Local Docker Compose
        ↓
    Minikube/Docker Desktop K8s
        ↓
    Production Kubernetes
```

## 📦 Step 1: Prepare Docker Images

### Build and Push Images to Registry

```bash
# Login to your registry
docker login

# Tag images
docker tag resume-frontend:latest myregistry/resume-frontend:1.0.0
docker tag resume-backend:latest myregistry/resume-backend:1.0.0

# Push to registry
docker push myregistry/resume-frontend:1.0.0
docker push myregistry/resume-backend:1.0.0
```

## 🔀 Step 2: Generate Kubernetes Manifests

### Option A: Using Kompose (Automatic)

```bash
# Install Kompose
# macOS
brew install kompose

# Linux
curl -L https://github.com/kubernetes/kompose/releases/download/v1.28.0/kompose-linux-amd64 -o kompose
chmod +x kompose
sudo mv ./kompose /usr/local/bin/kompose

# Convert docker-compose.yml to k8s manifests
kompose convert -f docker-compose.yml -o k8s/

# Resulting structure:
# k8s/
# ├── frontend-deployment.yaml
# ├── frontend-service.yaml
# ├── backend-deployment.yaml
# ├── backend-service.yaml
# ├── postgres-deployment.yaml
# ├── postgres-service.yaml
# ├── redis-deployment.yaml
# ├── redis-service.yaml
# └── nginx-deployment.yaml
```

### Option B: Manual Manifest Creation

Create `k8s/frontend-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend
  namespace: resume
spec:
  replicas: 2
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
      - name: frontend
        image: myregistry/resume-frontend:1.0.0
        ports:
        - containerPort: 3000
        env:
        - name: REACT_APP_API_URL
          value: "http://backend:5000"
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
        livenessProbe:
          httpGet:
            path: /
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
```

Create `k8s/frontend-service.yaml`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: frontend
  namespace: resume
spec:
  type: LoadBalancer
  selector:
    app: frontend
  ports:
  - port: 80
    targetPort: 3000
```

## 🗂️ Step 3: Create Kubernetes Namespace

```bash
# Create namespace
kubectl create namespace resume

# Verify
kubectl get namespaces
```

## 📝 Step 4: ConfigMaps and Secrets

### Create ConfigMap for Application Config

```bash
kubectl create configmap resume-config \
  --from-env-file=.env \
  -n resume
```

### Create Secret for Sensitive Data

```bash
kubectl create secret generic resume-secrets \
  --from-literal=db-password=your-secure-password \
  --from-literal=jwt-secret=your-jwt-secret \
  -n resume
```

## 🚀 Step 5: Deploy to Kubernetes

### Deploy Local (Minikube/Docker Desktop)

```bash
# Start Minikube
minikube start

# Deploy manifests
kubectl apply -f k8s/ -n resume

# Verify deployments
kubectl get deployments -n resume
kubectl get pods -n resume

# Check service status
kubectl get services -n resume
```

### Deploy to Cloud Cluster

```bash
# Connect to cluster
kubectl config use-context your-cluster-context

# Deploy
kubectl apply -f k8s/ -n resume

# Monitor
kubectl get deployments -n resume
kubectl logs -f deployment/frontend -n resume
```

## 🔌 Step 6: Set Up Ingress

Create `k8s/ingress.yaml`:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: resume-ingress
  namespace: resume
  annotations:
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  ingressClassName: nginx
  tls:
  - hosts:
    - yourdomain.com
    secretName: resume-tls
  rules:
  - host: yourdomain.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend
            port:
              number: 80
      - path: /api
        pathType: Prefix
        backend:
          service:
            name: backend
            port:
              number: 5000
```

Deploy Ingress:

```bash
kubectl apply -f k8s/ingress.yaml
```

## 💾 Step 7: Persistent Storage

For databases that need persistent data:

Create `k8s/postgres-pvc.yaml`:

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
  namespace: resume
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
```

## 📊 Monitoring & Logging

### Deploy Prometheus & Grafana

```bash
# Install Prometheus community Helm chart
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update

helm install prometheus prometheus-community/kube-prometheus-stack -n monitoring --create-namespace
```

### Deploy ELK Stack (Elasticsearch, Logstash, Kibana)

```bash
# Install Elasticsearch
helm repo add elastic https://helm.elastic.co
helm repo update

helm install elasticsearch elastic/elasticsearch -n logging --create-namespace
```

## 🔐 Security Best Practices

### Network Policies

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: backend-policy
  namespace: resume
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    - podSelector:
        matchLabels:
          app: nginx
```

### Pod Security Policies

```yaml
apiVersion: policy/v1beta1
kind: PodSecurityPolicy
metadata:
  name: restricted
spec:
  privileged: false
  allowPrivilegeEscalation: false
  requiredDropCapabilities:
    - ALL
  volumes:
    - 'configMap'
    - 'emptyDir'
    - 'projected'
    - 'secret'
    - 'downwardAPI'
    - 'persistentVolumeClaim'
  runAsUser:
    rule: 'MustRunAsNonRoot'
```

## 📈 Scaling & Auto-Scaling

### Horizontal Pod Autoscaler

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: frontend-hpa
  namespace: resume
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: frontend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

## 🔍 Useful kubectl Commands

```bash
# Get resources
kubectl get pods -n resume
kubectl get deployments -n resume
kubectl get services -n resume
kubectl get ingress -n resume

# View logs
kubectl logs -f deployment/frontend -n resume
kubectl logs pod/frontend-xyz -n resume

# Describe resources
kubectl describe deployment frontend -n resume
kubectl describe pod frontend-xyz -n resume

# Execute commands
kubectl exec -it pod/frontend-xyz -- /bin/sh

# Port forwarding
kubectl port-forward service/frontend 3000:80 -n resume

# Scale deployment
kubectl scale deployment frontend --replicas=3 -n resume

# Update image
kubectl set image deployment/frontend \
  frontend=myregistry/resume-frontend:1.1.0 -n resume

# Rollout history and rollback
kubectl rollout history deployment/frontend -n resume
kubectl rollout undo deployment/frontend -n resume

# Delete resources
kubectl delete deployment frontend -n resume
kubectl delete namespace resume
```

## 🎯 CI/CD Pipeline Integration

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Kubernetes

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build and push images
        run: |
          docker build -t myregistry/resume-frontend:${{ github.sha }} .
          docker push myregistry/resume-frontend:${{ github.sha }}
      
      - name: Update K8s manifests
        run: |
          sed -i 's/IMAGE_TAG/'${{ github.sha }}'/' k8s/frontend-deployment.yaml
      
      - name: Deploy to K8s
        run: |
          kubectl apply -f k8s/ -n resume
```

## 📚 Resources

- Kubernetes Docs: https://kubernetes.io/docs/
- Helm: https://helm.sh/
- Kompose: https://kompose.io/
- Kind (Local K8s): https://kind.sigs.k8s.io/
- Minikube: https://minikube.sigs.k8s.io/

## ✅ Migration Checklist

- [ ] Build and push Docker images
- [ ] Generate K8s manifests (kompose or manual)
- [ ] Create namespace
- [ ] Create ConfigMaps and Secrets
- [ ] Deploy to local K8s cluster
- [ ] Test all endpoints
- [ ] Set up Ingress
- [ ] Configure persistent storage
- [ ] Set up monitoring (Prometheus)
- [ ] Configure logging (ELK)
- [ ] Set up auto-scaling
- [ ] Implement security policies
- [ ] Create CI/CD pipeline
- [ ] Deploy to production

---

After completing this migration, your application will be production-ready and highly scalable! 🚀
