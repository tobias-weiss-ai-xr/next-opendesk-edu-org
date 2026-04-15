---
title: "Deployment Guide"
date: "2026-04-15"
description: "Step-by-step guide for deploying openDesk Edu on your university's infrastructure."
categories: ["deployment", "guide"]
tags: ["deployment", "docker", "kubernetes", "setup"]
---

# Deployment Guide

This guide walks you through deploying openDesk Edu on your university's infrastructure.

## Prerequisites

- A Kubernetes cluster (v1.28 or later)
- A domain name with SSL certificates
- SAML identity provider (IdP) configuration
- At least 16GB RAM and 4 CPU cores

## Quick Start

1. Clone the openDesk Edu configuration repository
2. Configure your environment variables
3. Deploy using Helm charts
4. Set up SAML federation with your IdP
5. Verify all services are running

## Configuration

The main configuration is done through environment variables and a central configuration file. See the individual service documentation for service-specific settings.
