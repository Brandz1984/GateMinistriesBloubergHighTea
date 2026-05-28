/* ===================================================================
   GATE MINISTRIES BLOUBERG · HIGH TEA REGISTRATION
   Form submission + QR pass generation
   =================================================================== */

/* -------------------------------------------------------------------
   CONFIGURATION
   -------------------------------------------------------------------
   1. WEB3FORMS_ACCESS_KEY
      Sign up free at https://web3forms.com using bpillay23@gmail.com.
      Paste the access key you receive by email below. That's it —
      submissions will be delivered to that email automatically.

   2. NOTIFY_EMAIL
      The address that should receive a copy of every registration.
      (Web3Forms will deliver to whichever email you used to sign up,
      but this is also passed as a label inside the message.)
   ------------------------------------------------------------------- */

const WEB3FORMS_ACCESS_KEY = "YOUR_ACCESS_KEY_HERE";
const NOTIFY_EMAIL = "bpillay23@gmail.com";

const EVENT = {
  name: "Gate Ministries Blouberg · High Tea",
  date: "15 August 2026",
  time: "9:30 AM",
  venue: "3 Viola Road, Blouberg, Cape Town"
};

/* =================================================================== */

const form        = document.getElementById("registration-form");
const formView    = document.getElementById("form-view");
const successView = document.getElementById("success-view");
const errorBox    = document.getElementById("form-error");
const submitBtn   = form.querySelector(".btn-submit");

form.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();
  errorBox.hidden = true;
  errorBox.textContent = "";

  // Native validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  // Collect form values
  const fd = new FormData(form);
  const data = {
    first_name: (fd.get("first_name") || "").trim(),
    surname:    (fd.get("surname")    || "").trim(),
    email:      (fd.get("email")      || "").trim(),
    phone:      (fd.get("phone")      || "").trim(),
    suburb:     (fd.get("suburb")     || "").trim(),
    age_group:  (fd.get("age_group")  || "").trim(),
  };

  // Generate unique reference (e.g. GMB-HT-LXY3K2)
  const ref = "GMB-HT-" + Date.now().toString(36).toUpperCase().slice(-6);

  // Lock the button into loading state
  submitBtn.disabled = true;

  try {
    if (WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY !== "YOUR_ACCESS_KEY_HERE") {
      await sendToWeb3Forms(data, ref);
    } else {
      // No key configured — show a friendly warning but still complete locally
      // so you can preview the success state during development.
      console.warn(
        "[High Tea] No Web3Forms access key set. " +
        "Submissions are NOT being delivered to email. " +
        "Set WEB3FORMS_ACCESS_KEY in script.js. " +
        "See README.md for the 2-minute setup."
      );
      await new Promise(r => setTimeout(r, 600)); // small fake delay
    }

    showSuccess(data, ref);

  } catch (err) {
    console.error(err);
    submitBtn.disabled = false;
    errorBox.textContent = "We couldn't complete your registration. Please try again, or email admin@gateministriesblouberg.co.za.";
    errorBox.hidden = false;
    errorBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

/* -------------------------------------------------------------------
   Send the registration to Web3Forms
   ------------------------------------------------------------------- */
async function sendToWeb3Forms(data, ref) {
  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject:    `🌹 High Tea Registration · ${data.first_name} ${data.surname}`,
    from_name:  "Gate Ministries Blouberg · High Tea",

    // The registrant's email — Web3Forms will use this for the auto-reply
    email:      data.email,

    // Friendly labels (appear in the notification email body)
    "Full name":      `${data.first_name} ${data.surname}`,
    "Email address":  data.email,
    "Contact number": data.phone,
    "Suburb":         data.suburb,
    "Age group":      data.age_group,
    "Reference":      ref,
    "Event":          `${EVENT.name} · ${EVENT.date} · ${EVENT.time}`,
    "Notify":         NOTIFY_EMAIL,

    // Send a confirmation back to the registrant automatically.
    // (Web3Forms detects the `email` field and triggers the auto-reply
    //  if you have it enabled on your dashboard.)
    botcheck: "",
  };

  const res = await fetch("https://api.web3forms.com/submit", {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept":       "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Web3Forms HTTP " + res.status);

  const result = await res.json();
  if (!result.success) throw new Error("Web3Forms: " + (result.message || "unknown error"));

  return result;
}

/* -------------------------------------------------------------------
   Switch to the success view + generate the QR pass
   ------------------------------------------------------------------- */
function showSuccess(data, ref) {
  document.getElementById("success-name").textContent = data.first_name;
  document.getElementById("ref-code").textContent     = ref;

  // QR payload — a readable summary that any QR scanner app can show.
  // (At the door, a steward can scan it and immediately see who's arrived.)
  const qrPayload = [
    EVENT.name.toUpperCase(),
    "",
    `Name:    ${data.first_name} ${data.surname}`,
    `Email:   ${data.email}`,
    `Phone:   ${data.phone}`,
    `Suburb:  ${data.suburb}`,
    `Age:     ${data.age_group}`,
    "",
    `Ref:     ${ref}`,
    `Date:    ${EVENT.date} · ${EVENT.time}`,
    `Venue:   ${EVENT.venue}`,
  ].join("\n");

  const canvas = document.getElementById("qr-canvas");

  // Render QR code in olive on cream so it stays on-theme
  QRCode.toCanvas(canvas, qrPayload, {
    width: 260,
    margin: 1,
    errorCorrectionLevel: "M",
    color: {
      dark:  "#2c3a1e",  // --olive-deep
      light: "#f5ecd1"   // --cream-light
    }
  }, function (err) {
    if (err) console.error(err);
  });

  // Swap views
  formView.hidden    = true;
  successView.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Wire up the download button
  document.getElementById("download-btn").onclick = () => downloadQR(data, ref);
}

/* -------------------------------------------------------------------
   Download a larger, framed PNG of the QR pass
   ------------------------------------------------------------------- */
function downloadQR(data, ref) {
  const canvas = document.getElementById("qr-canvas");

  // Compose a larger, on-brand pass image
  const out  = document.createElement("canvas");
  const W    = 720;
  const H    = 1080;
  out.width  = W;
  out.height = H;
  const ctx  = out.getContext("2d");

  // Olive background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#3b4d2a");
  bg.addColorStop(1, "#2c3a1e");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Gold border
  ctx.strokeStyle = "rgba(196, 167, 106, 0.6)";
  ctx.lineWidth   = 2;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.strokeStyle = "rgba(196, 167, 106, 0.3)";
  ctx.lineWidth   = 1;
  ctx.strokeRect(48, 48, W - 96, H - 96);

  // Title
  ctx.fillStyle = "#f5ecd1";
  ctx.textAlign = "center";

  ctx.font = "600 18px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("GATE MINISTRIES BLOUBERG", W / 2, 110);

  ctx.font = "italic 700 64px 'Playfair Display', Georgia, serif";
  ctx.fillText("High Tea", W / 2, 180);

  ctx.fillStyle = "#d8c08a";
  ctx.font      = "600 14px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("· ADMIT ONE ·", W / 2, 220);

  // Divider
  ctx.strokeStyle = "rgba(216, 192, 138, 0.4)";
  ctx.lineWidth   = 1;
  ctx.beginPath();
  ctx.moveTo(180, 248);
  ctx.lineTo(W - 180, 248);
  ctx.stroke();

  // QR code in a cream frame
  const qrSize = 360;
  const qrX = (W - qrSize) / 2;
  const qrY = 280;
  ctx.fillStyle = "#f5ecd1";
  ctx.fillRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
  ctx.strokeStyle = "#c4a76a";
  ctx.lineWidth   = 2;
  ctx.strokeRect(qrX - 20, qrY - 20, qrSize + 40, qrSize + 40);
  ctx.drawImage(canvas, qrX, qrY, qrSize, qrSize);

  // Name
  ctx.fillStyle = "#f5ecd1";
  ctx.font      = "400 36px 'Playfair Display', Georgia, serif";
  ctx.fillText(`${data.first_name} ${data.surname}`, W / 2, qrY + qrSize + 80);

  // Event details
  ctx.fillStyle = "#d8c08a";
  ctx.font      = "600 13px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("15 AUGUST 2026  ·  9:30 AM", W / 2, qrY + qrSize + 120);

  ctx.fillStyle = "rgba(245, 236, 209, 0.75)";
  ctx.font      = "italic 18px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("3 Viola Road, Blouberg, Cape Town", W / 2, qrY + qrSize + 148);

  // Reference
  ctx.fillStyle = "#d8c08a";
  ctx.font      = "600 12px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText(`REF · ${ref}`, W / 2, H - 80);

  // Footer note
  ctx.fillStyle = "rgba(245, 236, 209, 0.6)";
  ctx.font      = "italic 14px 'Cormorant Garamond', Georgia, serif";
  ctx.fillText("Please present this pass at the door.", W / 2, H - 56);

  // Trigger download
  out.toBlob((blob) => {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement("a");
    a.href     = url;
    a.download = `HighTea-Pass-${data.first_name}-${data.surname}-${ref}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, "image/png");
}
