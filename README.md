# Online Bookstore - Service Mesh and Observability for Microservices

This repository contains our team project for building an Online Bookstore based on microservices and demonstrating service mesh and observability concepts.

## Project goal

The goal of this project is to:
- build a small microservice-based online bookstore,
- deploy services in Kubernetes,
- apply Istio service mesh features such as mTLS, traffic routing, timeout, retry, and circuit breaker,
- observe system behavior using metrics, traces, logs, and dashboards.

## Main components

- Frontend web application
- Catalog service
- Review service
- Rating service
- Kubernetes manifests
- Istio configuration
- Observability stack
- Project documentation

## Repository structure

```text
.
├── frontend/
├── backend/
│   ├── catalog-service/
│   ├── review-service/
│   └── rating-service/
├── k8s/
├── istio/
├── observability/
└── docs/
```

## Team workflow

- `main` branch contains stable code.
- Each member should work on their own branch.
- Merge changes only after confirming they do not break the project.

## Getting started

1. Clone the repository.
2. Read the README inside each folder.
3. Start with the service or component assigned to you.
4. Keep commits small and clearly named.

## Notes

This repository is currently under active development as part of a team academic project.
