# iPhone installation and real push reminders

## Requirements

- iOS 16.4+ and an HTTPS Cloud Run URL. In Safari, Share → Add to Home Screen, then open the Arcane icon. Tap **Enable reminders** inside the installed app: permission requests require that user action.
- A default Firestore database in the Cloud Run project and runtime service account with `roles/datastore.user`. Subscription records go in `arcane_push_subscriptions`; per-task/device reminder deduplication goes in `arcane_push_deliveries`. Both collections are created automatically.
- Generate keys locally with `npm install && npm run vapid`. Keep the private key secret. Set `VAPID_PUBLIC_KEY`, `VAPID_PRIVATE_KEY`, and `VAPID_SUBJECT` (for example `mailto:you@example.com`) as Cloud Run environment variables/secrets. Store the **private key** and `PUSH_CRON_SECRET` in Secret Manager and grant the Cloud Run runtime account access. Never put either in GitHub or browser files. Keep the VAPID pair stable across deployments or iPhone subscriptions will need renewal.
- Set a long random `PUSH_CRON_SECRET` on Cloud Run. Configure a Cloud Scheduler HTTP job to POST `/api/push/dispatch` every hour with header `X-Arcane-Cron-Secret` set to that same secret. For a private Cloud Run service, configure Cloud Scheduler OIDC authentication with a service account authorized as Cloud Run Invoker, and audience set to the service base URL (not the path). If the service is public, the cron secret is the only protection on this route; keep it secret. Use a scheduler region close to the service.

## Behavior

The service worker handles push and opens Arcane on tap. Due-soon reminders go out once per device/task/due timestamp when an open quest enters its last 24 hours; overdue reminders go out once within 24 hours after its due time. Hourly scheduling may deliver up to an hour after a threshold. Deduplication records are durable in Firestore and subscriptions with expired endpoints are removed. Time windows are based on UTC timestamps, displayed locally by the iPhone. No reminders are sent without a subscription and scheduled dispatch.

## Security and limitations

**The application still has no login or per-user task isolation.** Any visitor with API access can edit all tasks or subscribe their own device to the shared reminders. A subscription being on only your iPhone does not secure the app. Restrict Cloud Run ingress/IAM or add proper user authentication before public use. The opt-in request runs only when the user taps the button. You may need to remove and re-add the Home Screen app after deploying the manifest/icon changes, then tap Enable reminders. SVG icons can be inconsistent as iPhone Home Screen artwork; a PNG icon may be needed for polished presentation.
