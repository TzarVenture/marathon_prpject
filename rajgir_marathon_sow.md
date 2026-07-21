# Rajgir Marathon — Scope of Work (SOW)
### Run Through History | Client Presentation Document
**Prepared by:** Development Team | **Date:** July 2026 | **Project Duration:** 3 Months

---

## 1. Project Overview

**Project Name:** Rajgir Marathon — Website & Mobile Application  
**Tagline:** Run Through History  
**Objective:** Build a world-class, end-to-end digital platform for India's premier heritage marathon — covering runner registration, payments, training, community, sponsorship, volunteering, media, tourism, and admin operations.

**Technology Stack (Inherited Codebase):**
| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v7, Recoil (state), TailwindCSS, Axios |
| Backend | Node.js, Express v5, MongoDB (Mongoose), JWT Auth |
| Payment | Razorpay |
| File Storage | Local disk via Multer |
| Email | Nodemailer |
| API Docs | Swagger (OpenAPI 3.0) |
| Deployment | PM2, Jenkins CI/CD pipeline |

---

## 2. Current Codebase — Deep Analysis

> This project was initially built under the "Vadodara Marathon" brand. The codebase is now being rebranded and extended for **Rajgir Marathon**. Below is an honest, developer-level assessment of what exists and what is missing.

---

### 2.1 Frontend — What Is Built

**Framework:** React 18 (CRA), React Router v7, TailwindCSS, Recoil

#### ✅ Pages That Exist

| Page / Module | Route | Status |
|---|---|---|
| Landing Page | `/` | ✅ Exists — hero banner (dynamic), race categories grid, sponsor slider, partners, footer |
| VM Editions (Past Events) | `/vm` | ✅ Exists — 9th, 10th, 11th, 12th editions + Other |
| Know Us Section | `/know-us` | ✅ Exists — Introduction, VM2023, Overview, The Team, PM Speaks, Brand Ambassadors, Affiliations, Sponsors, Partners |
| Philanthropy | `/philanthropy` | ✅ Exists — Causes Support, Observership Program, VM Connect, NGO Partner, Donate |
| Join The Team | `/join-the-team` | ✅ Exists — Jobs, Volunteer (static), Partner, Sponsor tabs |
| Events Listing | `/events` | ✅ Exists — Dynamic events list from API |
| Event Details | `/events/:id` | ✅ Exists — Single event detail page |
| Causes Support | `/causes-support` | ✅ Exists (standalone page) |
| Rules & Regulations | `/rules-and-regulations` | ✅ Exists — CMS-managed, admin editable |
| Price Chart | `/price-chart` | ✅ Exists — CMS-managed |
| FAQs | `/faqs` | ✅ Exists — Accordion style |
| Privacy Notice | `/privacy-notice` | ✅ Exists — Full detailed page |
| Terms & Conditions | `/terms-and-conditions` | ✅ Exists |
| Contact Us | `/contact` | ✅ Exists — Form with API integration |
| Past Events | `/past-events` | ✅ Exists |
| Photo Gallery | `/gallery` | ✅ Exists — Year-wise tabs (2018, 2019, 2020) |
| Press / Media | `/press`, `/press/:id` | ✅ Exists — Article listing + detail |
| User Login | `/login` | ✅ Exists |
| User Register | `/register` | ✅ Exists — Full form with OTP verification flow |
| Admin Login | `/admin-login` | ✅ Exists |
| Admin Register | `/admin-register` | ✅ Exists |
| Password Forget | `/password-forget` | ✅ Exists |
| User Dashboard | `/user/dashboard` | ✅ Exists (Protected) — Profile, Events, History (placeholder), Photos (placeholder), Achievements (placeholder), Certificates (basic), Connect tab |
| Admin Dashboard | `/admin/dashboard` | ✅ Exists (Protected) — Events CRUD, Banner Mgmt, Sponsor Mgmt, Partner Mgmt, Associate Mgmt, Blog Editor, FAQ Mgmt, Contact Submissions, User Mgmt, Site Settings, Rules, Price Chart |
| Brand Dashboard | `/brand/dashboard` | ✅ Exists — Basic (view participants) |
| Sponsor Dashboard | `/sponsors/dashboard` | ✅ Exists — Basic stub |

#### ❌ Pages / Sections Completely Missing (Required by PRD)

| Missing Module | PRD Requirement |
|---|---|
| About Rajgir Marathon | Event vision, mission, heritage significance, organizing committee, sustainability |
| Race Category Detail Pages | Individual pages for Full Marathon, Half Marathon, 10K, 5K, Kids Run, Senior Run, Corporate, Defence, Virtual Run |
| Runner Dashboard — Race Timing | Show race timing results per user |
| Runner Dashboard — Digital Medals | Medal gallery per user |
| Runner Dashboard — Videos | Race video section |
| Runner Dashboard — Merchandise Orders | Show merchandise purchase history |
| Runner Dashboard — Payment History | Transaction history |
| Runner Dashboard — Notifications | Push/email notifications center |
| Training Module | AI Training Plans, Running Schedule, Nutrition, Hydration, Stretching, Recovery, Injury Prevention, Pace Calculator, BMI Calculator, Progress Dashboard |
| Find Co-Runner / Community | Search by city/age/pace/gender, invite runners, create teams, messaging |
| Running Communities | City-based clubs, women groups, corporate clubs, leaderboards, discussions |
| Event Schedule Page | Expo, Bib collection, opening ceremony, race start, prize distribution |
| Route Page | Interactive GPS map, elevation profile, water stations, medical stations, washrooms, parking, entertainment zones |
| Results & Live Timing | Live timing, leaderboards, age/gender/corporate rankings, share results |
| Memories Section | Race photos, GPS replay, medal gallery, personal race story, social sharing |
| Volunteer Portal | Registration, role selection, document upload, schedule, attendance, certificates |
| Sponsor Portal | Company registration, GST upload, package browsing, branding inventory, invoice download, sponsorship tracking |
| Corporate Dashboard | Employee registration, team creation, bulk payments, CSR reports, wellness challenges |
| Tourism Section | Hotels, travel, restaurants, heritage sites, ropeway, nature safari, itineraries |
| Media Centre | Press releases, media kit, press registration, live streaming, download centre |
| Digital Bib | QR Code generation and display for registered runners |
| Mobile Application | Complete React Native / Flutter app |
| AI Features | AI Coach, Nutrition Advisor, Injury Prediction, Race Predictor, Co-Runner Recommendation, Chatbot |

---

### 2.2 Backend — What Is Built

**Framework:** Node.js + Express v5, MongoDB via Mongoose, JWT Auth, Razorpay, Multer, Nodemailer, Swagger

#### ✅ APIs That Exist

| API Route | Description | Status |
|---|---|---|
| `POST /api/register` | User registration with OTP email | ✅ Done |
| `POST /api/register/verify-email` | Email OTP verification | ✅ Done |
| `POST /api/register/verify-phone` | Phone OTP verification (simulated, no SMS gateway) | ⚠️ Partial |
| `GET /api/register/fetch-all-user` | Admin — fetch all users | ✅ Done |
| `GET /api/register/user-profile` | Fetch logged-in user profile | ✅ Done |
| `PUT /api/register/update-profile` | Update user profile | ✅ Done |
| `DELETE /api/register/delete-user` | Delete user | ✅ Done |
| `POST /api/login` | User/Admin login with JWT | ✅ Done |
| `POST /api/event` | Admin — create event | ✅ Done |
| `GET /api/event` | Public — get all events | ✅ Done |
| `GET /api/event/:id` | Public — get event by ID | ✅ Done |
| `POST /api/registration` | Register user for event | ✅ Done |
| `GET /api/registration/my-registrations` | Get user's registrations | ✅ Done |
| `POST /api/payment/create-order` | Razorpay order creation | ✅ Done |
| `POST /api/payment/verify-payment` | Razorpay signature verification | ✅ Done |
| `POST/GET/PUT/DELETE /api/race-category` | Race category CRUD with image upload | ✅ Done |
| `POST/GET/PUT/DELETE /api/sponsors` | Sponsor management (Admin) | ✅ Done |
| `POST/GET/PUT/DELETE /api/partners` | Partner management (Admin) | ✅ Done |
| `POST/GET/PUT/DELETE /api/associates` | Associate management (Admin) | ✅ Done |
| `POST/GET/PUT/DELETE /api/hero-image` | Hero banner management | ✅ Done |
| `POST/GET/PUT/DELETE /api/faq` | FAQ management | ✅ Done |
| `POST/GET/PUT/DELETE /api/philanthropy` | Philanthropy content | ✅ Done |
| `POST/GET/PUT/DELETE /api/know-us` | Know Us section content | ✅ Done |
| `POST/GET/PUT/DELETE /api/vm-edition` | VM Editions content | ✅ Done |
| `GET/PUT /api/privacy-notice` | Privacy notice (CMS) | ✅ Done |
| `GET/POST /api/contact-us` | Contact form submissions | ✅ Done |
| `GET/PUT /api/rules-and-regulations` | Rules & regulations CMS | ✅ Done |
| `GET/PUT /api/price-chart` | Price chart CMS | ✅ Done |
| `GET/PUT /api/site-settings` | Site title, favicon | ✅ Done |
| `GET /api/brand/participants` | Brand — view participants | ✅ Done |
| `GET /api/brand/participants/csv` | Brand — download participant CSV | ✅ Done |
| `POST /api/brand/send-promo` | Brand — send promo email blast | ✅ Done |

#### ✅ Database Models That Exist

| Model | Key Fields |
|---|---|
| User | fname, lname, phone, email, dob, gender, password, role (USER/ADMIN/SPONSOR/INFLUENCER/BRAND), isEmailVerified, isPhoneVerified, profilePic, location |
| Event | title, date, location, distance, price, description, coverImage, createdBy, isActive |
| Registration | userId, eventId, paymentStatus, bibNumber, tshirtSize, emergencyContact |
| Payment | userId, eventId, razorpayOrderId, razorpayPaymentId, amount, status, invoiceUrl |
| OTP | userId, emailOtp, phoneOtp |
| RaceCategory | race_category_filename, race_category_url, category_name |
| Sponsors / Partners / Associates | Image-based content models |
| FAQ | Question/Answer pairs |
| Contact | Contact form submissions |

#### ❌ APIs / Models Completely Missing (Required by PRD)

| Missing API/Feature | Description |
|---|---|
| SMS Gateway Integration | Phone OTP currently simulated — no actual SMS sent (needs Twilio/MSG91) |
| Password Reset via Email | Forgot password flow — route exists in frontend but no backend email link mechanism |
| Digital Bib Generation | QR Code generation API after payment success |
| Race Results API | Live timing, leaderboard, per-user results |
| Certificate Generation | Dynamic PDF certificate generation per user |
| Training Plans API | CRUD for AI/admin-managed training plans |
| Nutrition / BMI APIs | Calculation endpoints |
| Volunteer Module | Registration, role assignment, schedule, attendance APIs |
| Sponsor Portal APIs | Package listing, branding inventory, GST upload, invoice download |
| Corporate Module APIs | Bulk registration, team management, CSR reports |
| Community / Co-Runner APIs | Search by filters, friend requests, team creation, messaging |
| Tourism Content APIs | Hotel, travel, attraction CMS |
| Media Centre APIs | Press release CRUD, media kit management |
| Live Results / RFID Integration | Race-day live timing ingestion from chip/RFID systems |
| Notification System | Email/SMS/Push notification queue and templates |
| Admin Analytics APIs | Revenue reports, registration analytics, event stats |
| Multi-Event Support | Current system is single-event focused; needs multi-year event architecture |
| Merchandise Module | Separate merchandise catalog, cart, and order management |
| File Storage (Cloud) | Currently using local disk (`/uploads`); needs migration to AWS S3 / Cloudinary |
| Rate Limiting / Security Middleware | No rate limiting, no helmet.js, no input sanitization |
| Soft Delete | Most delete operations are hard deletes |
| Pagination | Most list APIs return all records — no pagination |

---

### 2.3 Critical Code Issues Found

> These are real technical problems we found during code review that need fixing before new features are built.

| # | Issue | Severity | Detail |
|---|---|---|---|
| 1 | **Brand name mismatch** | High | All email templates, API docs, page text says "Vadodara Marathon" — needs to be replaced with "Rajgir Marathon" throughout |
| 2 | **Phone OTP is fake** | High | `phoneOtp` is generated and saved to DB but never sent via SMS — registered as "simulated" in code comments |
| 3 | **confirm_password stored in DB** | High | Registration stores `confirm_password` as a field in the User document — this is a security issue and bad practice |
| 4 | **Local file storage** | High | All uploaded images (heroes, sponsors, race categories) are stored on local disk — will be wiped on server restart/redeploy |
| 5 | **No pagination on any list API** | Medium | `fetch-all-user`, `find()` returns all records — will crash with large data |
| 6 | **No rate limiting** | Medium | Login, registration, OTP endpoints have no rate limiting — vulnerable to brute force |
| 7 | **No input sanitization** | Medium | No `express-validator` or DOMPurify equivalent is applied consistently |
| 8 | **Payment.jsx is empty** | Medium | `/pages/Dashboard/Tab/Payment.jsx` file is 0 bytes — payment history tab is broken |
| 9 | **History/Achievements/Photos tabs are static** | Medium | In User Dashboard, "History", "Achievements", "My Photos" tabs show hardcoded placeholder text — no real data |
| 10 | **BIB number is random, not sequential** | Low | `"BIB" + Math.floor(1000 + Math.random() * 9000)` — not suitable for real race operations |
| 11 | **No Swagger server update for production** | Low | Swagger shows `localhost:4000` only — needs prod URL |
| 12 | **No `.env` validation** | Low | App starts even with missing env variables like `JWT_SECRET` or `RAZORPAY_KEY` |

---

## 3. PRD vs. Codebase — Gap Analysis Summary

| PRD Feature Area | Status | Completion % |
|---|---|---|
| Public Website / Landing | ✅ Done | 70% (needs Rajgir rebrand, missing sections) |
| About Rajgir Marathon Page | ❌ Missing | 0% |
| Race Category Pages (detailed) | ⚠️ Partial | 30% (listing exists, detail pages missing) |
| Registration System | ⚠️ Partial | 55% (individual works, group/corporate/school missing) |
| Payment (Razorpay) | ✅ Done | 80% (works, needs invoice PDF) |
| Runner Dashboard (basic) | ⚠️ Partial | 40% (profile + events exist, timing/medals/photos/merch missing) |
| Digital Bib + QR Code | ❌ Missing | 0% |
| Training Module | ❌ Missing | 0% |
| Find Co-Runner / Community | ❌ Missing | 5% (list view exists, no social features) |
| Running Communities | ❌ Missing | 0% |
| Event Schedule Page | ❌ Missing | 0% |
| Route / GPS Map Page | ❌ Missing | 0% |
| Live Results & Leaderboard | ❌ Missing | 0% |
| Memories Section | ❌ Missing | 0% |
| Volunteer Portal | ❌ Missing | 5% (static page exists only) |
| Sponsor Portal | ❌ Missing | 10% (basic brand dashboard exists) |
| Corporate Dashboard | ❌ Missing | 0% |
| Tourism Section | ❌ Missing | 0% |
| Media Centre | ⚠️ Partial | 20% (press/articles exist, no media kit/livestream) |
| Admin Dashboard | ✅ Done | 60% (good base, missing analytics, volunteer mgmt, RFID) |
| SMS OTP (Real) | ❌ Missing | 0% |
| Notifications (Email/SMS/Push) | ❌ Missing | 5% |
| AI Features | ❌ Missing | 0% (Phase 3+) |
| Mobile Application | ❌ Missing | 0% |
| Third-Party Integrations (Strava, Garmin, etc.) | ❌ Missing | 0% |
| Cloud Storage (S3) | ❌ Missing | 0% |
| Multi-language Support | ❌ Missing | 0% |

**Overall Codebase Completion: ~28% of full PRD scope**

---

## 4. Project Phases — 3-Month Execution Plan

> Total Duration: **12 Weeks** | Timeline: August — October 2026

---

### 📦 PHASE 1 — Foundation, Cleanup & Core Website (Weeks 1–3)

**Goal:** Fix all existing bugs, rebrand to Rajgir, complete the public website, stabilize backend.

#### Week 1 — Codebase Cleanup & Rebrand
- [ ] Replace all "Vadodara Marathon" text with "Rajgir Marathon" across entire codebase (frontend + backend + emails + API docs)
- [ ] Fix `confirm_password` storage bug — remove field from User model, use it only for validation
- [ ] Set up cloud storage (AWS S3 or Cloudinary) — migrate all `multer` local disk storage to cloud; update all upload routes
- [ ] Add rate limiting middleware (`express-rate-limit`) on login, register, OTP routes
- [ ] Add `helmet.js` for HTTP security headers
- [ ] Add pagination to all list APIs (users, events, registrations, sponsors, etc.)
- [ ] Fix SMS OTP — integrate MSG91 or Twilio for real phone OTP delivery
- [ ] Fix Password Reset flow — implement token-based email link for password reset
- [ ] Fix all `console.log` leaks in production code
- [ ] Update `.env.example` with all required variables; add startup validation

#### Week 2 — Public Website Completion
- [ ] **Home Page:** Add countdown timer to event date, testimonials section, newsletter subscription, improved gallery carousel, "Why Participate" section, event highlights section
- [ ] **About Rajgir Marathon:** Build new page — event vision, mission, why Rajgir (heritage content), organizing committee, sustainability initiatives, community impact
- [ ] **Race Categories:** Build individual detailed pages for all 9 categories (Full Marathon 42K, Half 21K, 10K, 5K, Kids Run, Senior Run, Corporate Challenge, Defence & Police, Virtual Run) — each with distance, eligibility, fee, cut-off time, route, aid stations, benefits, schedule, register button
- [ ] **Event Schedule Page:** Build timeline page with Expo, Bib Collection, Press Conference, Opening Ceremony, Race Start, Prize Distribution, Closing Ceremony
- [ ] **Tourism Section:** Build tourism page with Hotels, Travel options, Restaurants, Heritage sites, Ropeway, Nature Safari, Local experiences, Suggested itineraries (CMS-managed via admin)
- [ ] Backend: Add Tourism content CRUD API (`/api/tourism`)
- [ ] Backend: Add Event Schedule CRUD API (`/api/event-schedule`)
- [ ] Backend: Update Race Category model to include eligibility, cut-off time, fee, benefits, route details

#### Week 3 — Route Map, Media Centre & Gallery Upgrade
- [ ] **Route Page:** Build interactive map page using Google Maps API (embed) — mark water stations, medical stations, washrooms, parking, entertainment zones, photography points
- [ ] **Media Centre:** Full media centre page — press releases (use existing press/blog system), media kit download section, press registration form, live streaming embed placeholder
- [ ] **Gallery:** Upgrade gallery to be CMS-managed (admin can upload/organize photos by year/event via admin dashboard)
- [ ] **FAQ Upgrade:** Make FAQs searchable; support category-based FAQs (General, Registration, Payment, Race Day, etc.)
- [ ] Frontend: Update `netlify.toml` / deployment config for Rajgir domain
- [ ] QA pass on all public pages — mobile responsiveness check, cross-browser testing

**Phase 1 Deliverables:**
- Clean, bug-free, Rajgir-branded codebase
- Complete public website with all sections
- Cloud storage set up
- Security hardening done

---

### 🏃 PHASE 2 — Registration, Payment, Runner Dashboard & Admin Upgrade (Weeks 4–7)

**Goal:** Complete the full registration flow, runner experience, and admin operations.

#### Week 4 — Registration System Expansion
- [ ] **Group Registration:** Support registering multiple people in one form/payment session (family, friends)
- [ ] **Corporate Registration:** Company name, GST number, bulk runner list upload (CSV), team name assignment
- [ ] **School/College Registration:** Institution name, student ID verification, teacher coordinator details
- [ ] **International Registration:** Country selection, passport number, nationality
- [ ] Backend: Update Registration model to support registration type (INDIVIDUAL, GROUP, CORPORATE, SCHOOL, INTERNATIONAL)
- [ ] Backend: Add group registration API — one payment, multiple registrations
- [ ] **Medical Declaration:** Add medical declaration form step in registration flow (health conditions, emergency contact, blood group)
- [ ] **Waiver Acceptance:** Digital waiver e-sign step before payment
- [ ] **Merchandise Selection:** Add merchandise items (t-shirt upgrade, medal magnet, etc.) to registration flow; create Merchandise model and API

#### Week 5 — Payment, Digital Bib & Certificates
- [ ] **Invoice Generation:** After successful payment, generate PDF invoice and store URL in Payment model; send via email; allow download from dashboard
- [ ] **Digital Bib:** After payment verification, generate unique sequential BIB number; generate QR code image (use `qrcode` npm package); store QR code image URL; display in User Dashboard
- [ ] **Certificate Generation:** Build dynamic PDF certificate using `pdf-lib` or `puppeteer` — personalized with name, BIB number, finish time, event name, year; accessible from User Dashboard
- [ ] **Payment History Tab:** Fix the empty `Payment.jsx` — build proper payment history table showing all transactions, status, amounts, download invoice links
- [ ] Backend: Add BIB generation endpoint; add certificate generation endpoint
- [ ] Backend: Add payment history fetch API for users

#### Week 6 — Runner Dashboard (Complete)
- [ ] **Race Timing Tab:** API and UI to display user's race timing (manual entry by admin for now; RFID auto-sync in Phase 3)
- [ ] Add Results model: finishTime, gunTime, chipTime, pacePerKm, overallRank, categoryRank, genderRank
- [ ] **Digital Medals Tab:** After event completion, display digital medal badge/image based on category completed
- [ ] **Registration History Tab:** Fix the static placeholder — fetch and display all past registrations with event details, BIB, payment status
- [ ] **My Photos Tab:** Allow admin to upload race-day photos and tag them by BIB number; users see their own race photos
- [ ] **Notifications Centre:** Add notifications model and API; display system notifications (registration confirmed, payment success, event reminders) in dashboard
- [ ] **Profile Photo Upload:** Allow users to upload profile picture to cloud storage

#### Week 7 — Admin Dashboard Upgrade
- [ ] **Registration Management Tab:** Admin can see all registrations, filter by event/category/payment status, export CSV, manually mark payment status
- [ ] **Results Management:** Admin can upload results CSV or manually enter finish times per runner (BIB number → time); trigger certificate unlock
- [ ] **Volunteer Management Tab:** Admin can see volunteer registrations, assign roles, view schedules, mark attendance, bulk send certificates
- [ ] **Communication Centre:** Admin can compose and send bulk emails to all registered runners / selected category / all volunteers
- [ ] **Analytics Dashboard:** Charts showing — total registrations over time, revenue by event, registrations by category, payment success rate
- [ ] **Finance Reports:** Downloadable revenue report by date range; GST-compliant summary
- [ ] Backend: Add admin analytics API (aggregation queries)
- [ ] Backend: Add bulk communication API

**Phase 2 Deliverables:**
- Complete multi-type registration system
- Razorpay payment with invoice + BIB + Certificate
- Full runner dashboard
- Admin with analytics, results management, communication tools

---

### 🌐 PHASE 3 — Community, Volunteer, Sponsor, Corporate & Training (Weeks 8–10)

**Goal:** Build all stakeholder portals and community features.

#### Week 8 — Volunteer Portal & Sponsor Portal
- [ ] **Volunteer Portal (Frontend):** New section `/volunteer` — registration form (name, contact, preferred role, availability, documents upload), view schedule, mark attendance, download volunteer certificate
- [ ] Backend: Volunteer model (name, userId, role, assignedArea, schedule, attendanceMarked, certificateUrl) + CRUD APIs
- [ ] **Sponsor Portal (Frontend):** New section `/sponsor-portal` — company registration, GST details upload, browse sponsorship packages, select branding locations from inventory, upload artwork, payment, invoice download, sponsorship status tracker
- [ ] Backend: Sponsorship Package model (title, price, benefits, brandingLocations) + Sponsor Application model + CRUD APIs
- [ ] Branding inventory: Start Arch, Finish Arch, Race Bib, Medal, T-Shirt, Water Stations, KM Markers, Expo Booth, Stage, LED Screens, Photo Booths, Digital Ads, Mobile App Ads
- [ ] **Sponsor Dashboard (Complete):** Upgrade basic stub — full portal as described above

#### Week 9 — Corporate Dashboard & Training Module
- [ ] **Corporate Dashboard (Frontend):** `/corporate` — company login, register employees (bulk upload CSV), create teams, bulk payment, CSR participation tracking, wellness challenge leaderboard, download participation reports and certificates
- [ ] Backend: Corporate model, Team model, bulk registration API, corporate analytics API
- [ ] **Training Module (Frontend):** `/training` — static AI training plan (week-by-week schedule based on race category selected), nutrition guidance page, hydration planner, stretching guide, recovery plan, injury prevention tips
- [ ] **Pace Calculator:** Input distance + target time → output required pace per km (JavaScript utility, no API needed)
- [ ] **BMI Calculator:** Input height + weight → output BMI + category (JavaScript utility)
- [ ] **Progress Dashboard:** Allow users to log training runs (date, distance, time, notes); display in a chart; backend API for training log CRUD

#### Week 10 — Find Co-Runner & Running Communities
- [ ] **Find Co-Runner (Frontend):** `/find-co-runner` — search registered runners by city, age group, pace, gender; send connection request; basic profile card view
- [ ] Backend: Add search/filter API for users with privacy controls (users opt-in to be discoverable); connection request model
- [ ] **Running Communities (Frontend):** `/communities` — list of communities (city-based, women's groups, college clubs, corporate clubs, trail running, cycling); each community has — member list, community discussions (basic forum), upcoming events, leaderboard
- [ ] Backend: Community model (name, type, members, posts), community post CRUD API
- [ ] **Messaging:** Basic in-app messaging between connected runners — Message model (sender, receiver, content, timestamp); REST API for send/receive

**Phase 3 Deliverables:**
- Full Volunteer Portal
- Full Sponsor Portal
- Corporate Dashboard
- Training Module with calculators
- Co-Runner discovery and community features

---

### 🚀 PHASE 4 — Live Results, Mobile App, AI Features & Launch (Weeks 11–12)

**Goal:** Race-day systems, mobile app foundation, AI features, final QA, and go-live.

#### Week 11 — Live Results, RFID Integration & Final Features
- [ ] **Live Results Page (Frontend):** `/results` — live leaderboard table (auto-refresh every 30 seconds), filter by category/gender/age group, search by name/BIB, download finishers list CSV, share result card (social media image generation)
- [ ] Backend: Results ingestion API — admin/timing partner can push results via API; WebSocket or polling for live updates
- [ ] **Memories Section (Frontend):** `/memories` — personal race story card (auto-generated from result data), GPS route replay (mock UI for now), medal gallery, certificate, race photos, social sharing buttons (WhatsApp, Instagram, Facebook)
- [ ] **WhatsApp Integration:** After registration confirmation and race results, send WhatsApp message via WhatsApp Business API
- [ ] **Google Maps Integration:** Complete for Route page — actual Rajgir marathon route GPX overlay on map
- [ ] **Multi-language Support:** Add Hindi language support (i18n) for key pages — Home, Registration, About, Race Categories
- [ ] **SEO Optimisation:** Add meta tags, Open Graph tags, structured data (JSON-LD for event), sitemap.xml, robots.txt
- [ ] Final security audit — check all protected routes, test all role-based access

#### Week 12 — QA, Performance, Mobile App Foundation & Launch

**Mobile Application (Foundation):**
- [ ] Set up React Native project (Expo) for Android + iOS
- [ ] Core screens: Registration, Login, User Dashboard (Profile + Events + BIB), Digital Bib with QR Code, Notifications, Live Results
- [ ] Note: Full mobile app with GPS tracking, AI Coach, team chat, offline support is a separate phase/project after launch

**Final Testing & Launch:**
- [ ] End-to-end testing for registration → payment → BIB → certificate flow
- [ ] Load testing (simulate 1000 concurrent users) using Apache JMeter or k6
- [ ] Cross-device testing — Android, iOS, Windows, Mac; Chrome, Safari, Firefox
- [ ] Fix all critical bugs found in QA
- [ ] Production deployment checklist — environment variables, SSL certificate, domain pointing, CDN setup, database backups
- [ ] Set up monitoring — PM2 process manager, uptime monitoring (Better Uptime or similar), error tracking (Sentry)
- [ ] Handover documentation — deployment guide, admin user guide, API documentation (Swagger updated)
- [ ] Go Live 🚀

**Phase 4 Deliverables:**
- Live results and leaderboard system
- Memories / race story section
- Mobile app (core screens)
- Production deployment
- Complete QA and performance testing

---

## 5. Detailed Timeline — Week-by-Week

| Week | Phase | Focus Areas |
|---|---|---|
| Week 1 | Phase 1 | Codebase cleanup, Rajgir rebrand, cloud storage, security fixes, SMS OTP |
| Week 2 | Phase 1 | Home page upgrade, About page, Race Category pages, Tourism, Event Schedule |
| Week 3 | Phase 1 | Route map, Media Centre, Gallery upgrade, FAQ upgrade, mobile responsiveness QA |
| Week 4 | Phase 2 | Group/Corporate/School/International registration, Medical declaration, Waiver, Merchandise |
| Week 5 | Phase 2 | Invoice PDF, Digital BIB + QR, Certificate generation, Payment history tab |
| Week 6 | Phase 2 | Race timing, Digital medals, Registration history, Race photos, Notifications, Profile photo |
| Week 7 | Phase 2 | Admin: Registration mgmt, Results upload, Volunteer mgmt, Bulk email, Analytics dashboard |
| Week 8 | Phase 3 | Volunteer Portal, Sponsor Portal, Sponsor Dashboard (complete) |
| Week 9 | Phase 3 | Corporate Dashboard, Training Module, Pace Calculator, BMI Calculator, Training Log |
| Week 10 | Phase 3 | Find Co-Runner, Running Communities, Basic Messaging |
| Week 11 | Phase 4 | Live Results, Memories Section, WhatsApp integration, Multi-language, SEO, Security audit |
| Week 12 | Phase 4 | Mobile app (core), Full QA, Load testing, Production deployment, Go Live |

---

## 6. Team & Resource Requirements

| Role | Count | Responsibility |
|---|---|---|
| Backend Developer | 1–2 | Node.js APIs, MongoDB, integrations |
| Frontend Developer | 1–2 | React pages, components, API integration |
| UI/UX Designer | 1 | Design for new pages, mobile app mockups |
| QA Engineer | 1 | Manual + automation testing |
| Project Manager | 1 | Sprint planning, client communication, delivery |
| DevOps (Part-time) | 0.5 | Deployment, CI/CD, monitoring |

---

## 7. Third-Party Integrations Required

| Integration | Purpose | Phase |
|---|---|---|
| MSG91 / Twilio | Real SMS OTP delivery | Phase 1 |
| AWS S3 / Cloudinary | Cloud image/file storage | Phase 1 |
| Razorpay | Payment gateway (already integrated, needs live keys) | Phase 1 |
| Google Maps API | Route page, embedded maps | Phase 3 |
| WhatsApp Business API | Registration & result notifications | Phase 4 |
| Sentry | Error tracking in production | Phase 4 |
| `qrcode` npm package | Digital BIB QR code generation | Phase 2 |
| `pdf-lib` / Puppeteer | Certificate & invoice PDF generation | Phase 2 |
| Apple Health / Google Fit / Strava / Garmin | Training sync (post-launch, future) | Post-launch |
| RFID Timing System | Live race-day result ingestion | Phase 4 |
| Email Provider (SMTP/SendGrid) | Transactional emails (already uses Nodemailer) | Phase 1 |

---

## 8. Risks & Mitigation

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Rajgir event date is close — registration might go live before all features are done | High | High | Launch Phase 1 & 2 first; Phase 3 can follow post-launch |
| RFID/timing partner integration may take time to align | Medium | Medium | Plan fallback — manual result upload via CSV by admin |
| Mobile app in 12 weeks is aggressive | High | Medium | Scope mobile to core screens only (BIB, register, results); full app in next cycle |
| Cloud storage migration may cause downtime | Low | High | Plan migration during off-peak; keep local backup until confirmed |
| AI features need model training time | High | Low | Defer AI to post-launch Phase 5; use static/curated training plans for now |

---

## 9. What We Need From The Client

Before we begin, we need the following from the client:

1. **Brand assets** — Rajgir Marathon logo (SVG/PNG), brand colors, typography guidelines
2. **Event details** — Event date, race route GPX file, race categories and fees, cut-off times
3. **Content** — About page copy, organizing committee details, sustainability story, heritage content
4. **Sponsorship packages** — Sponsorship tiers, pricing, branding locations list
5. **Payment gateway** — Razorpay live API keys (currently using test keys)
6. **Domain & hosting** — Target domain (rajgirmarathon.com), server or cloud provider access
7. **SMS provider** — MSG91 / Twilio account credentials (or budget to set up)
8. **WhatsApp Business** — WhatsApp Business API access (if needed for Phase 4)
9. **RFID timing partner** — Contact of the RFID vendor for API integration planning
10. **Media assets** — Past event photos, videos, team photos for gallery and press section

---

## 10. Out of Scope (For This 3-Month Engagement)

The following items from the PRD are intentionally kept out of scope for this 3-month engagement and will be proposed as a separate Phase 5:

- Full AI features (AI Coach, AI Nutrition Advisor, AI Injury Prediction, AI Race Predictor, AI Chatbot)
- Apple Health / Google Fit / Garmin / Strava / Fitbit sync
- Full-featured Mobile Application (beyond core screens)
- GPS Tracking during live race
- Live Streaming integration
- COROS / Suunto integration
- Multi-marathon expansion (support for multiple cities/events in one platform)
- Team Chat (real-time WebSocket messaging at scale)
- Multi-language beyond Hindi

---

## 11. Acceptance Criteria — Definition of Done

A feature is considered "done" when:
1. Backend API is written, tested, documented in Swagger
2. Frontend is fully responsive (mobile + desktop)
3. Admin can manage the content from the dashboard
4. QA has tested the happy path and key error scenarios
5. Code is merged to main branch and deployed to staging
6. Client has reviewed and approved the feature on staging

---

## 12. Pricing Assumptions

> The following cost areas should be factored into the project budget by the client:

| Item | Notes |
|---|---|
| Cloud storage (AWS S3) | ~₹500–₹2,000/month depending on storage |
| SMS Gateway (MSG91) | Pay-per-SMS; bulk pack recommended |
| Google Maps API | Free tier up to 28,000 map loads/month |
| Razorpay | 2% transaction fee on payments |
| Server hosting | VPS or cloud (AWS/DigitalOcean) — ~₹3,000–₹8,000/month |
| SSL Certificate | Free via Let's Encrypt |
| Sentry (error tracking) | Free tier available |

---

*Document Version: 1.0 | Created: July 2026*  
*This document is prepared for internal planning and client presentation purposes.*
