# 🏥 Curato: AI-Powered Clinical Assistant

**Curato** is an AI-powered tool designed to alleviate the growing administrative burden on healthcare providers. By combining audio transcription, structured EHR generation, and document sharing, Curato streamlines workflows so clinicians can focus on what matters most: patient care.

---

## 🔍 Problem

### 1. **Documentation & Record-Keeping**

> Clinicians spend **2x more time** on paperwork than with patients.

- Manual updates to EHRs are **time-consuming and error-prone**.
- **Example**: Paper-based cognitive tests require manual scoring and data entry.
- **Impact**: Leads to **delayed diagnoses**, **billing mistakes**, and **patient safety issues**.

---

### 2. **Appointment Scheduling & Communication**

> **24.4% of patients** report delays due to inefficient communication.

- Scheduling via phone/email lacks automation and follow-up.
- **Example**: Missed appointments due to no reminders or confirmations.
- **Impact**: Strains staff and results in **delayed care**.

---

### 3. **Insurance & Billing**

> **30.9% of patients** experience care delays due to insurance issues.

- Verifying coverage, resolving denials, and prior authorizations are time-intensive.
- **Example**: Incorrect billing leads to **financial strain** and **denied claims**.

---

### 4. **Regulatory Compliance**

> A single 161-bed hospital may spend **$7.6 million annually** on compliance.

- Requires nearly **59 full-time staff** to manage documentation and oversight.
- **Example**: Post-acute care facilities must comply with **288+ extra regulations**.
- **Impact**: Significant **financial and operational burden**.

---

### 5. **Care Coordination**

> Fragmented systems hinder cross-provider communication.

- Referral and handoff processes are often **manual and redundant**.
- **Impact**: Leads to **miscommunication**, **duplicate tests**, and **disrupted care**.

---

### 📚 Sources

- [1] [Creyos](https://creyos.com/blog/administrative-burden-in-healthcare)
- [2] [Agiliti Health](https://www.agilitihealth.com/caregivers/focus-on-patients-not-hospital-admin-tasks/)
- [3] [PMC Article](https://pmc.ncbi.nlm.nih.gov/articles/PMC8522562/)
- [6] [SLCHC Blog](https://slchc.edu/uncategorized/blogs/key-challenges-facing-healthcare-administrators/)

---

## ✅ Solution: Curato

Curato addresses these challenges through a modular, AI-driven system:

### 1. **Smart Recording & Transcription**

Doctors can record patient conversations directly in the platform. Curato transcribes the audio in real time using the Gemini API, generating accurate, editable text.

### 2. **EHR Autofill Assistant**

Transcripts are analyzed by an AI model that extracts structured data for Electronic Health Records (EHR), auto-filling critical sections like:

- Chief Complaint
- Allergies & Medications
- SOAP Notes (Subjective, Objective, Assessment, Plan)
- Chaperone documentation, vitals, and more

### 3. **Secure Record Sharing**

Patients can selectively share their health information with providers via QR code. This helps reduce repetitive intake questions and improves continuity of care.

### 4. **Patient-Facing Portal**

Patients can:

- View upcoming and past appointments
- Chat with the assistant to ask about medications, appointments, summaries, etc.
- Control what data to share with clinicians and when

---

## 🛠️ Tech Stack

- **Next.js 14** + App Router
- **TypeScript**
- **Tailwind CSS**
- **Google Gemini API** (for transcription & EHR RAG)
- **QRCode generation**
- **Optional Vectara (RAG platform) support** for longitudinal health document search

---

## 📦 Future Directions

- 🧠 Integrate Vectara for document-level semantic search
- 🔒 End-to-end encrypted patient-provider messaging
- 🗂️ FHIR-compliant health data export
- 🌍 Multilingual and accessibility support

---

## 🤝 Contributors

- Thai An Le – Developer, Designer
- Britney Nguyen - Developer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# curato
