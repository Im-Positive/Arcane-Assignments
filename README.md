# Arcane Assignments

A Cloud Run-ready full-stack assignment planner with a game-like orb, Node.js API, and persistent Cloud Firestore storage. The standalone browser prototype in `index.html` is kept for offline use; when served by Node, the page uses the Firestore API client instead. Those are separate datasets.

## Run locally

1. Create a Firestore database in your Google Cloud project and install Node.js 22+.
2. Run `gcloud auth application-default login` and set `GOOGLE_CLOUD_PROJECT` to your project ID.
3. Run `npm install`, then `npm start`; visit `http://localhost:8080`. Run `npm test` for the gameplay tests.

## Deploy to Cloud Run

Deploy the included `Dockerfile` through your normal Cloud Run build/deploy workflow, or use `gcloud run deploy arcane-assignments --source . --region REGION --project PROJECT_ID` from the repo directory after selecting your real region and project. Ensure Firestore is enabled and the Cloud Run runtime service account can access it (grant the minimum Firestore/Datastore user permissions needed). The server uses Application Default Credentials, binds `0.0.0.0`, and reads Cloud Run's `PORT`. No service-account key should be committed.

**Security:** This version does not implement user authentication. Its API stores all assignments in one shared `arcane_assignments` collection. Do not permit unauthenticated public Cloud Run access; restrict service ingress/IAM to trusted users until proper per-user login and authorization are implemented. Cloud Run IAM-authenticated API calls from a browser need an appropriate authenticated proxy or another browser-auth integration; this repo does not provide one. This code is not connected to the original Productivity repo or its Firebase data.

Gameplay: on-time completions give 35 power, late completions 15. Open assignments due within 48 hours add one instability; overdue assignments add two. The orb becomes volatile at four instability and celebrates completions with sparks.
