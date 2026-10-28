# FCIS Poll and Resources: Setup Guide

This folder runs two things for the FCIS session on November 6:

1. The live warm-up poll (phones vote, the console picks the path deck).
2. The public resource page attendees reach from the QR code at the close.

It uses the same free Firebase database as ESJ. FCIS votes are stored under their own session name, so ESJ results never mix in. You do not need to change anything in Firebase.

## What's in this folder

| File | What it is | Edit it? |
|---|---|---|
| index.html | The phone voting page | No |
| console.html | The big-screen console | No |
| config.js | Session name, titles, path deck links | Only if a deck link changes |
| quiz.js | The six questions and the scoring | Only to change questions |
| resources/index.html | The public resource page | No |
| firestore.rules, db.js, qrcode.js, style.css | Supporting files | No |

## Step 1: Put it online as a new Netlify site (about 5 minutes)

Keep the ESJ site as it is. FCIS gets its own site.

1. Go to app.netlify.com and sign in.
2. Choose Add new site, then Deploy manually.
3. Drag this whole unzipped folder onto the upload area. Wait for "Published."
4. Open Site configuration, then Change site name. Type exactly: **fcis-human-centered-ai** and save.
5. Confirm the address at the top now reads **fcis-human-centered-ai.netlify.app**.

The QR code on the closing slide points to fcis-human-centered-ai.netlify.app/resources/. If Netlify says that name is taken, stop and tell Claude the name you got, so the QR code can be regenerated. (This is the step that went wrong with the ESJ Session 1 QR codes.)

## Step 2: Check the public pages on your phone

Use a phone that is not signed in to Google or Claude, or a private browser window.

1. Open fcis-human-centered-ai.netlify.app/resources/. The resource page should load.
2. Tap each kit button. Each PDF should open without asking you to sign in.
3. Open any path deck on your laptop, go to the last slide, and scan its QR code. It should open the same resource page.

## Step 3: Rehearse the poll (about 10 minutes)

Use ?s=rehearsal on both devices so test votes stay separate.

1. Laptop: open fcis-human-centered-ai.netlify.app/console.html?s=rehearsal
2. Phone: scan the console's QR code (it carries ?s=rehearsal automatically). Give one word and answer the six questions. You should see "You're in" and an orange Open the session resources button.
3. On the console: press 1 (word cloud), 2 (live bars), 3 (the chosen path), 4 (decode).
4. Press S. The matching path deck opens in a new tab. Click Present and step through.
5. Try Demo data on the console to see a full room. It saves nothing.

## Step 4: Clean up after rehearsal

1. In Firebase, open Firestore Database, then Data, then sessions. Delete the votes under **rehearsal**. Nothing should exist yet under **fcis-2026-11-06**.
2. On the presenting laptop, clear the site's saved data: click the icon to the left of the address, then Site settings, then Delete data. This removes any locked test results.
3. Reload the console with no ?s= on the end. The bottom bar should say "Live · session fcis-2026-11-06" with 0 people.

## On November 6

- Sign in to Claude in Chrome on the presenting laptop. The decks open only for your account.
- Open two tabs: the master deck (cover slide) and fcis-human-centered-ai.netlify.app/console.html
- Press H on the console to hide the control bar.
- Keys: 1 Join, 2 Live, 3 Decision, 4 Decode. S locks the results and opens the chosen deck. Click a word in the cloud to hide it.
- Never show screen 3 to the room. It names the path.
- At the close, the reveal slide's notes tell you when to switch back to the console and press 4 to show how each question leaned.

## How the path is chosen

- Questions 1 to 4 each add points to Joy, Integrity, or Safety. Question 1 counts double.
- Questions 5 (role) and 6 (grades) are a room snapshot only.
- Ties go to whichever protection won Question 1, then to Integrity.
- If the wifi fails, run Question 1 as a hand count using the backup slide in the master deck.
