# Project Specification

## Project Overview

**Project Name:** string_manip

**Description:** A high-performance, cross-platform string manipulation library written in C that uses SIMD operations for maximum performance. The library operates on two-pointer strings (start/end) and has no dependencies on the standard library, making it suitable for freestanding environments.

**Domain:** Systems Programming / High-Performance Computing

## Tech Stack

### Backend
- **Language:** C
- **Framework:** None (bare metal library)
- **Database:** N/A
- **ORM/ODM:** N/A
- **Authentication:** N/A

### Frontend
- **Framework:** N/A (C library)
- **Language:** C
- **Styling:** N/A
- **State Management:** N/A
- **Build Tool:** Make

### Infrastructure
- **Hosting:** N/A (library)
- **CI/CD:** GitHub Actions
- **Containerization:** None
- **Monitoring:** None

## Current Features

List your existing features (if any):
1. String length calculation (faf_string_strlen)
2. String comparison (faf_string_cmp)
3. String concatenation (faf_string_concat)
4. String memory operations (copy, etc.)
5. String splitting (faf_string_strsplit)
6. String to lowercase conversion (faf_string_to_lower)
7. Custom testing framework (faf_test)

## Planned Features

List features you want to build (in priority order):
1. [High Priority: toupper - convert strings to uppercase]
2. [High Priority: trim functions - ltrim, rtrim, trim for whitespace removal]
3. [High Priority: reverse - reverse string contents]
4. [High Priority: contains - substring search]
5. [Medium Priority: hash - string hashing function]
6. [Medium Priority: sort - sort strings and string arrays using pdqsort]
7. [Low Priority: format - string formatting]
8. [Low Priority: strmult - string multiplication/repetition]

## Architecture Patterns

- **API Style:** C Library API
- **Architecture:** Header/Implementation file pairs
- **Design Patterns:** Two-pointer string representation (start/end)
- **Testing Strategy:** Custom unit testing framework (faf_test)

## Development Workflow

### Commands
- **Install dependencies:** `brew install simde` (macOS) or appropriate package manager
- **Run development:** `make`
- **Run tests:** `make all_tests`
- **Build production:** `make`
- **Lint/Format:** None specified

### Git Workflow
- **Default branch:** trunk
- **Branch naming:** feature/* (inferred)
- **Commit style:** Descriptive
- **PR process:** Standard GitHub PR workflow

## Constraints & Requirements

### Technical Constraints
- [X] Must work without standard library
- [X] Must support cross-platform SIMD operations
- [X] Must work in freestanding environments
- [X] Must maintain high performance
- [X] Must use SIMDE for portable SIMD

### Business Constraints
- [ ] GDPR compliance required
- [ ] PCI compliance required
- [ ] Must integrate with [specific system]
- [X] Other: No external dependencies except SIMDE

## Existing Documentation

- **README location:** /README.md
- **API docs:** Header files contain inline documentation
- **Architecture docs:** None
- **Setup guide:** README.md contains build instructions

## Additional Context

The library uses a unique string representation with two pointers (start and end) instead of null-terminated strings. This allows for O(1) length calculation and better SIMD optimization. All functions should follow the existing patterns:
- Use faf_string type (union with start/end pointers and simde__m128i)
- Implement SIMD-optimized versions where possible
- Provide comprehensive tests using the faf_test framework
- Follow the existing naming convention (faf_string_*)
- Document runtime and memory complexity in header comments

---

*The Orchestrator will use this information to research best practices, understand your domain, and create better work assignments for AI workers.*