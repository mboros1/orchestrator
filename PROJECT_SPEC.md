# Project Specification

## Project Overview

**Project Name:** native-vector-store

**Description:** High-performance in-memory vector store for small-scale local RAG applications. Provides fast similarity search over document embeddings with MCP server integration for TypeScript/JavaScript projects.

**Domain:** Information Retrieval / Machine Learning Infrastructure

## Tech Stack

### Backend
- **Language:** C++
- **Framework:** Node.js N-API bindings
- **Database:** In-memory vector storage
- **ORM/ODM:** N/A
- **Authentication:** N/A

### Frontend
- **Framework:** TypeScript/JavaScript API
- **Language:** TypeScript
- **Styling:** N/A
- **State Management:** N/A
- **Build Tool:** node-gyp

### Infrastructure
- **Hosting:** npm package distribution
- **CI/CD:** GitHub Actions
- **Containerization:** None
- **Monitoring:** Performance benchmarks

## Current Features

List your existing features (if any):
1. C++ VectorStore class with arena allocation
2. Document storage (id, text, metadata)
3. Parallel JSON document loading
4. Cosine similarity search via normalized dot product
5. OpenMP SIMD optimization
6. Node.js N-API wrapper
7. TypeScript definitions

## Planned Features

List features you want to build (in priority order):
1. [High Priority: npm package build and distribution]
2. [High Priority: comprehensive testing suite]
3. [High Priority: MCP server integration example]
4. [High Priority: performance benchmarking]
5. [Medium Priority: error handling improvements]
6. [Medium Priority: cross-platform binary distribution]
7. [Low Priority: memory usage optimization]
8. [Low Priority: alternative similarity metrics]

## Architecture Patterns

- **API Style:** Object-oriented TypeScript API
- **Architecture:** C++ core with Node.js bindings
- **Design Patterns:** Arena allocation, SIMD optimization
- **Testing Strategy:** Unit tests, integration tests, performance benchmarks

## Development Workflow

### Commands
- **Install dependencies:** `npm install`
- **Run development:** `npm run build`
- **Run tests:** `npm test`
- **Build production:** `npm run build`
- **Lint/Format:** Standard npm tooling

### Git Workflow
- **Default branch:** main
- **Branch naming:** feature/* 
- **Commit style:** Conventional commits
- **PR process:** GitHub PR workflow

## Constraints & Requirements

### Technical Constraints
- [X] Must support <1M embeddings efficiently
- [X] Must provide sub-second load times
- [X] Must support configurable embedding dimensions
- [X] Must integrate with MCP servers
- [X] Must provide TypeScript definitions

### Business Constraints
- [ ] GDPR compliance required
- [ ] PCI compliance required
- [ ] Must integrate with [specific system]
- [X] Other: Apache 2.0 license for npm distribution

## Existing Documentation

- **README location:** /README.md (to be created)
- **API docs:** TypeScript definitions in index.d.ts
- **Architecture docs:** None
- **Setup guide:** Package.json scripts

## Additional Context

The library targets small-scale local RAG applications where fast startup and search performance are critical. Documents are loaded from JSON files containing pre-computed embeddings. The C++ implementation uses:
- Custom arena allocator for memory efficiency
- OpenMP for parallel processing
- simdjson for high-speed JSON parsing
- SIMD optimized dot product operations
- Thread-safe read operations

Target use case: MCP servers with document knowledge bases requiring fast semantic search capabilities.

---

*The Orchestrator will use this information to research best practices, understand your domain, and create better work assignments for AI workers.*