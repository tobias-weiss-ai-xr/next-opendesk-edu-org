---
title: "Systemarchitektur-Übersicht"
date: "2026-04-15"
description: "Eine Übersicht der openDesk Edu-Systemarchitektur, einschließlich Container-Orchestrierung, SAML-Föderation und Service-Integrationsmustern."
categories: ["architektur", "infrastruktur"]
tags: ["architektur", "docker", "saml", "föderation"]
---

# Systemarchitektur-Übersicht

openDesk Edu basiert auf einer modernen, containerisierten Architektur, die für Skalierbarkeit und Belastbarkeit in Bildungsumgebungen entwickelt wurde.

## Kernprinzipien

1. **Container-Nativ**: Alle Dienste laufen als Docker-Container, die von Kubernetes orchestriert werden
2. **Föderierte Identität**: SAML-basierte SSO-Integration mit Hochschul-Identitätsanbietern
3. **Datensouveränität**: Volle Kontrolle über den Datenstandort innerhalb institutioneller Grenzen
4. **Modulares Design**: Jeder Dienst kann unabhängig bereitgestellt, aktualisiert und skaliert werden
