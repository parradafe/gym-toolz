---
name: msg-commit
description: Creates a git commit that summarizes the implemented changes, following the commit message format from CONTRIBUTING.md (short, imperative, Conventional Commits style such as "feat: add kettlebell weight presets"). Use only when the user explicitly runs /commit.
disable-model-invocation: true
argument-hint: [optional hint about the change]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*)
---

# commit

Creates a commit summarizing the current changes, using the format defined in the "Commit messages" section of `CONTRIBUTING.md`.

## Format

Short, imperative messages that explain the change, optionally following Conventional Commits:

```
feat: add kettlebell weight presets
fix: round LBS conversion to one decimal
docs: update contributing guide
```

- Subject line only by default: `<type>: <summary>`, lowercase, imperative mood, no trailing period, ideally under 72 characters.
- Types: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `perf`, `build`.
- Write the message in English, even though the UI strings are in Spanish.
- Add a body only if the _why_ is not obvious from the subject.

## Steps

1. Run `git status` and `git diff HEAD` to see staged and unstaged changes. If there are none, say so and stop.
2. Run `git log -5 --oneline` to match the repository's recent style.
3. If the changes mix unrelated concerns, propose splitting them into separate commits (CONTRIBUTING asks for small, focused changes) and ask before proceeding.
4. Stage the relevant files by name. Never use `git add -A` or `git add .`, and never stage secrets or `.env` files.
5. Pick the type from the nature of the change and write the subject. If `$ARGUMENTS` is provided, use it as a hint for the summary.
6. Commit with `git commit -m`, ending the message with the attribution trailer required by the session context, if any.
7. Run `git status` to confirm and report the resulting commit hash and message.

## Rules

- Do not push, amend, or rewrite history.
- Do not skip hooks (`--no-verify`). If a hook fails, fix the problem and create a new commit.
