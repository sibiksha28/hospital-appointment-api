# Hospital Appointment API

A TypeScript-based Hospital Appointment API built using Prisma ORM and PostgreSQL.

## Features

- Patient CRUD operations
- Doctor CRUD operations
- Appointment booking and management
- Search patients by name
- List doctors by specialty
- View upcoming doctor appointments
- Update and cancel appointments
- Seed sample data

## Technologies Used

- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Setup

1. Install dependencies:

   npm install

2. Configure the DATABASE_URL in the .env file.

3. Generate Prisma Client:

   npx prisma generate

4. Run the seed script:

   npx prisma db seed

5. Run CRUD tests:

   npx tsx src/test.ts
   