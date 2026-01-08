# Self-Psych

A web app for taking psychological self-assessment questionnaires. The app presents one question at a time, calculates scores based on validated scoring methods, and stores your results locally for tracking over time.

Currently includes the Perfectionistic Self-Presentation Scale (PSPS), a 27-item measure with three subscales: Perfectionistic Self-Promotion, Nondisplay of Imperfection, and Nondisclosure of Imperfection. The scoring handles reversed items automatically and displays both subscale and total scores upon completion.

All results are saved to localStorage with timestamps, allowing you to view your history and track changes across multiple sessions.

## Running the app

```
npm install
npm run dev
```
