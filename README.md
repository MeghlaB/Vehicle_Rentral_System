# 🚗 Vehicle Rental System

A backend API for managing vehicle rentals, bookings, and customer accounts with role-based authentication.

---

## 🌐 Live URL

> Currently under development / To be deployed

---

## 🎯 Project Overview

The Vehicle Rental System backend API allows you to:

- **Manage Vehicles**: Add, update, view, and delete vehicles with availability tracking.
- **Manage Customers**: Register, view, and update customer profiles.
- **Handle Bookings**: Create, manage, and return bookings with automated cost calculation.
- **Authentication**: Secure role-based access control for Admins and Customers.

---

## 🛠️ Technology Stack

- **Backend**: Node.js + TypeScript  
- **Web Framework**: Express.js  
- **Database**: PostgreSQL  
- **Authentication**: JSON Web Tokens (JWT)  
- **Password Security**: bcrypt  
- **Development Tools**: Nodemon, ESLint, Prettier  

---

## 📁 Code Structure

The project follows a **modular pattern** with feature-based separation and layered architecture:


- **Controllers**: Handle HTTP requests and responses.  
- **Services**: Contain business logic and interact with the database.  
- **Routes**: Define endpoint URLs and attach controllers.  
- **Middlewares**: Authentication, error handling, validation, etc.  

---

## 📊 Database Schema

### Users
| Field     | Notes                        |
|----------|-------------------------------|
| id       | Auto-generated               |
| name     | Required                     |
| email    | Required, unique, lowercase  |
| password | Required, min 6 characters   |
| phone    | Required                     |
| role     | 'admin' or 'customer'        |

### Vehicles
| Field               | Notes                         |
|--------------------|-------------------------------|
| id                 | Auto-generated               |
| vehicle_name       | Required                     |
| type               | 'car', 'bike', 'van', 'SUV'  |
| registration_number | Required, unique             |
| daily_rent_price    | Required, positive           |
| availability_status | 'available' or 'booked'     |

### Bookings
| Field            | Notes                                           |
|-----------------|-------------------------------------------------|
| id               | Auto-generated                                  |
| customer_id      | Links to Users table                            |
| vehicle_id       | Links to Vehicles table                         |
| rent_start_date  | Required                                       |
| rent_end_date    | Required, must be after start date             |
| total_price      | Required, positive                             |
| status           | 'active', 'cancelled', or 'returned'           |

---

## 🔐 Authentication & Authorization

- **Roles**:
  - **Admin**: Full system access (manage vehicles, users, bookings)  
  - **Customer**: Register, view vehicles, create/manage own bookings  
- **Flow**:
  - Passwords hashed using bcrypt  
  - JWT token issued on login via `/api/v1/auth/signin`  
  - Protected routes require `Authorization: Bearer <token>` header  
  - Unauthorized access returns 401 or 403  

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint             | Access  | Description                 |
|--------|--------------------|---------|-----------------------------|
| POST   | /api/v1/auth/signup | Public  | Register new user           |
| POST   | /api/v1/auth/signin | Public  | Login and receive JWT       |

### Vehicles
| Method | Endpoint                  | Access   | Description                               |
|--------|---------------------------|----------|-------------------------------------------|
| POST   | /api/v1/vehicles          | Admin    | Add a vehicle                             |
| GET    | /api/v1/vehicles          | Public   | View all vehicles                          |
| GET    | /api/v1/vehicles/:id      | Public   | View vehicle details                        |
| PUT    | /api/v1/vehicles/:id      | Admin    | Update vehicle details                      |
| DELETE | /api/v1/vehicles/:id      | Admin    | Delete vehicle (if no active bookings)    |

### Users
| Method | Endpoint                  | Access           | Description                     |
|--------|---------------------------|----------------|---------------------------------|
| GET    | /api/v1/users             | Admin           | View all users                  |
| PUT    | /api/v1/users/:id         | Admin / Own     | Update any user / own profile   |
| DELETE | /api/v1/users/:id         | Admin           | Delete user (if no active bookings) |

### Bookings
| Method | Endpoint                  | Access           | Description                                   |
|--------|---------------------------|----------------|-----------------------------------------------|
| POST   | /api/v1/bookings          | Customer/Admin  | Create booking, calculates price, updates vehicle status |
| GET    | /api/v1/bookings          | Role-based      | Admin: All bookings, Customer: Own bookings |
| PUT    | /api/v1/bookings/:id      | Role-based      | Customer: Cancel (before start), Admin: Mark as returned |

---

## ⚙️ Setup & Usage

1. **Clone repository**
```bash
git clone <repository-url>
cd vehicle-rental-system

npm install

