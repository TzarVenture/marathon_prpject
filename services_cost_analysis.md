# 💰 Rajgir Marathon — Third-Party Services Cost Analysis
### India-Based Pricing | July 2026

---

## Summary

| Category | Estimated Monthly Cost | One-Time Cost |
|---|---|---|
| Cloud Hosting | ₹3,000 – ₹8,000 | — |
| Cloud Storage | ₹500 – ₹2,500 | — |
| Payment Gateway | 2% per transaction (no monthly fee) | — |
| SMS Gateway | ₹2,000 – ₹10,000 | — |
| Email Service | ₹0 – ₹3,500 | — |
| Maps (Google) | ₹0 – ₹5,000 | — |
| WhatsApp Business | ₹1,000 – ₹5,000 | ₹0 – ₹5,000 (setup) |
| Error Tracking | ₹0 – ₹2,000 | — |
| Domain & SSL | ₹100 – ₹500 | ₹800 – ₹2,000/yr |
| CDN | ₹0 – ₹2,000 | — |
| **Total (Estimated)** | **₹6,600 – ₹38,500 / month** | **₹800 – ₹7,000** |

> [!NOTE]
> All prices are approximate estimates based on Indian market rates as of mid-2026. Actual costs depend on usage volume. Registration fees, event scale, and runner count will significantly impact SMS and payment gateway costs.

---

## 1. 🏦 Payment Gateway — Razorpay *(Already Integrated)*

> **Status:** Already in codebase (test keys). Need live keys from client.

| Plan | Fee | Notes |
|---|---|---|
| Standard | **2% per transaction** | No monthly fee |
| International cards | **3% per transaction** | Extra for international runners |
| Settlement | T+2 or T+3 days | Normal settlement cycle |
| GST on fees | 18% GST applicable | On the 2% fee |

**Example Calculation:**
- If 5,000 runners register at avg ₹800 each → ₹40,00,000 collected
- Razorpay fee = 2% → **₹80,000** in gateway charges
- This comes out of registration revenue, not an extra cost

**What's Needed:**
- Razorpay live account (free to create at [razorpay.com](https://razorpay.com))
- KYC verification of the organising entity
- Live API Key ID + Key Secret

---

## 2. 📱 SMS Gateway — MSG91 *(Recommended for India)*

> **Status:** Currently simulated (fake). Must integrate real SMS for OTP + Notifications.

### MSG91 (Recommended — Indian Provider)

| Pack | SMS Count | Cost | Per SMS Rate |
|---|---|---|---|
| Starter | 1,000 SMS | ₹200 | ₹0.20/SMS |
| Standard | 10,000 SMS | ₹1,500 | ₹0.15/SMS |
| Growth | 50,000 SMS | ₹6,000 | ₹0.12/SMS |
| Enterprise | 1,00,000+ | Negotiable | ~₹0.10/SMS |

**Usage Estimate for Rajgir Marathon:**
| Use Case | Volume | Cost (approx) |
|---|---|---|
| OTP during registration | 5,000–10,000 SMS | ₹750–₹1,500 |
| Event reminders | 5,000 runners × 2-3 reminders | ₹1,500–₹3,000 |
| Race result notifications | 5,000 SMS | ₹750 |
| **Total SMS Budget** | ~25,000 SMS | **₹3,000–₹5,000** |

> [!TIP]
> MSG91 is TRAI-registered, India-compliant, and used by 50,000+ Indian businesses. Registration is free. You only pay per SMS sent. Supports DLT registration (mandatory for bulk SMS in India).

**DLT Registration (Mandatory in India):**
- Required by TRAI for sending commercial/transactional SMS
- Register on any telecom operator's DLT portal (Jio, Airtel, Vi)
- **Cost: ₹5,900/year** (one-time registration per company)

### Alternative: Twilio (International)
| Plan | Cost |
|---|---|
| SMS to India | ~₹1.20–₹1.50 per SMS |
| Monthly minimum | $0 (pay-as-you-go) |

> MSG91 is **6–8x cheaper** than Twilio for India SMS. Prefer MSG91.

---

## 3. 📧 Email Service — Transactional Emails

> **Status:** Nodemailer is in codebase. For production at scale, needs a proper provider.

### Option A: SendGrid (Recommended)

| Plan | Volume | Cost |
|---|---|---|
| Free | 100 emails/day | ₹0 |
| Essentials | 40,000 emails/month | ₹1,400/month |
| Pro | 1,00,000 emails/month | ₹5,600/month |

### Option B: AWS SES (Cheapest for High Volume)

| Tier | Cost |
|---|---|
| First 62,000 emails/month (from EC2) | **Free** |
| Beyond free tier | $0.10 per 1,000 emails (~₹8.30) |

### Option C: Brevo (formerly Sendinblue) — Good Free Tier

| Plan | Volume | Cost |
|---|---|---|
| Free | 300 emails/day (9,000/month) | ₹0 |
| Starter | 20,000 emails/month | ₹1,200/month |
| Business | 1,00,000 emails/month | ₹3,500/month |

**Use Case for Rajgir Marathon:**
- Registration confirmation, OTP, invoice, certificate, bib, reminders, results
- Estimated ~3–5 emails per runner × 5,000 runners = **15,000–25,000 emails**
- **Recommended: Brevo Free or Starter tier → ₹0–₹1,200/month**

---

## 4. ☁️ Cloud Storage — AWS S3 / Cloudinary

> **Status:** Currently using local disk (Multer). Must migrate to cloud — local storage is lost on server restart.

### Option A: AWS S3

| Usage | Cost |
|---|---|
| Storage | $0.023/GB/month (~₹1.90/GB) |
| Data Transfer Out | $0.09/GB (~₹7.50/GB) |
| GET requests | $0.0004 per 1,000 requests |
| **Estimated 50 GB storage** | **~₹95–₹200/month** |
| **Estimated 200 GB transfer** | **~₹1,500–₹3,000/month** |

**Total AWS S3 estimate: ₹500–₹2,000/month**

### Option B: Cloudinary (Recommended for Images/Media)

| Plan | Storage | Transformations | Cost |
|---|---|---|---|
| Free | 25 GB | 25 credits/month | ₹0 |
| Plus | 75 GB | 225 credits/month | ₹3,500/month |
| Advanced | 225 GB | 675 credits/month | ₹10,500/month |

> [!TIP]
> **Cloudinary Free tier** is sufficient for the initial launch. It includes image optimization, resizing, CDN delivery, and transformations — perfect for race photos, bibs, certificates. Upgrade only when you exceed 25 GB.

**What gets stored:**
- Hero banners, sponsor logos, race photos
- Digital bib QR code images
- Certificates (PDFs or images)
- User profile pictures, volunteer documents

---

## 5. 🗺️ Google Maps API

> **Status:** Required for interactive Route Page with aid stations, parking, etc.

| API | Free Monthly Tier | Cost Beyond Free |
|---|---|---|
| Maps JavaScript API | 28,000 map loads/month | $7 per 1,000 loads (~₹580) |
| Places API | $200 credit/month | Pay-as-you-go |
| Directions API | 40,000 requests/month | $5 per 1,000 (~₹415) |

> [!NOTE]
> Google gives **$200 free credit/month** for all Maps APIs. For a marathon website with moderate traffic, **this is likely to be free**. You need to add a credit card to enable billing, but won't be charged under normal usage.

**Estimated Monthly Cost: ₹0–₹2,000** (free under normal event traffic)

**What's Needed:**
- Google Cloud Console account
- Enable Maps JavaScript API
- Create API key with referrer restrictions (for security)

---

## 6. 💬 WhatsApp Business API

> **Status:** Required in Phase 4 for registration confirmation + race result notifications.

### Via Meta (Official) — Through BSP (Business Solution Provider)

| Provider | Setup Fee | Per Message (Template) | Monthly |
|---|---|---|---|
| Gupshup | ₹0–₹5,000 | ₹0.60–₹1.00/msg | ₹0 |
| Wati | ₹0 | ₹1.00–₹1.50/msg | ₹2,999+ |
| Interakt | ₹0 | ₹0.70–₹1.20/msg | ₹999 |
| AiSensy | ₹0 | ₹0.50–₹0.90/msg | ₹999 |
| 2Factor | ₹0 | ₹0.55–₹0.80/msg | Pay-as-you-go |

**Meta's Official WhatsApp Pricing (charged by BSP):**
| Category | Cost per Conversation (24 hrs) |
|---|---|
| Utility (transactional) | ₹0.40–₹0.70 |
| Marketing | ₹1.20–₹1.80 |
| Service (user-initiated) | ₹0.29–₹0.55 |

**Usage Estimate:**
- 5,000 runners × 2 messages (registration + result) = 10,000 messages
- **Estimated cost: ₹5,000–₹10,000 (one-time for the event)**

> [!IMPORTANT]
> WhatsApp Business API requires **Facebook Business Manager verification** and approval of message templates. This can take 3–7 days. Start early.

---

## 7. 🖥️ Server / Cloud Hosting

> **Status:** Needs cloud hosting. Currently may be on local/shared hosting.

### Option A: DigitalOcean Droplets (Recommended for startups)

| Plan | vCPU | RAM | Storage | Bandwidth | Cost |
|---|---|---|---|---|---|
| Basic | 1 | 1 GB | 25 GB SSD | 1 TB | **₹420/month** |
| Standard | 2 | 2 GB | 60 GB SSD | 3 TB | **₹840/month** |
| Growth | 2 | 4 GB | 80 GB SSD | 4 TB | **₹1,680/month** |
| Event Scale | 4 | 8 GB | 160 GB SSD | 5 TB | **₹3,360/month** |

**Recommendation:** Start with 2-vCPU / 4 GB RAM → Scale up during event registration peaks.

### Option B: AWS EC2 (Enterprise-grade)

| Instance | vCPU | RAM | Cost |
|---|---|---|---|
| t3.small | 2 | 2 GB | **₹1,200/month** |
| t3.medium | 2 | 4 GB | **₹2,400/month** |
| t3.large | 2 | 8 GB | **₹4,800/month** |

### Option C: AWS Lightsail (Simpler & Cheaper than EC2)

| Plan | vCPU | RAM | Cost |
|---|---|---|---|
| Starter | 1 | 2 GB | **₹630/month** |
| Standard | 2 | 4 GB | **₹1,260/month** |
| Growth | 4 | 8 GB | **₹2,520/month** |

### Option D: Hostinger VPS (Budget Option — India Servers)

| Plan | vCPU | RAM | Storage | Cost |
|---|---|---|---|---|
| KVM 2 | 2 | 8 GB | 100 GB NVMe | **₹849/month** |
| KVM 4 | 4 | 16 GB | 200 GB NVMe | **₹1,699/month** |

> [!TIP]
> **Recommended:** Hostinger KVM 2 (₹849/month) or DigitalOcean 4 GB (₹1,680/month) for the development phase. Scale up to AWS t3.large or equivalent during the event month.

---

## 8. 🌐 Domain Name

| Domain | Registrar | Annual Cost |
|---|---|---|
| rajgirmarathon.com | GoDaddy / Namecheap | **₹800–₹1,500/year** |
| rajgirmarathon.in | GoDaddy / BigRock | **₹700–₹1,200/year** |
| rajgirmarathon.org | Namecheap | **₹1,200–₹1,800/year** |

**SSL Certificate:**
- **Let's Encrypt** — 100% Free (auto-renews every 90 days)
- Managed automatically via Certbot on most Linux servers

---

## 9. 🔍 Error Tracking — Sentry

> **Status:** Recommended in SOW for production error monitoring.

| Plan | Events/Month | Cost |
|---|---|---|
| Free (Developer) | 5,000 errors | **₹0** |
| Team | 50,000 errors | **₹2,000/month** |
| Business | Unlimited | **₹6,500/month** |

> **Recommendation:** Free tier is sufficient for initial launch. Upgrade only if error volume exceeds 5,000/month.

---

## 10. 📬 Push Notifications (Mobile App)

> **Status:** Required for the React Native mobile app (Phase 4).

| Service | Free Tier | Cost |
|---|---|---|
| Firebase Cloud Messaging (FCM) | **Unlimited — Free** | ₹0 |
| OneSignal | 10,000 subscribers | ₹0 → ₹3,500/month beyond |

> [!TIP]
> Use **Firebase FCM** — completely free for push notifications on both Android and iOS.

**What's Needed:**
- Google Firebase project (free)
- Apple Developer Account for iOS push — **₹8,500/year (mandatory for iOS app)**

---

## 11. 📱 App Store Fees (Mobile App)

> **Status:** Required if mobile app is published (Phase 4).

| Platform | Fee | Notes |
|---|---|---|
| Google Play Store | **₹2,000 one-time** | Lifetime developer account |
| Apple App Store | **₹8,499/year** | Annual Apple Developer Program membership |

---

## 12. 🔒 Additional Security & DevOps Tools

| Tool | Purpose | Cost |
|---|---|---|
| Cloudflare (Free) | CDN, DDoS protection, DNS | **₹0/month** |
| Cloudflare Pro | WAF, advanced security | **₹1,500/month** |
| Better Uptime | Uptime monitoring, alerts | **₹0–₹1,700/month** |
| Freshping | Uptime monitoring | **Free** |

---

## 13. 🤖 AI Features (Phase 5 — Future)

> **Status:** Out of scope for 3-month engagement. Listed for budget awareness.

| Service | Use Case | Estimated Cost |
|---|---|---|
| OpenAI API (GPT-4o) | AI Coach, Chatbot, Race Predictor | $0.005–$0.015 per 1K tokens (~₹0.40–₹1.25) |
| Google Gemini API | Alternative AI model | Free tier available |
| OpenAI Embeddings | Co-Runner recommendation engine | $0.0001 per 1K tokens |

---

## Phase-wise Cost Summary

### Phase 1 (Months 1–2) — Initial Setup
| Service | Cost |
|---|---|
| Domain Registration | ₹800–₹1,500 (one-time) |
| Server Hosting (basic) | ₹849–₹1,680/month |
| Cloud Storage (Cloudinary Free) | ₹0 |
| Email Service (Brevo Free) | ₹0 |
| SMS DLT Registration | ₹5,900 (one-time) |
| MSG91 SMS Credits (OTP testing) | ₹500 |
| Razorpay Account Setup | ₹0 |
| Google Maps API | ₹0 |
| SSL Certificate | ₹0 |
| **Phase 1 Total** | **~₹8,049–₹9,580** |

### Phase 2–3 (Months 2–3) — Pre-Event
| Service | Cost |
|---|---|
| Server Hosting (upgraded) | ₹1,680–₹3,360/month |
| SMS Credits (bulk purchase) | ₹3,000–₹6,000 |
| Email Service (Brevo Starter) | ₹1,200/month |
| Cloudinary Plus (if needed) | ₹0–₹3,500/month |
| WhatsApp Business setup | ₹999–₹5,000/month |
| Sentry (Free tier) | ₹0 |
| **Phase 2–3 Total** | **~₹6,879–₹18,860/month** |

### Event Month — Peak Load
| Service | Cost |
|---|---|
| Server Hosting (scaled up) | ₹4,800–₹8,000/month |
| SMS (reminders + notifications) | ₹5,000–₹10,000 |
| WhatsApp Messages (results) | ₹3,000–₹7,000 |
| Email (mass send) | ₹1,500–₹3,500 |
| Razorpay fees (2% on revenue) | Depends on registration revenue |
| **Event Month Total** | **~₹14,300–₹28,500** |

---

## 🧾 Full Annual Budget Estimate

| Item | Annual Estimate |
|---|---|
| Server Hosting | ₹15,000–₹60,000 |
| Domain | ₹800–₹1,500 |
| SMS (MSG91 + DLT) | ₹8,000–₹20,000 |
| Email Service | ₹0–₹15,000 |
| Cloud Storage | ₹0–₹25,000 |
| WhatsApp Business | ₹12,000–₹50,000 |
| Google Maps API | ₹0–₹10,000 |
| Razorpay (2% of revenue) | Variable |
| Apple Developer Account | ₹8,499 |
| Google Play Account | ₹2,000 (one-time) |
| Monitoring tools | ₹0–₹10,000 |
| **Total Annual Infrastructure** | **₹46,299–₹2,01,499/year** |

> [!IMPORTANT]
> Razorpay transaction fees are **not included** above as they depend on total registration revenue. For every ₹1 lakh collected, expect ₹2,000 in gateway fees + 18% GST on that fee.

---

## ✅ Recommended Minimal Setup to Launch

For a cost-effective start with all critical services:

| Service | Provider | Cost |
|---|---|---|
| Hosting | Hostinger KVM 2 | ₹849/month |
| Storage | Cloudinary Free | ₹0 |
| Email | Brevo Free | ₹0 |
| SMS OTP | MSG91 (pay-as-you-go) | ₹200–₹500/month |
| Maps | Google Maps Free Tier | ₹0 |
| Payment | Razorpay (2% per txn) | Variable |
| Error Tracking | Sentry Free | ₹0 |
| SSL | Let's Encrypt | ₹0 |
| Domain | GoDaddy (.com) | ₹1,200/year |
| CDN | Cloudflare Free | ₹0 |
| **Monthly Running Cost** | | **₹1,049–₹1,500/month** |
| **One-time Setup Cost** | | **₹7,100–₹9,600** |

---

*Document prepared based on [PRD.md](file:///d:/MarathonProject/PRD.md) and [SOW.md](file:///d:/MarathonProject/rajgir_marathon_sow.md) | July 2026*
