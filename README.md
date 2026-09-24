# Arcane Assignments

A gamified assignment planner built for Cloud Run: animated responsive interface, Node.js API, and Cloud Firestore persistence. Tasks, notes, due dates and completion times live in the `arcane_assignments` Firestore collection. The standalone browser-only prototype has been replaced; opening `index.html` without the server no longer works.

## Run and deploy

Create a Firestore **Native mode** `(default)` database in the same Google Cloud project as Cloud Run. Grant the Cloud Run runtime service account `Cloud Datastore User` (`roles/datastore.user`) on that project or the narrowest equivalent permissions. No Firebase web config or service-account JSON key is needed: the server uses Application Default Credentials. Locally: install Node.js 22+, run `gcloud auth application-default login`, set `GOOGLE_CLOUD_PROJECT`, then run `npm install && npm start` and open `http://localhost:8080`. Run `npm test` for gameplay tests. Deploy the included Dockerfile through your existing Cloud Run deployment pipeline; it listens on `0.0.0.0:$PORT`.

The server exposes `GET/POST /api/tasks` and `PATCH/DELETE /api/tasks/:id`. It loads up to 500 tasks at a time. The UI supports quick due-date presets (today, tomorrow, one week, this weekend), custom date/time, notes, editing, searching, sorting, status views, focus timer and JSON export. Export saves the tasks currently loaded, not the entire database if over 500.

**Before public use:** there is no user authentication or per-user Firestore isolation. Every visitor with API access can read, edit and delete every task. Do not enable public unauthenticated Cloud Run access; add per-user authentication/authorization first. Browser use behind IAM also needs a suitable authentication proxy or browser integration, not supplied here. Server Firestore SDK requests use IAM and bypass Firestore Security Rules. This app does not sync with the original Productivity repository or its Firestore data.
