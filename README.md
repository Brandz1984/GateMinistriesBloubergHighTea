# Gate Ministries Blouberg · High Tea Registration

A single-page registration site for the **High Tea on 15 August 2026**.

* Pure HTML/CSS/JS — no build step, runs straight from GitHub Pages.
* Sends every registration to your email via [Web3Forms](https://web3forms.com) (free).
* Generates a downloadable **QR pass** for each registrant — they show it at the door.
* Web3Forms can also send the registrant an automatic confirmation email.

---

## 1. Setup (about 5 minutes)

### Step 1 — Get a Web3Forms access key

1. Go to <https://web3forms.com>.
2. Sign up with **`bpillay23@gmail.com`** (this is the address that will receive every registration).
3. Web3Forms will email you an **Access Key** — a long string of letters and numbers.

### Step 2 — Paste the key into the site

Open **`script.js`** in any text editor and find this line near the top:

```js
const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
```

Replace `YOUR_ACCESS_KEY_HERE` with the key you got by email. Save the file.

> You can also change `NOTIFY_EMAIL` if you ever want to switch which address receives notifications. The actual delivery address is controlled by the email you used to sign up at Web3Forms.

### Step 3 — (Optional) Turn on auto-reply to the registrant

In your Web3Forms dashboard, go to **Settings → Auto Response** and enable it. Suggested values:

* **From name:** `Gate Ministries Blouberg`
* **Subject:** `Your High Tea seat is reserved 🌹`
* **Message:**

  > Dear {{first_name}},
  >
  > Thank you for registering for our High Tea on **15 August 2026 at 9:30 AM**, at 3 Viola Road, Blouberg.
  >
  > Your booking reference is **{{Reference}}**. Please present the QR pass shown on the confirmation page at the door.
  >
  > Looking forward to celebrating with you!
  >
  > — Gate Ministries Blouberg

Save. Now every registrant gets a confirmation in their inbox automatically.

### Step 4 — Push to GitHub & turn on Pages

1. Create a new GitHub repo (any name, e.g. `gate-hightea`).
2. Upload these four files: `index.html`, `styles.css`, `script.js`, `README.md`.
3. In the repo go to **Settings → Pages**.
4. Under **Source**, pick branch `main` and folder `/ (root)`. Click **Save**.
5. After about a minute, your site is live at:
   `https://<your-username>.github.io/<repo-name>/`

That's the link you share with your community.

---

## 2. How it works

* When someone submits the form, the registration is POSTed to Web3Forms, which forwards it to your inbox as a tidy email.
* The browser then generates a unique QR code containing the registrant's name, contact details, age group, suburb, and a unique reference number — and a styled "Admit One" PNG pass they can download.
* If Web3Forms auto-reply is on, the registrant also gets a confirmation email instantly.

### What the QR contains

When scanned at the door, the QR shows readable text like:

```
GATE MINISTRIES BLOUBERG · HIGH TEA

Name:    Jane Smith
Email:   jane@example.com
Phone:   082 555 1234
Suburb:  Bloubergstrand
Age:     36 – 45

Ref:     GMB-HT-LXY3K2
Date:    15 August 2026 · 9:30 AM
Venue:   3 Viola Road, Blouberg, Cape Town
```

Any QR scanner app (or your phone camera) will display it instantly.

---

## 3. Customising

| What | Where |
| ---- | ----- |
| Event date / time / venue | `script.js` — the `EVENT` object near the top |
| Age group options | `index.html` — inside `<select name="age_group">` |
| Colours | `styles.css` — the `:root` block at the top |
| Logo | `index.html` — the `.brand-logo` block (currently an SVG mark of "G") |
| QR colour | `script.js` — the `color` block inside `QRCode.toCanvas` |

---

## 4. Testing locally

You don't need to install anything — just double-click `index.html` to open it in a browser. The form will work, but submissions won't be sent until you add the Web3Forms key. (You'll see a warning in the browser console reminding you.)

If you want to test the full flow, paste your key into `script.js` and open the file. Submissions will land in your inbox immediately.

---

## 5. Limits

* Web3Forms free tier: **250 submissions per month**. Plenty for an event this size, but worth knowing.
* The QR pass is generated on the registrant's device — if they close the tab before downloading, they'd need to register again or contact you for a re-issue. (The notification email you receive contains all their details, so you can always re-issue manually.)

---

## Contact

For event questions: `admin@gateministriesblouberg.co.za` · Carina · 081 541 4384
