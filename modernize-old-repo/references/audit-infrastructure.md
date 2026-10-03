# Infrastructure and deployment audit

Read this only when the project has deployment or infrastructure configuration.

## Phase 13 — Infrastructure / deployment

If applicable, inspect:

- Dockerfile
- Docker Compose
- Kubernetes
- Terraform
- AWS/GCP/Azure configuration
- Vercel/Netlify/etc.
- CI/CD
- Environment configuration
- Secrets handling
- Health checks
- Graceful shutdown
- Logging
- Monitoring
- Resource limits
- Production configuration

Check for obsolete infrastructure assumptions, such as deprecated CI actions or runner images, retired platform features, and hosting plans or regions that no longer exist.
