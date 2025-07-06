# Best Practices

Tips and recommendations for effective orchestration.

## For Orchestrators

### Assignment Creation

#### DO ✅
- Provide clear, measurable success criteria
- Include relevant context in starter CLAUDE.md
- Link to existing code examples
- Specify testing requirements
- Set realistic timelines

#### DON'T ❌
- Create vague assignments
- Assume knowledge of project internals
- Forget to customize templates
- Skip code review

### Example: Good Assignment

```markdown
## Mission Brief

Implement user authentication with JWT tokens for our REST API.

## Current Context

### What Exists
- Express.js server setup in `src/server.js`
- User model in `src/models/User.js`
- PostgreSQL database configured

### What's Needed
- POST /auth/register endpoint
- POST /auth/login endpoint
- JWT token generation and validation
- Password hashing with bcrypt
- Session management

## Technical Approach

### Recommended Strategy
1. Set up auth routes in new `src/routes/auth.js`
2. Implement JWT utilities in `src/utils/jwt.js`
3. Add authentication middleware
4. Create comprehensive tests

### Success Criteria
- [ ] All endpoints return proper status codes
- [ ] Passwords hashed with bcrypt (min 10 rounds)
- [ ] JWTs expire after 24 hours
- [ ] 90%+ test coverage on auth code
- [ ] API documentation updated
```

### Managing Multiple Workers

1. **Clear Boundaries**
   - Assign separate subsystems
   - Define interface contracts
   - Prevent overlap

2. **Regular Sync**
   - Review PR progress daily
   - Address blockers quickly
   - Share learnings between workers

3. **Knowledge Synthesis**
   - Extract common patterns
   - Update project documentation
   - Build shared knowledge base

## For Workers

### Knowledge Building

#### Effective CLAUDE.md Structure

```markdown
# Worker CLAUDE.md - User Authentication

## Project Patterns Discovered

### Database Access
- Always use connection pool
- Transactions for multi-table updates
- Pattern: `await db.transaction(async (trx) => { ... })`

### Error Handling
- Custom error classes in `src/errors/`
- Middleware catches and formats errors
- Always return consistent error shape

### Testing Approach
- Jest with supertest for API tests
- Separate test database
- Fixtures in `tests/fixtures/`

## Debugging Notes

### Common Issues
1. **Token verification fails**
   - Check JWT_SECRET in .env
   - Verify token hasn't expired
   - Ensure Bearer prefix in header

2. **Database connection errors**
   - Run `docker-compose up -d postgres`
   - Check DATABASE_URL format
   - Verify migrations ran

## Code Snippets

### Reusable Auth Middleware
```javascript
const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId);
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
```
```

### Communication Excellence

#### Progress Updates

```markdown
## Progress Update - Jan 16

✅ **Completed:**
- User registration with validation
- Password hashing (bcrypt, 12 rounds)
- JWT token generation
- Login endpoint with rate limiting

🔧 **In Progress:**
- Refresh token implementation
- Password reset flow

📊 **Metrics:**
- Test coverage: 87%
- Endpoints completed: 2/4
- Est. completion: Jan 18

💡 **Discovered:**
- Project uses custom error classes
- Rate limiting already configured globally
- Existing email service in `src/services/email.js`
```

#### Asking for Help

```markdown
## 🚨 Need Clarification on Session Management

**Context**: Implementing refresh tokens for the auth system.

**Question**: The requirements mention "session management" but we're using stateless JWTs. Should I:

A) Implement refresh tokens (stateless)
B) Add Redis for session storage (stateful)
C) Stick with simple JWT expiration

**Current Implementation**: 
- JWTs expire after 24h
- No refresh mechanism yet
- No session storage

**Recommendation**: Option A seems most aligned with current architecture.

What's the preferred approach for this project?
```

### Testing Philosophy

1. **Test Critical Paths First**
   - Authentication flows
   - Data validation
   - Error scenarios

2. **Maintainable Tests**
   ```javascript
   // Good: Descriptive, isolated
   describe('POST /auth/login', () => {
     it('returns 401 for invalid password', async () => {
       const user = await createTestUser();
       const res = await request(app)
         .post('/auth/login')
         .send({ email: user.email, password: 'wrong' });
       
       expect(res.status).toBe(401);
       expect(res.body.error).toBe('Invalid credentials');
     });
   });
   ```

3. **Document Test Helpers**
   - Note reusable test utilities
   - Share fixtures between features
   - Keep tests readable

## Common Pitfalls

### Orchestrator Pitfalls

1. **Vague Requirements**
   - Workers waste time clarifying
   - Solution: Specific success criteria

2. **Missing Context**
   - Workers lack project knowledge
   - Solution: Rich starter CLAUDE.md

3. **Delayed Responses**
   - Workers blocked on questions
   - Solution: Daily PR reviews

### Worker Pitfalls

1. **Not Backing Up CLAUDE.md**
   - Lost knowledge on errors
   - Solution: Frequent private branch commits

2. **Working in Isolation**
   - Missing project patterns
   - Solution: Read existing code first

3. **Committing CLAUDE.md**
   - Fails CI/CD checks
   - Solution: Add to .git/info/exclude

## Success Patterns

### Knowledge Accumulation

```
Assignment 1: "Everything is new, documenting basics"
    ↓ (backup CLAUDE.md)
Assignment 2: "Applying patterns from last time"
    ↓ (reference previous CLAUDE.md)
Assignment 3: "Expert mode - know all the gotchas"
```

### Effective Orchestration

1. **Start Small**
   - First assignment: Simple, well-defined
   - Build worker confidence
   - Establish workflow

2. **Scale Gradually**
   - Add workers as needed
   - Increase assignment complexity
   - Maintain quality standards

3. **Celebrate Successes**
   - Acknowledge good work
   - Share innovative solutions
   - Build team culture

## Metrics for Success

### Orchestrator Metrics
- Time to merge PRs
- Questions per assignment
- Worker productivity growth
- Code quality consistency

### Worker Metrics
- Knowledge base growth
- Time to complete tasks
- Code review feedback
- Test coverage

## Conclusion

Successful orchestration requires:
- Clear communication
- Systematic knowledge building
- Consistent workflows
- Mutual respect

The goal is not just task completion, but building a knowledgeable, efficient team of AI workers who understand your codebase deeply.

[← Architecture](architecture.md) | [Home](index.md)