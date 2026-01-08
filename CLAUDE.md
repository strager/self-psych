# Self-Psych Development Guidelines

## Adding a New Psychological Exam

When adding a new exam, you must include:

1. **Citation in code** - Add a comment block at the top of the data file with full APA citation and DOI/URL
2. **Citation in UI** - Add short citation (Author et al., Year) to HomeView and full citation to ResultsView
3. **Tests** - Add tests in `src/utils/scoring.test.ts` covering:
   - Subscale score calculations
   - Min/max answer edge cases
   - Any reversed items
   - excludeFromTotal behavior if applicable

## Commands

- `npm run dev` - Start dev server
- `npm test` - Run tests
- `npm run build` - Production build (includes type check)

## Project Structure

- `src/data/` - Exam definitions (questions, subscales, scoring config)
- `src/utils/scoring.ts` - Score calculation logic
- `src/utils/scoring.test.ts` - Scoring tests
