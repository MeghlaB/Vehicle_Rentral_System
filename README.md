#  Vehicle Rental System

A backend API for managing vehicle rentals, bookings, and customer accounts with role-based authentication.

---

## Live URL

> [https://vehicle-rental-system-virid.vercel.app/](https://vehicle-rental-system-virid.vercel.app/)

---

##  Project Overview

The Vehicle Rental System backend API allows you to:

- **Manage Vehicles**: Add, update, view, and delete vehicles with availability tracking.
- **Manage Customers**: Register, view, and update customer profiles.
- **Handle Bookings**: Create, manage, and return bookings with automated cost calculation.
- **Authentication**: Secure role-based access control for Admins and Customers.

---

##  Technology Stack

- **Backend**: Node.js + TypeScript  
- **Web Framework**: Express.js  
- **Database**: PostgreSQL  
- **Authentication**: JSON Web Tokens (JWT)  
- **Password Security**: bcrypt  
- **Development Tools**: Nodemon

---


##  Setup & Usage

1. **Clone repository**
```bash
git clone https://github.com/ImArijitBasu/vehicle-rental-backend
cd vehicle-rental-backend

2. **Install dependencies**

npm install

3. **Create environment variables**

DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_secret_key
PORT=5000

4. **Start development server**

npm run dev

5. **Base API URL**

 http://localhost:5000/api/v1