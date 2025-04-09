# TaskflowX – Simplify Task Management with Smart Workflow

TaskflowX is a modern task management system built with **Next.js 15**, **Prisma**, and **PostgreSQL**, designed to help individuals and teams simplify workflows, increase accountability, and enhance collaboration.

---

## 🚀 Features

### ✅ MVP Features (Implemented)

- 📝 Task creation and management
- 📌 Status tracking (Pending, In Progress, Completed)
- 🏢 Workspace creation and management
- 🗂️ Board creation
- 🔐 Authentication (via NextAuth)
- ✉️ Workspace invitations

## 📦 Tech Stack

- **Frontend**: Next.js 15
- **Backend**: Next.js API routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: NextAuth.js

---

---

## ⚙️ Installation & Setup

Follow these steps to set up and run TaskflowX locally.

### 1. Clone the repository

```bash
git clone https://github.com/johnelipse/task-management.git
```

enter the coned repo

```bash
cd taskflowx
```

### 2. Install the dependencies

```bash
pnpm install
```

### 3. Set up the enviroment varriable in the (.env) file

here are the required varriables at the start

--for the database

```bash
DATABASE_URL=""
```

---For nextauth ressiponsible for authentication

```bash
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="3cc9d3166430d0605de2ede088934d4e72085ed6"
```

```bash
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

--from resend ressiponsible for sending emails

```bash
RESEND_API_KEY=""
```

--From uploadthing resiponsible for image upload

```bash
UPLOADTHING_TOKEN=''
```

## DATABASE SETUP AND SEEDING

### 1. Set up the database

--Create a folder called migrations in the prisma folder and then run this command;

```bash
npx prisma migrate dev --name init
```

### 2. seed

Make sure your prisma/seed.ts or .js file is set up, then run.

```bash
pnpm prisma db seed
```
