# Vintage Resume

A React single-page resume with a vintage newspaper design and subtle interactive effects.

## Run locally

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

## Build and deploy

```bash
npm run build
docker compose up --build
```

The containerized app is available at [http://localhost:8080](http://localhost:8080). Kubernetes manifests are in `deploy/k8s`; build and publish the `vintage-resume:latest` image to a registry accessible by your cluster before applying them.
