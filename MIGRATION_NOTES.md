# Migration notes

## Source analysis
- Original: one HTML file, 14.1 MB, 7,163 lines.
- Screens: onboarding, home, recent, social, history, quiz, result, browse, detail, quickadd, wishlist, incoming, prizes, settings.
- Embedded scripts: 4; SheetJS vendor code replaced with npm `xlsx@0.18.5`.
- Extracted static assets: 174.
- Legacy runtime named functions detected: 423.
- Inline DOM event attributes detected: 85.
- Persistent storage: localStorage (0 literal keys detected; additional dynamic keys may exist).

## Architecture decision
This is a conservative migration. React owns app composition and file boundaries; the original markup and behavior are preserved through a compatibility bridge. This prevents a high-risk all-at-once rewrite of hundreds of DOM-dependent behaviors. New work should be implemented as native React/TypeScript and individual legacy screens can be converted incrementally.

## Intentional technical debt
- Legacy screen markup is loaded as raw HTML for pixel parity.
- Existing inline event attributes and direct DOM manipulation remain inside the compatibility layer.
- Existing localStorage schema is unchanged to preserve user data.
- Existing network integrations are unchanged.
- Legacy scripts are served from `public/legacy/` and execute in global scope.

## Safe next migration order
1. Navigation and routing.
2. Shared modals/buttons/cards.
3. One low-risk page at a time.
4. localStorage access behind typed repositories.
5. External integrations behind `services/`.
6. Supabase only after behavior parity is confirmed.


## Integrated prototypes
- Social prototype merged into `screen-social`; it uses the main app design system and only retains feature-specific CSS.
- Listening Session merged as `screen-listening`, using the main app cards/buttons/inputs/modals.
- Listening collection is bridged to the main `RECORDS` store; demo records remain only as an emergency fallback.
- Listening mini-player is rendered outside the listening screen so it can remain visible while browsing the main app.
