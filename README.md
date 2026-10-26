# 🦸‍♂️ Superhero Physique Plan — Interactive Workout & Biomechanics Tracker

An interactive, zero-build web application tailored to the **4-Day "Superman" V-Taper & Spine-Shielded Hypertrophy Protocol** (Target: **80 kg @ ~11% Body Fat**).

## ✨ Key Features

1. **Interactive 4-Day Workout Logger (`Upper 1`, `Lower 1`, `Upper 2`, `Lower 2`)**
   - Pre-loaded with your exact sets, rep ranges, rest periods, target RIR (`1–2 RIR` on compounds, `0 RIR` on supported isolations), and biomechanical execution cues.
   - **Previous Session Comparison & Progressive Overload Engine:** Automatically displays your last session's weights/reps for each exercise and tells you whether to add reps or bump the weight (`+2.5 kg`).
   - **Auto-Trigger Rest Timer:** Checking off any set automatically starts that exercise's exact rest timer (`60s`, `90s`, `2m`, `2.5m`, `3m`) with an audio chime when time is up.
   - **Mandatory 8-Minute Pre-Lower & Pickleball Warm-Up:** Built-in interactive checklist and countdown timers for the Half-Kneeling Couch Stretch, Seated 90/90 Switches, and McGill Bird-Dog on `Lower 1` and `Lower 2`.
2. **Strength Progression Charts & Session History**
   - Visualizes your Top Set progression curve across all 20 exercises and tracks your bodyweight trend toward **80.0 kg**.
3. **Daily Macro & Calorie Calculator (~2,700 kcal)**
   - Tracks Protein (`150–160 g`), Total Carbohydrates (`365–380 g`), and Fats (`65–70 g`) using the `P×4 + C×4 + F×9` formula.
4. **Permanent, 100% Free Hybrid Database (`localStorage` + GitHub Gist Cloud Sync + JSON Backup)**
   - **Why GitHub Gist Sync?** Free cloud SQL databases (like Supabase free tier) pause after 7 days of inactivity, and browser-only `localStorage` can be lost if you clear browser cache or get a new phone.
   - By syncing to a private **GitHub Gist** on your own GitHub account, your workout history is **100% free forever, never pauses, syncs across your phone and laptop, and keeps full Git version history** of every workout.

---

## 🚀 How to Deploy to GitHub Pages (Free Hosting)

1. Create a new repository on GitHub named `superhero-physique-plan`.
2. Push this folder to your repository:
   ```bash
   cd /Users/christseng/superhero-physique-plan
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/superhero-physique-plan.git
   git branch -M main
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **Deploy from a branch**, select `main` and `/ (root)`, and click **Save**.
5. Your app will be live at `https://<YOUR_GITHUB_USERNAME>.github.io/superhero-physique-plan/`!
   - *Tip (iPhone / Android):* Open that URL on your phone and tap **Share → Add to Home Screen** to use it as a full-screen gym app.

---

## ☁️ Setting Up Permanent GitHub Cloud Sync (1 Minute)

1. Go to [GitHub Personal Access Tokens (Classic)](https://github.com/settings/tokens/new).
2. Give it a note like `Superhero Workout Tracker`, set Expiration to **No expiration**, and check **only** the **`gist`** checkbox.
3. Click **Generate token** and copy your `ghp_...` token.
4. Open the app → go to the **☁️ Cloud DB & Backup** tab → paste your token → click **⬆ Push Local DB to GitHub**.
   - It will automatically create a private `superhero-physique-db.json` Gist and fill in your **Gist ID**.
   - To sync a second device (e.g., your phone), paste the same Token and Gist ID on your phone and click **⬇ Pull DB from GitHub**.
