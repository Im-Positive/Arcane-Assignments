# Arcane Assignments

A gamified assignment planner built for Cloud Run: responsive animated interface, Node.js API, and Cloud Firestore persistence. Tasks, type, notes, due dates and completion timestamps live in the `arcane_assignments` Firestore collection. The orb uses a dark animated arcane-energy core rather than a glossy sphere; its existing dashed orbit rings and stars remain.

## Gameplay and types

| Type | On-time XP | Late XP | Due-soon pressure | Overdue pressure |
|---|---:|---:|---:|---:|
| Reading | 15 | 6 | 1 | 2 |
| Homework | 20 | 8 | 1 | 2 |
| Quiz | 30 | 12 | 2 | 4 |
| Project | 50 | 20 | 3 | 6 |
| Exam | 60 | 24 | 4 | 8 |

Due soon means within 48 hours; a positive pressure makes the orb restless, and pressure 6+ makes it unstable. Completed quests stop applying pressure. Existing tasks without a type are treated as Homework. XP is recalculated from completed quests, not awarded cumulatively by toggling. Set an old date and time directly, or use the Yesterday button, to add an already-overdue quest; past dates are intentionally allowed. Completing an overdue quest earns late XP.

## Run and deploy

Create a Firestore **Native mode** `(default)` database in the same Google Cloud project as Cloud Run. Grant the Cloud Run runtime service account `Cloud Datastore User` (`roles/datastore.user`) or narrower equivalent permissions. No Firebase web config or service-account JSON key is needed: server uses Application Default Credentials. Locally: install Node.js 22+, run `gcloud auth application-default login`, set `GOOGLE_CLOUD_PROJECT`, run `npm install && npm start` and open `http://localhost:8080`. Run `npm test` for the gameplay tests. Deploy the Dockerfile through your Cloud Run pipeline; it listens on `0.0.0.0:$PORT`.

The UI also supports custom date/time, notes, editing, search, sorting, status views, focus timer and JSON export. The server loads up to 500 tasks; export saves only loaded tasks.

**Security:** There is no user authentication or per-user isolation. Every visitor with API access can read, edit, and delete every task. Keep Cloud Run non-public until proper user authentication and authorization are implemented. Firestore server SDK access uses IAM and bypasses Firestore Security Rules. This app does not sync with the original Productivity repository or its Firestore data.
