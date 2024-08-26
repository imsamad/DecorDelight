# E-commerce project for selling decorative items. (On-going freelance project, in beta version)

## Tech Stack and Features

- The backend is powered by Express and MongoDB, with Prisma as the ORM.
- It features OTP-based email signup, JWT authentication, and cookie management for secure user sessions.
- The frontend is built using Next.js, React Hook Form, Shadcn, and Tailwind CSS, providing a seamless and responsive user experience.
- Stripe is integrated for payment processing.
- Key features include a landing page, product listing, shopping cart, order placement, and a user dashboard, with admin capabilities to manage order statuses.

#### Setup

1.) Clone and install deps

```sh
git clone https://github.com/imsamad/DecorDelight && cd DecorDelight && npm install
```

2.) Spin up mongo instance - it requires docker install on machine, so can skip if you have cloud instance

```sh
docker compose up -d
```

3.) Copy .env.example to .env in required apps and packages

```sh
npm run copy:env
```

4.) Generate Prisma Client

```sh
npm run db:generate
```

5.) Generate build of all the packages beforehand - it is required as we are employing JIT comilation stargey of turborepo

```sh
npx turbo run build -F=@repo/*
```

6.) Finally, spin up the application

```sh
npm run dev
```

App ready On

<table  width="100%"  >
<tr>
<td>Frontend
</td><td>Backend
</td>
</tr>
<tr>
<td><a href="http://localhost:3000" target="_blank" >localhost:3000</a>
</td><td><a href="http://localhost:4000" target="_blank" >localhost:4000</a>
</td>
</tr>
</table>

### TODOs:

1. Allow Admin to park products in draft status temporarily
