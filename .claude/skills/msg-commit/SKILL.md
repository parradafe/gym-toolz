---
name: msg-commit
description: Generates a commit message that summarizes the implemented changes, following the commit message format from CONTRIBUTING.md (short, imperative, Conventional Commits style such as "feat: add kettlebell weight presets"). It only writes the message; it never stages files or runs git commit. Use only when the user explicitly runs /msg-commit.
disable-model-invocation: true
argument-hint: [optional hint about the change]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

# msg-commit

Generates a commit message summarizing the current changes, using the format defined in the "Commit messages" section of `CONTRIBUTING.md`. It does not create the commit: the user does that themselves.

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
3. If the changes mix unrelated concerns, suggest splitting them into separate commits (CONTRIBUTING asks for small, focused changes) and provide one message per group, listing the files each covers.
4. Pick the type from the nature of the change and write the subject. If `$ARGUMENTS` is provided, use it as a hint for the summary.
5. Output the message in a code block so it can be copied as is.

## Rules

- Only generate the message. Never run `git add`, `git commit`, `git push`, or any command that modifies the repository or its history.
- Do not add attribution trailers (e.g. `Co-Authored-By`) unless the user asks.
