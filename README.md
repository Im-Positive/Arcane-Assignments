# Arcane Assignments

A standalone, mobile-friendly gamified assignment planner. Open `index.html` in a browser to play; no build or account is required. This is a new project and **is not connected to the original Productivity repo or its Firebase data**.

## Gameplay

- Create assignments with local due dates and times, mark them complete, delete them, and filter open/all/finished quests.
- Completed on-time assignments grant 35 power; late ones grant 15. Every 100 power raises your mage level. Power is recalculated from completed quests instead of added on each click.
- Open assignments due within 48 hours each add one pressure; overdue assignments add two. The orb changes from calm to uneasy at pressure 1 and volatile at pressure 4.
- Completing an assignment triggers a pulse, flying sparks, and a power notification. Reduced-motion settings suppress particle effects and animations.
- Tasks persist in the browser's `localStorage`. Refreshing the page keeps them, but other devices and browsers will not sync. Clearing site data removes them.

## Notes

This is a client-only prototype without accounts, notifications, or Firebase integration. The page does not fetch third-party assets or transmit task data. For production use, add tests, sync, and data-export support.
