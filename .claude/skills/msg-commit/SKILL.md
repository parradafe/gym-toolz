---
name: msg-commit
description: Generates a single short paragraph that summarizes all the implemented changes as one commit message, following the style from CONTRIBUTING.md (imperative, optional Conventional Commits prefix such as "feat: add kettlebell weight presets"). It only writes the message; it never stages files or runs git commit. Use only when the user explicitly runs /msg-commit.
disable-model-invocation: true
argument-hint: [optional hint about the change]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

# msg-commit

Generates one commit message for the current changes, using the style defined in the "Commit messages" section of `CONTRIBUTING.md`. It does not create the commit: the user does that themselves.

## Format

Always a single paragraph, no matter how many things changed. It briefly and simply describes the changes, in imperative mood, in one or two sentences at most:

```
feat: add dumbbell rack visualizer and quick adjust controls
fix: round LBS conversion to one decimal and fix plate tower spacing
```

- Start with a Conventional Commits type: `feat`, `fix`, `docs`, `refactor`, `style`, `test`, `chore`, `perf`, `build`. Use the type that best fits the overall change.
- Lowercase, imperative mood, no trailing period, ideally under 72 characters.
- Write the message in English, even though the UI strings are in Spanish.
- Never split the message into a subject and a body, and never add bullet lists.
- Even if the changes touch unrelated areas, produce only one message that covers all of them.

## Steps

1. Run `git status` and `git diff HEAD` to see staged and unstaged changes. If there are none, say so and stop.
2. Run `git log -5 --oneline` to match the repository's recent style.
3. Identify every change and summarize them all in one paragraph. If `$ARGUMENTS` is provided, use it as a hint for the summary.
4. Output the message in a code block so it can be copied as is.

## Rules

- Only generate the message. Never run `git add`, `git commit`, `git push`, or any command that modifies the repository or its history.
- Do not add attribution trailers (e.g. `Co-Authored-By`) unless the user asks.
