# Product

## Register

product

## Users

A single user (the developer themself), based in Graz, Austria, using Sprachlabor daily for intensive, self-directed language study: German (Austrian-focused) during the day, English in the evening, with a deliberate temporal separation between the two. This is a personal-use tool, not a multi-tenant product — no onboarding funnel, no acquisition/retention concerns, no accounts.

## Product Purpose

An offline-first PWA covering the full daily study loop: FSRS-scheduled vocabulary review, a smart scheduler enforcing DE/EN separation, a shadowing (pronunciation practice) lab, a manual error journal, dashboard analytics, a frequency-based text analyzer, a full grammar module (theory + auto-checked exercises + spaced-repetition topic reviews) for both German and English, an A1-C2 word-levels self-assessment, and JSON backup/restore. Success is a sustained daily habit and steady, measurable progress toward fluency — not engagement metrics.

## Brand Personality

Строгий, зосереджений, дисциплінований (strict, focused, disciplined). A serious study instrument, not a consumer app — it should feel like a well-organized textbook/reference tool that respects the user's attention, not an app trying to keep them coming back.

## Anti-references

- **Duolingo-style gamification**: mascots, streaks, badges, confetti, cartoonish icon sets, playful micro-copy. This app deliberately avoids gamification theater (see `DECISIONS.md`'s error-journal/dashboard decisions — progress is shown as factual counts/percentages, not celebrations).
- **Generic SaaS dashboard**: nested cards, decorative gradient accents, hero-metric tiles, dense chrome that doesn't serve the study content itself.

## Design Principles

1. **Function over decoration** — every visual treatment (color, weight, spacing) must help the user parse grammar/vocabulary faster; nothing is added purely for visual interest.
2. **No gamification theater** — progress indicators stay factual (due counts, percentages, dates), never celebratory or streak-driven.
3. **Respect the existing DE/EN accent system** — red (German) / blue (English) already carries meaning app-wide; new components extend that system rather than introducing competing color logic.
4. **Density with scannability** — grammar content is inherently dense; solve that with typographic hierarchy, whitespace, and visual grouping, not by hiding content behind extra clicks.
5. **Single-user, dark-first, distraction-free** — optimize for one person's focused daily study session, not enterprise multi-tenant polish or broad audience appeal.

## Accessibility & Inclusion

No special accommodation requirements beyond solid, deliberate contrast and readability — the user's explicit ask (making dense grammar text easier to read/scan) already is the accessibility bar here. Maintain standard WCAG AA contrast (≥4.5:1 body text, ≥3:1 large text) as a baseline.
