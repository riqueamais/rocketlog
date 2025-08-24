# RocketLog 📦

A delivery tracking API built with Node.js, Express, TypeScript, and Prisma.

## Overview

RocketLog is a RESTful API that allows tracking deliveries with different user roles (customers and sales), authentication, and detailed delivery logging.

## Features

- 🔐 User authentication with JWT
- 👥 Role-based authorization (customer/sale)
- 📦 Delivery tracking system
- 📝 Delivery status updates
- 🔍 Detailed delivery logs
- ✅ Input validation with Zod
- 🎯 Unit testing with Jest

## Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Jest
- Supertest
- Docker
- JWT

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- PostgreSQL

## Project Structure

```
src/
├── app.ts              # Express app configuration
├── server.ts           # Server startup
├── env.ts             # Environment variables validation
├── config/            # Configuration files
├── controllers/       # Route controllers
├── database/         # Database configuration
├── middlewares/      # Express middlewares
├── routes/           # API routes
├── tests/            # Test files
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## Getting Started

1. Clone the repository:
```sh
git clone https://github.com/yourusername/rocketlog.git
cd rocketlog
```

2. Install dependencies:
```sh
npm install
```

3. Copy environment variables:
```sh
cp .env.example .env
```

4. Configure your `.env` file:
```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/rocketlog"
JWT_SECRET="your-secret-key"
```

5. Start PostgreSQL with Docker:
```sh
docker-compose up -d
```

6. Run database migrations:
```sh
npx prisma migrate dev
```

7. Start the development server:
```sh
npm run dev
```

## API Routes

### Users
- `POST /users` - Create new user
- `GET /users` - List all users

### Sessions
- `POST /sessions` - Authenticate user

### Deliveries
- `POST /deliveries` - Create new delivery
- `GET /deliveries` - List all deliveries
- `PATCH /deliveries/:id/status` - Update delivery status

### Delivery Logs
- `POST /delivery-logs` - Create delivery log
- `GET /delivery-logs/:delivery_id/show` - Show delivery logs

## Authentication

The API uses JWT for authentication. To access protected routes:

1. Get a token by making a POST request to `/sessions`
2. Include the token in request headers:
```
Authorization: Bearer your-token-here
```

## Role-Based Authorization

Two user roles are available:
- `customer`: Can view their own deliveries
- `sale`: Can manage all deliveries and create logs

## Testing

Run the test suite:
```sh
npm run test:dev
```

## Database Schema

### Users
```prisma
model User {
  id       String    @id @default(uuid())
  name     String
  email    String
  password String
  role     UserRole  @default(customer)
}
```

### Deliveries
```prisma
model Delivery {
  id          String         @id @default(uuid())
  userId      String        
  description String
  status      DeliveryStatus @default(processing)
}
```

### Delivery Logs
```prisma
model DeliveryLog {
  id          String   @id @default(uuid())
  deliveryId  String   
  description String
}
```

## API Examples

### Create User
```sh
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "123456"
  }'
```

### Authenticate
```sh
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "123456"
  }'
```

### Create Delivery
```sh
curl -X POST http://localhost:3333/deliveries \
  -H "Authorization: Bearer your-token" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "user-uuid",
    "description": "Package delivery"
  }'
```

## Error Handling

The API uses a centralized error handling system with custom `AppError` class and middleware.

## Diagrama do Banco de Dados (drawSQL)

O diagrama do banco de dados do projeto está disponível no drawSQL:

https://drawsql.app/teams/riqueamais-workspace/diagrams/rocket-log

![Diagrama do banco de dados](diagrama.png)