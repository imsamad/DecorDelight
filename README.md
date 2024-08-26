# E-commerce Project for Selling Decorative Items (Ongoing Freelance Project, Beta Version)

## Tech Stack

- **Backend**: Express and MongoDB, with Prisma as the ORM.
- **Frontend**: NextJS, NextAuth, React Hook Form, Shadcn, and Tailwind CSS.
- **Assets Management**: Cloudinary.
- **Monorepo**: Turborepo.
- **Payment Integration**: Stripe.

## Features

- OTP-based email signup.
- JWT authentication and cookie management for secure user sessions.
- Stripe payment processing integration.
- Key features include:
  - Landing page
  - Product listing
  - Shopping cart
  - Order placement
  - User dashboard
  - Admin capabilities to manage order statuses

## Setup

To quickly set up the project, use the following single command:
It encompases all below steps just copy and throw it in terminal, and you will be good to go

```sh
git clone git@github.com:imsamad/DecorDelight && cd DecorDelight && npm install && docker compose up -d && npm run copy:env && npm run db:generate && npx turbo run build -F=@repo/* && npm run db:seed && npm run dev
```

1. Clone the repository and install dependencies:

   ```sh
   git clone https://github.com/imsamad/DecorDelight && cd DecorDelight && npm install
   ```

2. Start MongoDB Instance. If you don’t have Docker installed, you can use a cloud instance.

   ```sh
   docker compose up -d
   ```

3. Copy environment variables:

   ```sh
   npm run copy:env
   ```

4. Generate Prisma Client:

   ```sh
   npm run db:generate
   ```

5. Build all packages. This step is required due to the JIT compilation strategy used with Turborepo.

   ```sh
   npx turbo run build -F=@repo/*
   ```

6. Seed dummy data:

   ```sh
   npm run db:seed
   ```

7. Start the application:

   ```sh
   npm run dev
   ```

## Access the Application

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:4000](http://localhost:4000)

## Test User Credentials

- **Emails**: `user@gmail.com`, `admin@gmail.com`
- **Password**: `Password@123`

## TODOs

1. Allow Admin to park products in draft status temporarily.
