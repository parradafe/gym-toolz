# Contributing to GYM TOOLZ

Thanks for your interest in GYM TOOLZ! Contributions of all kinds are welcome: bug reports, ideas, documentation and code.

## Project governance

GYM TOOLZ is currently maintained by its original author alone. **At this time, no additional admins or maintainers are being added to the project.** You are still very welcome to contribute through issues and pull requests, but merge decisions, releases and the project's direction remain with the author. This may change in the future; if it does, this document will be updated.

## Code of conduct

Be respectful and constructive. Harassment, discrimination or personal attacks are not tolerated. Assume good intentions and focus feedback on the work, not the person.

## Ways to contribute

- **Report a bug:** open an issue with the steps to reproduce, expected vs. actual behavior, and your browser/device.
- **Suggest a feature:** open an issue describing the problem you want to solve before writing code, so we can agree on the approach.
- **Improve the docs:** fixes to typos, clarity and examples are always appreciated.
- **Submit code:** see the workflow below.

## Development setup

Requires Node.js and [pnpm](https://pnpm.io).

```bash
pnpm install     # install dependencies
pnpm dev         # development server
pnpm build       # type-check + production build
pnpm lint        # ESLint
```

## Workflow

1. Fork the repository and create a branch from `main` with a descriptive name (e.g. `feat/kettlebell-calculator`, `fix/lbs-rounding`).
2. Make your changes in small, focused commits.
3. Run `pnpm lint` and `pnpm build` and make sure both pass.
4. Open a pull request against `main` explaining **what** changed and **why**. Link the related issue if there is one.
5. Respond to review feedback. The maintainer may request changes or decline a PR that doesn't fit the project's direction.

Keep pull requests small and focused on a single concern; large or mixed PRs are harder to review and slower to merge.

## Coding guidelines

- Use **TypeScript** and avoid `any`.
- Follow the existing structure: feature components under `src/components/<Feature>`, shared UI under `src/components/shared`, global state in `src/store`, helpers in `src/lib`.
- Match the style of the surrounding code (naming, comment density, formatting) and keep ESLint clean.
- Weights are **always stored in kg**; convert only for display (see `src/lib/units.ts`).
- The UI is in Spanish; keep user-facing strings consistent with it.
- Reuse existing shared components and Tailwind design tokens instead of adding ad-hoc styles.
- If you change the shape of the persisted state (`gym-toolz:v1`), keep old data working through the store's `merge`/`migrate` logic.

## Commit messages

Use short, imperative messages that explain the change, optionally following [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add kettlebell weight presets
fix: round LBS conversion to one decimal
docs: update contributing guide
```

## Notes

And yes, this is mostly a "vibe-coded" app. I created it as a quick tool for my own workouts, but with your help it can be improved so that all of us can use it in a simple way.

## Reporting security issues

Please do not open a public issue for security vulnerabilities. Contact the maintainer privately instead.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.
