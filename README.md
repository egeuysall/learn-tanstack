# Learn TanStack Query

A hands-on learning project built to master state management with Zustand and server state with TanStack Query.

## What I Learned

### Zustand
- Basic state management with `set` and `get`
- Persistent state with `persist` middleware
- Store communication (stores talking to each other)
- When to use Zustand vs useState vs TanStack Query
- Performance optimization with `useShallow`

### TanStack Query
- Fetching data with `useQuery`
- Mutations (POST/PUT/DELETE) with `useMutation`
- Cache invalidation with `invalidateQueries`
- Loading and error states
- Query keys for caching and refetching
- Pagination with dynamic query keys

### Architecture Decisions
- **TanStack Query** → Server state (API data, caching)
- **Zustand** → Client state (UI state, pagination, preferences)
- **useState** → Local/temporary state (forms, modals)

## Project Features

- Blog listing with pagination
- Admin panel to create new blogs
- Real API integration with JWT authentication
- Automatic cache updates after mutations

## Tech Stack

- Next.js 15
- TypeScript
- TanStack Query
- Zustand
- Tailwind CSS

## Key Takeaways

- State management isn't one-size-fits-all
- Use the right tool for the right job
- Server state ≠ Client state
- Performance matters (useShallow, proper selectors)
- Environment variables for secrets (never commit tokens!)

