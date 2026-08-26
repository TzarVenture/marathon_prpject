# RAJGIR MARATHON — SCOPE OF WORK
## PPT Generation Prompt | Web Development Agency

> Paste everything below into Gamma, Beautiful.ai, ChatGPT, or any PPT tool to generate the full presentation.

---

## PROMPT START

Create a professional **Scope of Work presentation** for a web application project called **"Rajgir Marathon — Digital Platform"**.

This is being prepared by a **web development agency** for their client — the Rajgir Marathon organising committee. The tone should be **clear, practical, and straightforward** — not overly corporate. The client should walk away understanding exactly what we will build, when, and at what cost.

**Design theme:** Clean and professional. White background, deep navy blue (#1E3A5F) for headers and sidebars, orange (#F97316) as the accent color (buttons, highlights, callout boxes). Font: Inter or Roboto. Aspect ratio: 16:9.

---

## SLIDE 1 — COVER

**Title:** Rajgir Marathon
**Subtitle:** Scope of Work — Website Development
**Tagline:** Run Through History
**Info line:** Web Application | 3-Month Development Plan
**Footer:** Prepared for: Rajgir Marathon Organising Committee | July 2026

---

## SLIDE 2 — AGENDA

**Title:** What We'll Cover

1. Project Summary
2. What Is Already Built
3. What We Will Build
4. Technology Stack
5. Phase-by-Phase Plan
6. Timeline & Gantt Chart
7. Team Structure
8. Integrations Required
9. Risks & Mitigation
10. What We Need From You
11. Out of Scope
12. Next Steps

---

## SLIDE 3 — PROJECT SUMMARY

**Title:** Project Summary

**Left side — The Goal:**
Build the complete Rajgir Marathon website — a single platform that handles everything from a runner discovering the event, registering, paying, and getting their BIB — all the way to volunteers managing their assignments, sponsors tracking their packages, and the organising team running everything from an admin panel.

The project was started by a previous development team. We have done a full code review. We know exactly what exists and what needs to be built. This document is our plan.

**Right side — Key Facts (stat cards):**
- Project Duration: 3 Months
- Phases: 4
- Total Sprints: 12 Weeks
- Platform: Web Application (Desktop + Mobile Responsive)
- Users: Runners, Volunteers, Sponsors, Corporates, Admins
- Race Categories: 9
- Current Completion: ~28%

---

## SLIDE 4 — WHO USES THIS PLATFORM

**Title:** User Types

Display as a simple 2-column list with icons:

**Runners (Public + Registered)**
- Browse event info and register for any race category
- Make online payment
- Access their personal dashboard (BIB, certificate, timing, photos)

**Corporates**
- Register their employees as a team
- Bulk payment and team management

**Volunteers**
- Register as a volunteer
- Receive role and schedule
- Download participation certificate

**Sponsors / Brands**
- Register company
- Browse and purchase sponsorship packages
- Upload branding artwork and track status

**Event Organiser / Admin**
- Full control over everything — registrations, results, users, content, reports

---

## SLIDE 5 — CURRENT STATE OF THE PROJECT

**Title:** What We Inherited — Honest Code Audit

**Callout box at top:**
"A previous development team built the initial version. We have audited every file. Here is the real picture."

**Three columns:**

**Column 1 — ✅ Already Done**
- Basic public website (landing page, FAQs, gallery, press section, footer pages)
- User registration with email OTP
- Login / logout with role-based access (Admin, User, Sponsor, Brand)
- Razorpay payment gateway (test mode connected)
- Basic event listing page
- Admin dashboard with — banner, sponsor, partner, race category management, user management, blog editor, contact form submissions, site settings, rules & regulations, price chart
- Basic user dashboard — profile view, event registration form

**Column 2 — ⚠️ Partially Done (Needs Completion)**
- User dashboard — History, Photos, Achievements tabs are empty placeholders
- Phone OTP — code exists but no actual SMS is sent (not connected to any gateway)
- Volunteer section — static info page only, no actual portal
- Sponsor and Brand dashboards — basic stubs with no real functionality
- Registration — only individual flow; group, corporate, international not built
- Payment history tab — file is completely empty (0 bytes)

**Column 3 — ❌ Not Built**
- About Rajgir Marathon page
- Individual race category detail pages
- Interactive route map
- Event schedule page
- Tourism section
- Media centre (proper)
- Digital BIB with QR code
- Certificate generation (PDF)
- Invoice generation after payment
- Volunteer portal (full)
- Sponsor portal (full)
- Corporate dashboard (full)
- Live results and leaderboard
- Runner photos (race day photos tagged by BIB)
- Notification emails (registration confirmation, reminders)
- Admin analytics and finance reports
- Mobile responsive fixes on several pages

---

## SLIDE 6 — GAP ANALYSIS

**Title:** PRD vs. Current Reality

**Subtitle:** How complete is the project right now?

Display as a table with a completion percentage badge for each row. Color code: Green = 70%+, Yellow = 30–69%, Red = below 30%.

| Feature | Done? | Completion |
|---|---|---|
| Public Website (Home, FAQs, Gallery, Press) | Partial | 65% |
| About Rajgir Marathon | Not Started | 0% |
| Race Category Pages (9 detailed pages) | Not Started | 0% |
| Event Schedule Page | Not Started | 0% |
| Interactive Route Map | Not Started | 0% |
| Tourism Section | Not Started | 0% |
| Media Centre | Partial | 20% |
| Individual Registration + Payment | Partial | 55% |
| Group Registration | Not Started | 0% |
| Corporate Registration | Not Started | 0% |
| Digital BIB + QR Code | Not Started | 0% |
| Invoice PDF after Payment | Not Started | 0% |
| Certificate Generation (PDF) | Not Started | 0% |
| Runner Dashboard (complete) | Partial | 30% |
| Live Results & Leaderboard | Not Started | 0% |
| Race Day Photos (BIB-tagged) | Not Started | 0% |
| Volunteer Portal | Not Started | 5% |
| Sponsor Portal | Not Started | 10% |
| Corporate Dashboard | Not Started | 0% |
| Admin Analytics & Finance Reports | Not Started | 0% |
| Notification Emails | Not Started | 0% |
| Real SMS OTP | Not Started | 0% |

**Large callout at bottom:**
**Overall Completion: ~28%** — The technical foundation (server, database, auth, payment) is solid. The product itself is 72% unbuilt.

---

## SLIDE 7 — TECHNOLOGY STACK

**Title:** Technology Stack

Display as two side-by-side panels:

**Panel 1 — What Exists (We Continue With This)**
- Frontend: React 18 + TailwindCSS
- Backend: Node.js + Express + MongoDB
- Authentication: JWT
- Payment: Razorpay
- Email: Nodemailer
- Deployment: PM2 + Jenkins
- API Docs: Swagger

**Panel 2 — New Additions (What We Add)**
- Cloud File Storage: AWS S3 or Cloudinary (replacing local disk — critical)
- SMS Gateway: MSG91 (for real phone OTP)
- PDF Generation: pdf-lib or Puppeteer (certificates + invoices)
- QR Code: qrcode npm package (Digital BIB)
- Maps: Google Maps API (Route page)
- Error Tracking: Sentry (production monitoring)

**Note box:**
"No framework changes. We build on top of the existing React + Node.js stack. This saves time and avoids rewriting what already works."

---

## SLIDE 8 — WHAT WE WILL BUILD — OVERVIEW

**Title:** Full Scope — What We Are Building

Display as a clean feature list grouped in sections:

**PUBLIC WEBSITE**
- Home page (with countdown, race categories, sponsors, testimonials, newsletter)
- About Rajgir Marathon
- Race Categories (9 individual pages)
- Event Schedule
- Interactive Route Map
- Tourism Section
- Media Centre
- Gallery (CMS-managed)
- FAQs, Rules & Regulations, Price Chart
- Privacy Notice, Terms & Conditions, Contact Us

**REGISTRATION & PAYMENT**
- Individual Registration (full multi-step flow)
- Group Registration (up to 10 people, one payment)
- Corporate Registration (company + bulk employee list)
- School & College Registration
- Medical declaration + emergency contact step
- Waiver acceptance step
- Razorpay payment (live mode)
- Auto-generated invoice PDF (emailed + downloadable)
- Digital BIB with QR code (generated after payment)

**RUNNER DASHBOARD**
- Profile (with photo upload)
- My Registrations (upcoming + past)
- Digital BIB
- Race Results & Timing
- Race Certificates (PDF download)
- Race Day Photos (admin-tagged by BIB)
- Payment History
- Notifications

**VOLUNTEER PORTAL**
- Registration form (role preference, availability, document upload)
- Email confirmation + schedule
- Admin assigns role and location
- Volunteer certificate download post-event

**SPONSOR PORTAL**
- Company registration + GST upload
- Browse sponsorship packages
- View branding inventory (Start Arch, Finish Arch, Bib, Medal, T-Shirt, Water Stations, KM Markers, Expo Booth, Stage, LED Screens, Photo Booths, Digital Ads)
- Upload brand artwork
- Online payment for package
- Invoice download
- Sponsorship status tracker

**CORPORATE DASHBOARD**
- Company account with admin login
- Register employees (manual or CSV upload)
- Assign teams and team names
- Single bulk payment
- Participation report download
- Company-level certificate

**ADMIN DASHBOARD (COMPLETE)**
- Event management (create, edit, toggle active)
- Registration management (view all, filter, export CSV)
- Payment management (view all transactions, refund flag)
- Results upload (CSV upload of finish times by BIB)
- Race photos upload (bulk upload + BIB tagging)
- Volunteer management (view, assign roles, mark attendance)
- Sponsor management (review applications, approve artwork)
- Corporate management (view company registrations)
- User management (view, edit, ban)
- Content management (home banner, sponsors, partners, FAQs, rules, price chart, tourism, media)
- Bulk email to all runners / by category
- Analytics: registrations by category, revenue, payment status
- Finance report (downloadable CSV/PDF by date range)

**RESULTS & POST-RACE**
- Results page with leaderboard (filterable by category, gender, age group)
- Search by name or BIB
- Per-runner result card
- Certificate unlock after results are published
- Race photo gallery (per-runner filtered view)

---

## SLIDE 9 — PHASE 1: FOUNDATION & PUBLIC WEBSITE
### Weeks 1–3

**Title:** Phase 1 — Fix, Rebrand & Complete the Website
**Sub-line:** Weeks 1–3

**Week 1 — Fix What's Broken (Backend + Infra)**

Display as a problem-solution list:

| Problem Found | Fix |
|---|---|
| All pages say "Vadodara Marathon" | Replace with "Rajgir Marathon" everywhere — frontend, backend, emails, API docs |
| Files stored on local server disk — lost on redeploy | Migrate all uploads to AWS S3 / Cloudinary |
| Phone OTP is fake — no SMS actually sent | Integrate MSG91 for real SMS OTP delivery |
| Password reset page exists but backend is incomplete | Build token-based forgot password email flow |
| No rate limiting on login / register endpoints | Add rate limiting (brute-force protection) |
| confirm_password stored in database (security issue) | Remove from DB — use for validation only |
| No pagination on any list API — crashes with large data | Add pagination to all list endpoints |

**Week 2 — Build Missing Public Pages**

New pages to build:
- **About Rajgir Marathon** — Event history, vision, mission, why Rajgir, organizing committee, heritage significance
- **Race Categories — 9 pages** — One page per category (Full Marathon 42K, Half Marathon 21K, 10K, 5K, Kids Run, Senior Citizens Run, Corporate Challenge, Defence & Police Challenge, Virtual Run). Each page: distance, eligibility, registration fee, cut-off time, route summary, aid stations, what's included, register button
- **Event Schedule** — Timeline of event days: Expo, Bib Collection, Press Conference, Opening Ceremony, Race Start, Prize Distribution, Closing Ceremony
- **Tourism Section** — Hotels, travel options, restaurants, heritage sites, ropeway, nature safari, local experiences, shopping, suggested itineraries (all CMS-managed from admin)

**Week 3 — Maps, Media & Content Polish**

- **Interactive Route Map** — Google Maps embed with the race route (GPX overlay), marked water stations, medical stations, washrooms, parking, entertainment zones, photography points
- **Media Centre** — Press releases (using existing blog system), media kit PDF download, event photos/videos, press registration form, download centre
- **Home Page Upgrade** — Add countdown timer to event date, "Why Participate" section, testimonials, newsletter subscription form, better race category cards with links
- **Gallery Admin** — Make gallery CMS-managed from admin (admin uploads and organises by year/event)
- **Mobile responsiveness audit** on all existing pages — fix layout breaks on phones

**Phase 1 Done When:**
All public-facing pages are live, Rajgir-branded, secure, and mobile responsive. Admin can manage all content.

---

## SLIDE 10 — PHASE 2: REGISTRATION, PAYMENT & DASHBOARDS
### Weeks 4–7

**Title:** Phase 2 — Registration to BIB — The Core Flow
**Sub-line:** Weeks 4–7

**Week 4 — Registration System (All Types)**

Build the complete multi-step registration flow:

Step 1: Select race category
Step 2: Personal information (name, DOB, gender, phone, email, city, state, nationality)
Step 3: Medical declaration (existing conditions, blood group)
Step 4: Emergency contact (name + phone)
Step 5: T-shirt size selection
Step 6: Waiver acceptance (digital sign-off)
Step 7: Payment

**Registration Types:**
- Individual — one person, one payment
- Group — up to 10 people, fill details for each, one total payment
- Corporate — company name, GST number, register employee list (manual or CSV upload), team assignment
- School / College — institution name, teacher/coordinator contact, student details
- International — country selection, passport number

**Week 5 — Payment, Invoice & Digital BIB**

- Set up Razorpay in live mode (currently only test mode)
- After payment success → auto-generate sequential BIB number (not random)
- Generate QR code image for that BIB number
- Generate PDF invoice (name, event, category, amount, GST breakdown, date)
- Send confirmation email with PDF invoice attached
- Display Digital BIB in runner's dashboard
- Build payment history tab (all transactions with status and invoice download link)

**Week 6 — Runner Dashboard (Complete)**

Fix all the placeholder tabs and build the full runner experience:

- **My Profile** — Edit personal details, upload profile photo
- **My Registrations** — All upcoming and past races with BIB number, payment status, category
- **My BIB** — Display digital BIB with QR code, printable version
- **My Results** — Show finish time, pace, overall rank, category rank, gender rank (populated when admin uploads results)
- **My Certificate** — Download personalised PDF certificate (unlocked after results are published)
- **My Race Photos** — Photos tagged to this runner's BIB by admin (searchable, downloadable)
- **Payment History** — All transactions, invoice download
- **Notifications** — System messages (registration confirmed, payment received, event reminder, results published)

**Week 7 — Admin Dashboard Upgrade**

Extend the existing admin panel with:

- **Registration Management** — View all registrations, filter by event/category/payment status, search by name or BIB, export to CSV
- **Results Upload** — Upload CSV file with columns: BIB number, finish time, gun time, chip time — system auto-calculates ranks
- **Race Photos Upload** — Bulk photo upload with BIB number tagging (admin enters BIB per photo or batch-tags)
- **Certificate Management** — Publish certificates (toggle on/off per event)
- **Volunteer Management** — View volunteer registrations, assign role and location, mark attendance, trigger certificate email
- **Bulk Email** — Compose and send email to: all registered runners / runners by category / all volunteers / all corporates
- **Analytics Dashboard** — Charts: registrations per day, revenue by event, breakdown by race category, payment success/failure rate
- **Finance Report** — Download revenue report by date range (CSV or PDF)
- **Notification Emails** — Configure and trigger: registration confirmation, payment receipt, event reminder (7 days before), results announcement

**Phase 2 Done When:**
A runner can register, pay, receive invoice, get their BIB, and see everything in their dashboard. Admin has full control over registrations, results, photos, and communications.

---

## SLIDE 11 — PHASE 3: PORTALS & STAKEHOLDER FEATURES
### Weeks 8–10

**Title:** Phase 3 — Volunteer, Sponsor & Corporate Portals
**Sub-line:** Weeks 8–10

**Week 8 — Volunteer Portal**

New section: `/volunteer`

**Volunteer Registration:**
- Full name, contact, email, city
- Preferred role selection: Water Station, Route Marshal, Medical Support, Registration Desk, Media Support, General Support
- Preferred date/shift (Day 1 Expo, Day 2 Race Day, Both)
- Upload photo ID (Aadhaar / PAN)
- Submit application

**Volunteer Experience (After Admin Approval):**
- Email with assigned role, location, reporting time, dress code
- Schedule view in their volunteer login
- Download volunteer identity card (PDF with name, role, event)
- Post-event: Download participation certificate

**Admin Side:**
- View all volunteer applications
- Approve / reject applications
- Assign specific role and reporting location
- Mark attendance (BIB scan or manual checkbox)
- Bulk send certificates to all marked-present volunteers

**Week 9 — Sponsor Portal**

New section: `/sponsor-portal`

**Company Registration:**
- Company name, contact person, designation, phone, email
- GST number + upload GST certificate
- Upload company logo

**Package Selection:**
- Browse available sponsorship packages with pricing and benefits
- View branding inventory with visual placement guide
- Select package or build custom from inventory items

**Available Inventory:**
Start Arch, Finish Arch, Race Bib, Finisher Medal, Event T-Shirt, Water Station Branding, KM Markers, Expo Booth, Stage Branding, LED Screens, Photo Booths, Digital Website Ad, Email Campaigns, SMS Campaigns

**After Payment:**
- Invoice download (company name, GST, package details, amount)
- Upload brand artwork (logo, banner artwork files)
- Track sponsorship status (Applied → Payment Done → Artwork Approved → Live)
- View final placement confirmation from admin

**Admin Side:**
- View all sponsor applications and payment status
- Approve/reject artwork uploads
- Mark placement as confirmed

**Week 10 — Corporate Dashboard**

New section: `/corporate`

**Corporate Registration:**
- Company account setup (company name, CIN, GST, HR contact)
- Select race category for team
- Register employees: manual entry one-by-one OR upload CSV template (name, email, phone, DOB, gender, T-shirt size)

**After Registration:**
- Single consolidated invoice for all employees
- Automated individual registration confirmation sent to each employee's email
- Team creation — assign team name, team captain
- View team registration status (who has completed vs pending)

**Company Dashboard:**
- Participation summary — how many employees registered, by category
- Team leaderboard (by finish time after race)
- Download company participation report
- Download individual certificates for all employees (bulk ZIP)
- CSR participation letter (PDF) for company records

**Phase 3 Done When:**
Volunteers can register and receive assignments. Sponsors can purchase packages and track status. Corporates can bulk-register employees and manage teams.

---

## SLIDE 12 — PHASE 4: RESULTS, QA & LAUNCH
### Weeks 11–12

**Title:** Phase 4 — Results, Testing & Go Live
**Sub-line:** Weeks 11–12

**Week 11 — Results, Memories & Final Pages**

**Results & Leaderboard:**
- Public results page — no login required
- Filterable leaderboard: by race category, gender, age group
- Search by name or BIB number
- Each result shows: BIB, name, category, finish time, pace per km, overall rank, category rank, gender rank
- Shareable result card — auto-generated image with runner name + finish time + event branding (for WhatsApp / social share)
- Download finishers list (public CSV)

**How results get in the system:**
- Option A: Admin uploads results CSV (BIB → finish time) from the timing partner
- Option B: Timing partner pushes results via a provided API endpoint
- System automatically calculates all ranks from the data

**Race Memories (Post-Event):**
- Each runner's profile page shows: their result, their certificate, their race photos
- One-click download for certificate and photos
- Social share button for their result card

**Email after results:**
- Auto-send results notification to all registered runners with their personal result + certificate download link

**Week 12 — QA, Performance & Launch**

**Testing Checklist:**
- Full end-to-end test: Register → Pay → Get BIB → Admin uploads result → Runner gets certificate ✅
- Test all 5 registration types (individual, group, corporate, school, international)
- Test Razorpay live payment with real card (small amount)
- Test email delivery for all automated emails
- Cross-browser: Chrome, Safari, Firefox, Edge
- Cross-device: Android phones, iPhones, tablets, desktops
- Admin panel: all tabs, all uploads, all exports

**Performance:**
- Page load speed target: under 3 seconds on 4G mobile
- Image optimisation across all pages
- API response time checks

**Security:**
- All protected routes locked by role (runner can't access admin, sponsor can't see other sponsors)
- All file uploads validated for type and size
- SQL/NoSQL injection protection

**Production Deployment:**
- Move from staging server to production
- SSL certificate (HTTPS)
- Domain pointing to production server
- Environment variables verified (Razorpay live keys, SMS, S3, JWT secret)
- Database backups configured (daily automated)
- PM2 running in cluster mode (keeps server alive)
- Uptime monitoring set up

**Handover:**
- Admin user guide (PDF)
- How to use each section of the admin dashboard
- Deployment documentation

**Phase 4 Done When:**
Website is live at rajgirmarathon.com. All features work in production. Admin team is trained. We've confirmed registration, payment, and BIB end-to-end with a real test transaction.

---

## SLIDE 13 — GANTT CHART

**Title:** 12-Week Project Timeline

Create a Gantt chart. Horizontal axis: Week 1 to Week 12. Group tasks under sections. Use two colors: Orange (#F97316) for active tasks, Navy (#1E3A5F) for milestone markers.

**SECTION: INFRASTRUCTURE & BACKEND**
| Task | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rebrand: Vadodara → Rajgir | ██ | | | | | | | | | | | |
| Cloud storage migration (S3) | ██ | ██ | | | | | | | | | | |
| SMS OTP (MSG91) integration | ██ | | | | | | | | | | | |
| Password reset email flow | ██ | | | | | | | | | | | |
| Rate limiting + security fixes | ██ | | | | | | | | | | | |
| Tourism & schedule APIs | | | ██ | | | | | | | | | |
| Race category detail APIs | | ██ | ██ | | | | | | | | | |
| Multi-type registration APIs | | | | ██ | ██ | | | | | | | |
| Razorpay live + invoice PDF | | | | | ██ | | | | | | | |
| BIB generation + QR code | | | | | ██ | | | | | | | |
| Certificate PDF generation | | | | | | ██ | | | | | | |
| Results upload + rank calc | | | | | | | ██ | | | | | |
| Admin analytics API | | | | | | | ██ | | | | | |
| Bulk email system | | | | | | | ██ | | | | | |
| Volunteer portal APIs | | | | | | | | ██ | | | | |
| Sponsor portal APIs | | | | | | | | | ██ | | | |
| Corporate module APIs | | | | | | | | | | ██ | | |
| Results page + leaderboard API | | | | | | | | | | | ██ | |
| Notification emails (all types) | | | | | | | | | | | ██ | |
| Performance + security final | | | | | | | | | | | | ██ |

**SECTION: FRONTEND (WEB)**
| Task | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Rebrand all pages | ██ | | | | | | | | | | | |
| Home page upgrade | | ██ | | | | | | | | | | |
| About Rajgir Marathon page | | ██ | | | | | | | | | | |
| Race category pages (9 pages) | | ██ | ██ | | | | | | | | | |
| Event schedule page | | | ██ | | | | | | | | | |
| Route map page (Google Maps) | | | ██ | | | | | | | | | |
| Tourism section | | ██ | ██ | | | | | | | | | |
| Media centre upgrade | | | ██ | | | | | | | | | |
| Gallery CMS upgrade | | | ██ | | | | | | | | | |
| Mobile responsiveness fixes | | | ██ | | | | | | | | | |
| Individual registration flow | | | | ██ | | | | | | | | |
| Group + Corporate reg flows | | | | ██ | ██ | | | | | | | |
| School + International reg | | | | | ██ | | | | | | | |
| Payment UI + invoice display | | | | | ██ | | | | | | | |
| Digital BIB screen | | | | | ██ | | | | | | | |
| Runner dashboard (complete) | | | | | | ██ | | | | | | |
| Admin: registration mgmt | | | | | | | ██ | | | | | |
| Admin: results + photos upload | | | | | | | ██ | | | | | |
| Admin: analytics + finance | | | | | | | ██ | | | | | |
| Admin: bulk email + notif | | | | | | | ██ | | | | | |
| Volunteer portal | | | | | | | | ██ | | | | |
| Sponsor portal | | | | | | | | | ██ | | | |
| Corporate dashboard | | | | | | | | | | ██ | | |
| Results + leaderboard page | | | | | | | | | | | ██ | |
| Result sharing card | | | | | | | | | | | ██ | |
| Memories / post-race section | | | | | | | | | | | ██ | |
| Full QA + bug fixes | | | | | | | | | | | ██ | ██ |
| Production deployment | | | | | | | | | | | | ██ |

**MILESTONES (mark with a diamond ◆):**
- ◆ End of Week 3: Complete branded public website live on staging
- ◆ End of Week 7: Full registration-payment-BIB-certificate flow working
- ◆ End of Week 10: All portals live (volunteer, sponsor, corporate)
- ◆ End of Week 12: 🚀 Production launch at rajgirmarathon.com

---

## SLIDE 14 — TEAM STRUCTURE

**Title:** Our Team for This Project

Display as role cards:

**Project Manager — 1 person**
Weekly status calls with client, sprint planning, delivery tracking, blocker escalation

**Backend Developer — 2 people**
Node.js + MongoDB APIs, integrations (SMS, S3, Razorpay, PDF, QR), database design

**Frontend Developer — 2 people**
React pages, admin dashboard tabs, all UI components, API integration on frontend

**UI/UX Designer — 1 person**
Designs all new pages and components (Figma), hands off to developers

**QA Engineer — 1 person**
Tests every feature before it goes to staging, writes test cases, reports bugs

**DevOps — part-time**
Server setup, SSL, CI/CD pipeline, deployment, monitoring

**Total: 8 people**

---

## SLIDE 15 — INTEGRATIONS

**Title:** Third-Party Services We Will Set Up

Display as a clean table:

| Service | What It Does | When |
|---|---|---|
| **MSG91** | Real SMS OTP for phone number verification | Week 1 |
| **AWS S3 or Cloudinary** | Cloud storage for all uploaded images and files | Week 1 |
| **Razorpay (Live Mode)** | Online payment for registrations and sponsorships | Week 4 |
| **Google Maps API** | Interactive race route map | Week 3 |
| **Nodemailer + SMTP** | All automated emails (confirmation, invoice, results, reminders) | Week 5 |
| **pdf-lib / Puppeteer** | Generate PDF certificates and invoices | Week 5 |
| **qrcode (npm package)** | Generate QR code for Digital BIB | Week 5 |
| **Sentry** | Catch and track errors in production automatically | Week 12 |

**Note box:**
"All integrations use the same Node.js backend. No separate systems to manage."

---

## SLIDE 16 — RISKS & MITIGATION

**Title:** Risks & How We Handle Them

Display as a clean 4-column table: Risk | Why | Impact | Our Plan

| Risk | Why It Matters | Impact | Our Plan |
|---|---|---|---|
| Client content not ready (copy, photos, route GPX, fees) | Pages can't be built without content | High | Content needed by end of Week 2. We use placeholder content and swap in final. |
| Razorpay live keys not provided in time | Payment can't be tested with real money | High | Needed by Week 4. We test fully in test mode until then. |
| RFID timing partner delays results delivery | Results can't go live until data arrives | Medium | We support both: timing partner API push OR admin CSV upload. Either works. |
| Previous team's code has more issues than found | More cleanup time needed | Medium | Week 1 is purely cleanup. We flagged all known issues. We have buffer in each phase. |
| Apple/Google app store mentioned in PRD | Out of scope — not a web dev scope | Low | Clearly out of scope. Separate project if client wants it later. |
| Scope creep — new features mid-project | Delays delivery | High | Any new request beyond this SOW goes through a written change order with timeline + cost impact. |

---

## SLIDE 17 — OUT OF SCOPE

**Title:** What We Are NOT Building (In This Phase)

**Opening statement:**
The PRD mentions several advanced and future-facing features. As a web development agency delivering a 3-month project, the following are not in scope. They can be discussed as a Phase 2 engagement after the core platform is stable and live.

Display as a clearly styled list with a "Phase 2 — Future" label:

**AI Features — Future**
- AI Running Coach
- AI Nutrition Advisor
- AI Injury Prediction Engine
- AI Race Predictor
- AI Co-Runner Recommendation
- AI Customer Support Chatbot

**Wearable & Third-Party Sync — Future**
- Apple Health
- Google Fit
- Garmin Connect
- Strava
- Fitbit
- COROS / Suunto

**Mobile Application — Separate Project**
- The PRD describes a full mobile app. This is a separate project with a separate timeline and budget. The web platform we are building is fully mobile-responsive but a native app (Android/iOS) is not included in this scope.

**Social / Community Features — Future**
- Find Co-Runner (social discovery)
- Running Communities (city-based clubs, discussions, leaderboards)
- In-app messaging between runners
- Live GPS tracking during the race

**Other Advanced Features — Future**
- Live video streaming
- Multi-language support beyond English
- Multi-city / multi-event platform expansion
- RFID real-time live tracking integration (we support CSV results upload; live RFID push API is a bonus if the timing partner can do it)

---

## SLIDE 18 — WHAT WE NEED FROM YOU

**Title:** Action Items for the Client

Display as a numbered checklist with a deadline column:

| # | What We Need | Needed By |
|---|---|---|
| 1 | Rajgir Marathon logo (SVG or high-res PNG), brand colors | Day 1 |
| 2 | Event date, race start time, venue address | Day 1 |
| 3 | Race categories with registration fees, eligibility, and cut-off times | Day 1 |
| 4 | Registration open date and close date | Day 1 |
| 5 | Content for "About Rajgir Marathon" page (mission, heritage story, committee) | Week 2 |
| 6 | GPX file of the race route (all 9 categories if different routes) | Week 2 |
| 7 | Water station, medical station, parking locations on the route | Week 2 |
| 8 | Tourism content (hotel names, attractions, travel options) OR vendor contacts | Week 2 |
| 9 | Razorpay Live Key ID and Secret Key | Week 4 |
| 10 | MSG91 account access (or budget approval to create one) | Week 1 |
| 11 | AWS / Cloudinary account (or budget approval) | Week 1 |
| 12 | Sponsorship packages — tier names, pricing, and included branding inventory | Week 8 |
| 13 | Domain access (rajgirmarathon.com) DNS management | Week 10 |
| 14 | Server or cloud hosting access (or budget approval) | Week 10 |
| 15 | Past event photos for gallery | Week 3 |

**Callout box:**
"Items 1–4 are needed before we can start. Delays in these will directly delay the project."

---

## SLIDE 19 — DELIVERABLES

**Title:** What You Get at the End of 3 Months

Display as two columns:

**Complete Website — All Pages**
✅ Home, About, Race Categories (9), Event Schedule, Route Map
✅ Tourism, Media Centre, Gallery, FAQs, Rules, Price Chart
✅ Privacy Notice, Terms & Conditions, Contact

**Registration & Payment**
✅ Individual, Group, Corporate, School, College, International
✅ Medical declaration, waiver, T-shirt selection
✅ Razorpay live payment
✅ PDF invoice emailed automatically
✅ Digital BIB with QR code

**Runner Dashboard**
✅ Profile, registrations, BIB, results, certificates (PDF), race photos, payment history, notifications

**Volunteer Portal**
✅ Registration, role assignment, schedule, certificate download

**Sponsor Portal**
✅ Company registration, package selection, branding inventory, artwork upload, payment, status tracker

**Corporate Dashboard**
✅ Bulk employee registration, team management, participation report, certificates

**Admin Dashboard**
✅ Full control — registrations, payments, results upload, photo management, content, volunteers, sponsors, corporates, analytics, bulk email, finance reports

**Results & Post-Race**
✅ Public leaderboard, search by name/BIB, result sharing card, certificate unlock

---

## SLIDE 20 — PAYMENT SCHEDULE

**Title:** Payment Milestones

**Note to presenter:** Fill in actual rupee amounts here.

| Milestone | When | % of Total |
|---|---|---|
| Project Kickoff | On signing | 30% |
| Phase 1 Complete — Website live on staging | End of Week 3 | 20% |
| Phase 2 Complete — Registration + Payment + Dashboards live | End of Week 7 | 25% |
| Final Delivery — Full platform live in production | End of Week 12 | 25% |

**Infrastructure Costs (billed separately at actuals):**
- AWS S3 / Cloudinary: ~₹800–₹2,500/month
- MSG91 SMS: Pay per SMS (recommend prepaid pack)
- Google Maps API: Free up to 28,000 map loads/month
- Razorpay: 2% per transaction (platform fee charged to payer or merchant)
- Server / VPS hosting: ~₹3,000–₹8,000/month
- SSL Certificate: Free (Let's Encrypt)

---

## SLIDE 21 — NEXT STEPS

**Title:** How We Move Forward

Display as a clean numbered action list:

1. **Client reviews and approves this SOW** — This week
2. **Agreement signed + advance payment** — Before Day 1
3. **Client sends brand assets, event details, credentials (Items 1–4 from the checklist)** — Day 1
4. **Project kickoff call** — Full team + client side. 1 hour. Cover open questions. — Day 2
5. **Project workspace set up** (Notion / Jira) — Client gets access to track progress — Day 2
6. **Week 1 sprint begins** — Backend cleanup, rebrand, cloud migration, SMS integration
7. **Weekly Monday calls** — 30-minute update: what was done, what's next, any blockers
8. **Staging review at end of each phase** — Client tests on staging, gives feedback, we fix, then move forward
9. **Final UAT (User Acceptance Testing)** — Week 12, client signs off before go-live
10. **Go Live** 🚀 — End of Week 12

---

## SLIDE 22 — THANK YOU

**Title:** Let's Build This Together

**Rajgir Marathon — Run Through History**

[Agency Name]
[Contact Name] | [Email] | [Phone]

Footer: Scope of Work v1.0 | July 2026 | Confidential

---

## DESIGN INSTRUCTIONS FOR THE TOOL

- **Background:** White (#FFFFFF) or very light grey (#F9FAFB)
- **Primary color (headers, sidebar, nav):** Deep Navy (#1E3A5F)
- **Accent color (buttons, highlights, callouts):** Orange (#F97316)
- **Done / complete items:** Green (#16A34A)
- **Partial / warning items:** Amber (#FBBF24)
- **Missing / not started:** Red (#EF4444)
- **Font:** Inter or Roboto
- **Gantt bar color:** Orange (#F97316) for tasks, Navy diamond for milestones
- **Slide count:** 22 slides
- **Aspect ratio:** 16:9
- **Slide numbers:** Bottom right
- **Agency logo + Rajgir Marathon logo:** Top of each slide

## PROMPT END
