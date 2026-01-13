# 🌐 Horizon Bank App

Horizon is a modern banking platform that allows users to **link their existing Nigerian bank accounts** into one unified dashboard. The app provides a seamless way to view balances, track transactions, and manage multiple accounts from different banks in one place.

⚠️ **Note:** Transfers between banks are currently disabled because Horizon does not yet have a government-issued license to process financial transactions. The app is intended as a demo/prototype platform.

---

## 🚀 Features

- **Account Linking:** Connect multiple Nigerian bank accounts using [Mono](https://mono.co).
- **Unified Dashboard:** View balances and transactions across all linked accounts.
- **Authentication & Database:** Secure login and data storage powered by [Appwrite](https://appwrite.io).
- **Transaction History:** Track recent transactions across accounts.
- **Error Monitoring:** Integrated with [Sentry](https://sentry.io) for both **frontend** and **backend** error tracking.
- **Responsive UI:** Built with React + TypeScript and styled with TailwindCSS.
- **Charts & Analytics:** Visualize balances and spending using Chart.js.
- **Deployment:**  
  - **Frontend:** Hosted on GitHub Pages → [Horizon Live Demo](https://ebikemeese.github.io/Horizon/)  
  - **Backend:** Hosted on [Render](https://render.com)

---

## 🛠️ Tech Stack

| Layer              | Technology                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| **Frontend**       | React (TypeScript), Vite, TailwindCSS, Radix UI, React Query, Zod, Sentry   |
| **Backend**        | Django, Django REST Framework, Render, Sentry                               |
| **Database/Auth**  | Appwrite                                                                    |
| **Bank Linking**   | Mono Connect.js                                                             |
| **Deployment**     | GitHub Pages (frontend), Render (backend)                                   |

---

