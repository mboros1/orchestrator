# Research Checklist for Orchestrator

Use this checklist when researching a new project. Spend 10-15 minutes gathering comprehensive context before creating any workers.

## Phase 1: Technology Research

### For Each Technology in the Stack:
- [ ] **Current version and best practices**
  - Search: "[technology] best practices 2024"
  - Search: "[technology] v[X] new features"
  - Note breaking changes or deprecations

- [ ] **Common patterns and conventions**
  - Search: "[technology] folder structure"
  - Search: "[technology] naming conventions"
  - Search: "[technology] design patterns"

- [ ] **Testing approaches**
  - Search: "[technology] unit testing"
  - Search: "[technology] integration testing best practices"
  - Note popular testing libraries

### For Technology Combinations:
- [ ] **Integration patterns**
  - Search: "[tech1] with [tech2] integration"
  - Search: "[tech1] [tech2] boilerplate"
  - Note common pitfalls

- [ ] **Performance considerations**
  - Search: "[tech stack] performance optimization"
  - Search: "[tech stack] scaling strategies"

## Phase 2: Feature-Specific Research

### For Each Planned Feature:
- [ ] **Implementation patterns**
  - Search: "[feature] in [technology]"
  - Search: "[feature] [technology] tutorial 2024"
  - Search: "[feature] [technology] production ready"

- [ ] **Security considerations**
  - Search: "[feature] security best practices"
  - Search: "[feature] vulnerabilities"
  - Search: "[feature] OWASP"

- [ ] **Common libraries/packages**
  - Search: "[feature] [technology] npm packages"
  - Search: "best [feature] library for [technology]"
  - Check GitHub stars and recent activity

## Phase 3: Domain Research

### Industry Standards:
- [ ] **Compliance requirements**
  - Search: "[domain] compliance requirements"
  - Search: "[domain] regulations [year]"
  - Note specific standards (HIPAA, PCI-DSS, etc.)

- [ ] **Domain-specific patterns**
  - Search: "[domain] software architecture"
  - Search: "[domain] data models"
  - Search: "[domain] workflow patterns"

## Phase 4: Architecture Research

### Based on Architecture Style:
- [ ] **Microservices** (if applicable)
  - Search: "microservices communication patterns"
  - Search: "microservices data consistency"
  - Search: "microservices deployment strategies"

- [ ] **API Design**
  - Search: "[API style] best practices"
  - Search: "[API style] versioning strategies"
  - Search: "[API style] error handling"

- [ ] **Database Design**
  - Search: "[database] schema design [domain]"
  - Search: "[database] indexing strategies"
  - Search: "[database] migration tools"

## Phase 5: Development Workflow Research

### Tool-Specific:
- [ ] **CI/CD**
  - Search: "[CI/CD tool] [technology] pipeline"
  - Search: "[CI/CD tool] best practices"
  - Note common configurations

- [ ] **Development Environment**
  - Search: "[technology] development setup"
  - Search: "[technology] debugging tools"
  - Search: "[technology] hot reload"

## Phase 6: Synthesis

### Create Documentation:
- [ ] **Update CLAUDE.md with findings**
  - Technology insights
  - Best practices discovered
  - Common patterns
  - Potential pitfalls

- [ ] **Create feature-specific notes**
  - Implementation approach for each feature
  - Required dependencies
  - Testing strategies

- [ ] **Identify worker specializations**
  - Which features can be parallelized
  - Dependencies between features
  - Optimal worker allocation

## Research Output Template

After research, document findings in this format:

```markdown
## Research Summary for [Project Name]

### Key Insights
1. [Insight 1]
2. [Insight 2]
3. [Insight 3]

### Technology-Specific Findings
#### [Technology 1]
- Best practice: [Finding]
- Common pattern: [Pattern]
- Gotcha: [Warning]

### Feature Implementation Strategy
#### [Feature 1]
- Recommended approach: [Approach]
- Libraries to use: [Libraries]
- Estimated complexity: [High/Medium/Low]

### Worker Allocation Plan
- Worker 1: [Features/Areas]
- Worker 2: [Features/Areas]
- Worker 3: [Features/Areas]
```

---

*This research phase is critical for the Orchestrator's success. Don't skip it!*