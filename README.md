# Moore Advice - Fullstack Test

A fullstack application for managing products and categories with a React frontend and Laravel backend.

## Prerequisites

- PHP 8.1+
- Composer
- Node.js 18+
- npm or yarn
- MySQL 8.0+

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Configure your database in `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=moore_advice
   DB_USERNAME=your_username
   DB_PASSWORD=your_password
   ```

6. Run database migrations and seeders:
   ```bash
   php artisan migrate --seed
   ```

7. Start the development server:
   ```bash
   php artisan serve
   ```
   The backend will be available at `http://localhost:8000`

## Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will be available at `http://localhost:5173`

## Default Credentials

An admin user is created by the seeder with the following credentials:
- Email: admin@example.com
- Password: password

## Features

- User authentication (login/logout)
- Product management (CRUD operations)
- Category management (CRUD operations)
- Responsive Material-UI interface

## Screenshots

### Login Page
![Login Page](https://i.imgur.com/wNbCbPv.png)

### Dashboard
![Dashboard](/screenshots/dashboard.png)

### Products List
![Products List](/screenshots/products.png)

### Add/Edit Product
![Product Form](https://i.imgur.com/bL48nxo.png)

### Categories Management
![Categories](/screenshots/categories.png)

To add your own screenshots:
1. Create a `screenshots` directory in your project root
2. Add your screenshot images (PNG format recommended)
3. Update the image paths above to match your screenshot filenames

## Tech Stack

### Backend
- PHP 8.1+
- Laravel 10.x
- MySQL 8.0+
- Sanctum for API authentication

### Frontend
- React 18+
- TypeScript
- Material-UI
- React Router
- Axios for API requests
- Formik & Yup for form handling
