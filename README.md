# Arcane Assignments

A gamified assignment planner on Cloud Run with Firestore persistence. The orb now displays numeric stability from 100% to 0%: each point of deadline pressure removes 15 stability points. Shape deformation, internal flow, orbit speed, sparkles and glow respond continuously to pressure, rather than changing only at a mood boundary. At 70% or higher it is Stirring, 36–69% Unstable, and 0–35% Critical; 100% is Steady. Reduced-motion preferences turn off animated and flashing effects.

## Types and assessment results

| Type | On-time XP | Late XP | Due-soon pressure | Overdue pressure |
|---|---:|---:|---:|---:|
| Reading | 15 | 6 | 1 | 2 |
| Homework | 20 | 8 | 1 | 2 |
| Quiz | Up to 30 based on score | Based on score | 2 | 4 |
| Project | 50 | 20 | 3 | 6 |
| Exam | Up to 60 based on score | Based on score | 4 | 8 |

Quizzes and exams are scheduled like other quests, but checking one opens a score form instead of marking it done directly. Enter 0–100%; 70% or higher is a pass, while a lower score is still recorded and earns XP equal to the type's maximum times score/100, rounded. When the score is submitted, a spellcast, shockwave and two short colored impact-frame flashes play (green for passing, pink for below 70%). Users who prefer reduced motion do not see these effects. Reopening a scored assessment clears its grade, so a later result must be entered again. Existing completed quiz/exam tasks without a score are shown as completed but award 0 XP until reopened and scored.

Open tasks due within 48 hours cause pressure, overdue tasks cause twice as much, and completed tasks stop applying pressure. Tasks without a type remain Homework. Add older due dates directly or use Yesterday; overdue tasks are allowed. XP derives from stored completions and grades rather than incrementing on each click.

## Run and deploy

Create a Firestore Native mode `(default)` database in the Cloud Run project. Grant the runtime service account `roles/datastore.user` or narrower equivalent permissions. No web Firebase config or service-account key is needed: the server uses Application Default Credentials. Locally: Node.js 22+, `gcloud auth application-default login`, set `GOOGLE_CLOUD_PROJECT`, run `npm install && npm start` and visit `http://localhost:8080`. Run `npm test` for logic tests. Deploy the Dockerfile through Cloud Run; it listens on `0.0.0.0:$PORT`.

**Security:** No user login or per-user isolation exists. Every visitor with API access can read, change and delete all tasks. Do not make the service public without authentication. Server Firestore access uses IAM and bypasses Firestore Security Rules. API loads up to 500 tasks; JSON export contains only those loaded. No data sync with the original Productivity repo.
