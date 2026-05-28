# Gate Ministries Blouberg · High Tea Registration

A single-page registration site for the **High Tea on 15 August 2026**.

* Pure HTML + CSS — runs on GitHub Pages with no build step.
* Submissions are delivered to your inbox via [Formspree](https://formspree.io) (free, no coding needed).

---

## Setup (2 minutes)

### Step 1 — Get a Formspree form endpoint

1. Go to <https://formspree.io> and click **Get Started**.
2. Sign up with **`bpillay23@gmail.com`** — this is the address that will receive every registration.
3. After signing in, click **+ New Form**, give it a name like *"High Tea Registration"*, and confirm.
4. Formspree gives you a form endpoint that looks like:
   `https://formspree.io/f/xpzgkqyw` (your own unique ID at the end)
5. Copy that whole URL.

### Step 2 — Paste it into the site

Open **`index.html`** in any text editor (Notepad works) and find this line:

```html
action="https://formspree.io/f/YOUR_FORM_ID"
```

Replace `https://formspree.io/f/YOUR_FORM_ID` with the URL you just copied. Save the file.

### Step 3 — Push to GitHub & turn on Pages

1. Create a new GitHub repo (any name, e.g. `gate-hightea`).
2. Upload these three files: `index.html`, `styles.css`, `README.md`.
3. In the repo, go to **Settings → Pages**.
4. Under **Source**, pick branch `main` and folder `/ (root)`. Click **Save**.
5. After about a minute, your site is live at:
   `https://<your-username>.github.io/<repo-name>/`

Share that link with your community.

### Step 4 — Confirm your email with Formspree

The very first time someone submits the form, Formspree will email **bpillay23@gmail.com** asking you to confirm. Click the confirmation link, and from that point on every submission lands in your inbox automatically.

---

## What you'll receive

Each time someone registers, you get an email like this:

> **🌹 New High Tea Registration**
>
> First name: Jane
> Surname: Smith
> Email: jane@example.com
> Contact number: 082 555 1234
> Suburb: Bloubergstrand
> Age group: 36 – 45
> Confirmed 18+: Yes

The registrant sees a graceful thank-you message on the page itself.

---

## Customising

| What | Where |
| ---- | ----- |
| Email subject line | `index.html` — search for `_subject` |
| Age group options | `index.html` — inside `<select name="Age group">` |
| Colours | `styles.css` — the `:root` block at the top |

---

## Limits

Formspree's free plan allows **50 submissions per month**. If you expect more, they have an inexpensive upgrade — but 50 is usually plenty for a single event.

---

## Contact

For event questions: `admin@gateministriesblouberg.co.za` · Carina · 081 541 4384
