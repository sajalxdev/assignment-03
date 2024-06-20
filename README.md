## Assignment 03: Car Rental Reservation System

**Objective:** Develop a Express application with TypeScript as the programming language, integrating MongoDB with Mongoose for effective data management. Ensure data integrity through validation using Joi/Zod and handling edge cases.

### Live Demo:

Check out the live demo: [Car Rental Reservation System API](https://ph-apollo-l2a3.vercel.app/)

### Features

- **User Management:** Secure authentication and authorization for users and administrators.
- **Car Management:** CRUD operations for cars.
- **Booking System:** Allows users to book cars based on availability, manage bookings, and calculate costs based on duration and pricing.
- **Error Handling:** Comprehensive error handling and validation to ensure data integrity and smooth user experience.
- **Security:** JWT-based authentication and authorization to secure API endpoints.

### Technology Stack

- [x] **Programming Language:** TypeScript
- [x] **Web Framework:** Express.js
- [x] **Database:** MongoDB (with Mongoose)
- [x] **Authentication:** JSON Web Token (JWT)
- [x] **Validation:** Zod (for user input)
- [x] **Deployment:** Vercel

### How to Run Locally

### Prerequisites

- Node.js installed
- pnpm package manager installed
- MongoDB instance running (local or remote)
- nodemon package installed globally

**1. Clone the repository:**

```
git clone https://github.com/sajalxdev/assignment-03.git
cd assignment-03
```

**2. Install Dependencies:**

```
pnpm install
```

**3. Set Up Environment Variables**
Create a .env file in the root directory and add your environment variables:

```
NODE_ENV=development_or_production
PORT=5000
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.04sww6i.mongodb.net/<dbname>?retryWrites=true&w=majority

BCRYPT_SALT_ROUNDS=your_bcrypt_salt_round_number

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=your_jwt_expire_day_number
```

**4. Run the Applocation**

```
pnpm dev
```

#### Available Scripts:

`pnpm start`: Executes the compiled JavaScript application.

`pnpm dev`: Compiles TypeScript files into JavaScript and runs the application in development mode using the ts-node-dev tool.

`pnpm build`: Compiles TypeScript files into JavaScript using the TypeScript compiler (`tsc`).
