/* ROOM POLL ROUTER: SETTINGS (FCIS 2026)
   This is the only file you edit before a session. */
window.RPR_CONFIG = {
  /* Firebase web app settings. Same room-poll-router project used for ESJ.
     Each session keeps its own votes, so ESJ and FCIS never mix. */
  firebase: {
    apiKey: "AIzaSyAyOGfga0qc3QbkU-1uFvEX96UG8auy5KE",
    authDomain: "room-poll-router.firebaseapp.com",
    projectId: "room-poll-router",
    storageBucket: "room-poll-router.firebasestorage.app",
    messagingSenderId: "358936378450",
    appId: "1:358936378450:web:b22a37826e82a0c3a3f38b"
  },

  /* Which run of the poll this is. Use ?s=rehearsal in the address while practicing. */
  session: "fcis-2026-11-06",

  /* Shown on phones and the big screen. */
  title: "Human-Centered AI Classrooms",
  subtitle: "FCIS 2026",

  /* Where the phone sends people after they vote. */
  resources: "resources/",

  /* Decks that "Start the session" (or S) opens for each path.
     Generated from the master deck. Never edit these three directly. */
  decks: {
    J: "https://claude.ai/artifact/U35A9dChkUKDrbRkvyzcNu",
    I: "https://claude.ai/artifact/V9vSK1iaT3Has7kEJoFkxz",
    S: "https://claude.ai/artifact/JMXCETViaYDQxgM9wZ3QA2"
  }
};
