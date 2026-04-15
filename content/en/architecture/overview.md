---
title: "System Architecture Overview"
date: "2026-04-15"
description: "An overview of the openDesk Edu system architecture, including container orchestration, SAML federation, and service integration patterns."
categories: ["architecture", "infrastructure"]
tags: ["architecture", "docker", "saml", "federation"]
---

# System Architecture Overview

openDesk Edu is built on a modern, containerized architecture designed for scalability and resilience in educational environments.

## Core Principles

1. **Container-Native**: All services run as Docker containers orchestrated by Kubernetes
2. **Federated Identity**: SAML-based SSO integration with university identity providers
3. **Data Sovereignty**: Full data residency control within institutional boundaries
4. **Modular Design**: Each service can be deployed, updated, and scaled independently

## Service Mesh

The platform uses a service mesh for inter-service communication, providing load balancing, service discovery, and encrypted transport between components.

## Storage Layer

Persistent data is managed through a distributed storage layer with automated backup and recovery capabilities.
