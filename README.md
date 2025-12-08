# Turino 🛫

Online platform for booking and managing domestic and international tours

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [Backend Setup](#backend-setup)
- [Project Structure](#project-structure)
- [Pages and Components](#pages-and-components)
- [API and Backend](#api-and-backend)
- [Authentication](#authentication)
- [Styling](#styling)
- [Scripts](#scripts)

## Introduction

Turino is a comprehensive platform for booking and managing travel tours, allowing users to search, view details, and book domestic and international tours.

## Features

### ✨ Main Features

- 🔍 **Advanced Tour Search**: Search by origin, destination, and date
- 📱 **Responsive Design**: Compatible with mobile, tablet, and desktop
- 🔐 **Secure Authentication**: Login with mobile number and OTP code
- 👤 **User Dashboard**: Manage personal information, bank account, and purchased tours
- 💳 **Payment System**: Online payment and transaction management
- 🛒 **Shopping Cart**: Add tours to cart
- 📊 **Transaction Management**: View payment history
- 🌐 **Error Handling**: Display internet errors and 404 pages

### 🎨 UI/UX Features

- Modern and user-friendly design
- Smooth animations and transitions
- Loading state indicators
- Success and error messages
- User menu for mobile and desktop

## Technologies Used

### Frontend

- **Next.js 15.5.6**: React framework for building applications
- **React 19.1.0**: UI library
- **React Query (TanStack Query)**: State and cache management
- **Axios**: HTTP requests
- **React Hook Form**: Form management
- **Yup**: Form validation
- **React Hot Toast**: Notification display
- **Zaman**: Persian date management
- **CSS Modules**: Component styling

### Development Tools

- **ESLint**: Code quality checking
- **Tailwind CSS**: CSS framework
- **PostCSS**: CSS processing

## Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the project**:

```bash
git clone <repository-url>
cd turino
```

2. **Install dependencies**:

```bash
npm install
# or
yarn install
```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

4. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

5. **Open your browser**:
   The project will be available at [http://localhost:3000](http://localhost:3000)

## Backend Setup

### Important: Backend Required

This frontend application requires a backend server to function properly. You need to set up and run the backend before starting the frontend.

### Backend Installation Steps

1. **Clone the backend repository**:

```bash
git clone <backend-repository-url>
cd <backend-directory>
```

2. **Install backend dependencies**:

```bash
npm install
# or
yarn install
```

3. **Set up backend environment variables**:
   Create a `.env` file in the backend directory with the required configuration (database, JWT secrets, etc.)

4. **Start the backend server**:

```bash
npm start
# or
yarn start
# or for development
npm run dev
```

5. **Verify backend is running**:
   Make sure the backend is running on the port specified in `NEXT_PUBLIC_BASE_URL` (default: `http://localhost:3001`)

### Backend Requirements

- The backend must be running before starting the frontend
- Ensure the backend API endpoints match the frontend expectations
- Backend should provide the following endpoints:
  - Authentication endpoints (`/auth/send-otp`, `/auth/check-otp`)
  - Tour endpoints (`/tour`, `/tour/:id`)
  - User endpoints (`/user/profile`, `/user/tours`, `/user/transactions`)
  - Basket endpoints (`/basket`, `/basket/:id`)
  - Order endpoints (`/order`)

## Project Structure

```
turino/
├── public/                 # Static files (images, icons)
├── src/
│   ├── app/               # Pages and routing
│   │   ├── checkout/      # Checkout page
│   │   ├── payment/       # Payment result page
│   │   ├── profile/       # User profile pages
│   │   │   ├── my-tours/  # My tours
│   │   │   └── transactions/ # Transactions
│   │   ├── search/        # Search page
│   │   └── tours/         # Tour pages
│   ├── components/        # React components
│   │   ├── atoms/         # Small components (buttons)
│   │   ├── partials/      # Partial components (Header, Footer)
│   │   └── templates/     # Large components (pages)
│   └── core/              # Core application logic
│       ├── config/        # Configuration (API)
│       ├── hooks/         # Custom Hooks
│       ├── schema/         # Validation schemas
│       ├── services/      # API services
│       └── utils/         # Helper functions
├── package.json
├── next.config.mjs
└── README.md
```

## Pages and Components

### Main Pages

- **Home Page (`/`)**: Display banner, search form, and tour list
- **Search Page (`/search`)**: Tour search results
- **Tour Details Page (`/tours/[id]`)**: Complete tour details
- **Checkout Page (`/checkout`)**: Passenger information form and payment
- **Payment Result Page (`/payment`)**: Display payment result

### Profile Pages

- **Profile (`/profile`)**: User account information
- **My Tours (`/profile/my-tours`)**: List of purchased tours
- **Transactions (`/profile/transactions`)**: Payment history

### Important Components

#### Templates

- `HeroBanner`: Home page banner
- `HeroTitle`: Home page title
- `SearchForm`: Tour search form
- `TourList`: Tour list
- `TourCard`: Tour card display
- `AuthForm`: Login/Register form
- `UserMenu`: User menu (mobile)
- `AccountInfoForm`: Account information form
- `PersonalInfoForm`: Personal information form
- `BankAccountForm`: Bank account information form
- `TransactionsPage`: Transactions page
- `MyToursPage`: My tours page
- `InternetError`: Internet error page
- `NotFoundError`: 404 page

#### Partials

- `Header`: Site header
- `Footer`: Site footer
- `AuthProvider`: Authentication provider
- `TanstakQueryProvider`: React Query provider

## API and Backend

### Main Endpoints

- `GET /tour`: Get tour list
- `GET /tour/:id`: Get tour details
- `POST /auth/send-otp`: Send OTP code
- `POST /auth/check-otp`: Verify OTP code
- `POST /auth/refresh-token`: Refresh token
- `GET /user/profile`: Get user information
- `PUT /user/profile`: Update user information
- `GET /user/basket`: Get shopping cart
- `POST /basket`: Add to cart
- `DELETE /basket/:id`: Remove from cart
- `POST /order`: Create order
- `GET /user/tours`: Get purchased tours
- `GET /user/transactions`: Get transactions

### Token Management

The project uses JWT for authentication:

- **Access Token**: Stored in cookie with 30 days validity
- **Refresh Token**: Stored in cookie with 365 days validity
- **Auto Refresh**: Automatic token refresh on expiration

## Authentication

### Login Process

1. User enters mobile number
2. OTP code is sent to mobile number
3. User enters 6-digit code
4. If correct, tokens are stored
5. User is redirected to dashboard

### Session Management

- Tokens are stored in cookies
- If access token expires, it's automatically refreshed using refresh token
- If both tokens expire, user is redirected to login page

## Styling

### Styling Methods

- **CSS Modules**: For component styling
- **Tailwind CSS**: For quick styling
- **Inline Styles**: For dynamic styles

### Mobile First Design

All styles are designed with Mobile First approach:

- First designed for mobile
- Then optimized for desktop with Media Queries

## Scripts

```bash
# Run project in development mode
npm run dev

# Build project for production
npm run build

# Run project in production mode
npm start

# Check code quality
npm run lint
```

## Important Notes

### Environment Variables

Make sure to create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

### Cookie Management

Tokens are stored in cookies. Make sure to use HTTPS in production.

### Error Handling

- Internet errors: Display `InternetError` page
- 404 errors: Display `NotFoundError` page
- API errors: Display error message with Toast

### Backend Connection

⚠️ **Important**: Make sure the backend server is running and accessible at the URL specified in `NEXT_PUBLIC_BASE_URL` before starting the frontend application.

## Development and Contribution

To develop and improve the project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private.

## Contact

For questions and support, please contact the development team.

---

**Made with ❤️ for Turino**
