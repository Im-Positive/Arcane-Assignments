# iPhone Home Screen and push foundation

Open the HTTPS Cloud Run URL in Safari on iOS 16.4+, tap Share → Add to Home Screen, launch the new Arcane icon, then tap Enable reminders. Installation is per-device; no App Store submission is required. The service worker listens for push and opens the app when a notification is tapped.

This first commit is installation and opt-in scaffolding only. It does **not** yet include `/api/push/config`, `/api/push/subscriptions`, VAPID private keys, or a scheduled sender, so the button currently reports that server keys are not configured. Do not expect reminders to arrive until those backend parts are added and deployed.

Before production: store VAPID private key in Cloud Run secrets, persist push subscriptions in Firestore, and trigger reminder dispatch through Cloud Scheduler or a similar external scheduler. Do not embed private keys in browser code or GitHub. The current app has no user isolation; device-only subscription does not make the shared task API private.
