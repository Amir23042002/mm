
# OYIEE Dreamscape Portal

A React + Tailwind CSS project with email-based authentication using Resend and JWT tokens, featuring comprehensive Indian checkout with Razorpay integration.

## Project info

**URL**: https://lovable.dev/projects/58e74365-188b-407c-b40b-247d114c2b3b

## Setup

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- Resend account for email functionality
- Razorpay account for payment processing

### Environment Variables

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```

2. Fill in your environment variables:
   - `RESEND_API_KEY`: Get your API key from [Resend Dashboard](https://resend.com/api-keys)
   - `JWT_SECRET`: Keep as `oyiee_auth_secret` or generate a random string
   - `RAZORPAY_KEY_ID`: Get from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)
   - `RAZORPAY_KEY_SECRET`: Get from [Razorpay Dashboard](https://dashboard.razorpay.com/app/keys)

### Resend Setup

1. **Create Resend Account**
   - Sign up at [Resend](https://resend.com/)
   - Verify your email domain at [Resend Domains](https://resend.com/domains)

2. **Get API Key**
   - Go to [API Keys section](https://resend.com/api-keys)
   - Create a new API key
   - Add it to your `.env` file as `RESEND_API_KEY`

3. **Domain Verification**
   - Add and verify your sending domain
   - For development, you can use `onboarding@resend.dev`

### Razorpay Setup

1. **Create Razorpay Account**
   - Sign up at [Razorpay](https://razorpay.com/)
   - Complete KYC verification for live mode

2. **Get API Keys**
   - Go to [API Keys section](https://dashboard.razorpay.com/app/keys)
   - Generate Key ID and Key Secret
   - Use test keys for development, live keys for production

3. **Enable Payment Methods**
   - Go to [Payment Methods](https://dashboard.razorpay.com/app/payment-methods)
   - Enable UPI, Cards, Net Banking, Wallets
   - Configure PhonePe, Google Pay, and other UPI apps

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

## Features

### Authentication Flow
- Email-based signup and login
- JWT token-based session management
- Password hashing with bcrypt
- Welcome email on signup
- User profile with name, email, gender, phone

### E-commerce Features
- Product catalog with cyberpunk fashion items
- Shopping cart with persistent storage
- Multi-step checkout process
- Indian address validation (pincode, phone format)

### Payment Integration
- **Razorpay Integration**: UPI, Cards, Net Banking, Wallets
- **Cash on Delivery**: For customers preferring offline payment
- **GST Calculation**: 18% GST on all orders
- **Shipping**: Flat ₹50 shipping across India

### Checkout Process
1. **Shipping & Billing**: Address form with Indian validation
2. **Order Review**: Item summary with pricing breakdown
3. **Payment Selection**: Choose between online payment or COD
4. **Payment Processing**: Secure Razorpay integration
5. **Order Confirmation**: Thank you page with order details

## API Endpoints

### Netlify Functions

- `/.netlify/functions/signup` - POST - Create user account and send welcome email
- `/.netlify/functions/login` - POST - Authenticate user and return JWT token
- `/.netlify/functions/create-order` - POST - Create order (Razorpay/COD)
- `/.netlify/functions/confirm-payment` - POST - Verify Razorpay payment signature

### Signup Request
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "gender": "male",
  "phone": "9876543210",
  "password": "securepassword"
}
```

### Login Request
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

## Authentication Routes

- `/signup` - User registration page
- `/login` - User login page
- `/profile` - User profile page (protected)
- `/auth` - Legacy auth page (kept for compatibility)

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, shadcn-ui
- **Authentication**: JWT tokens, bcrypt password hashing
- **Email**: Resend for transactional emails
- **Payment**: Razorpay (UPI, Cards, Net Banking, Wallets)
- **Backend**: Netlify Functions
- **Build Tool**: Vite
- **State Management**: React Context API
- **Form Validation**: react-hook-form + Zod

## User Data Structure

```typescript
interface User {
  id: string;
  fullName: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  phone: string;
}
```

## Email Templates

The system sends welcome emails to new users with:
- Personalized greeting
- Account confirmation
- Login link
- OYIEE branding

## Development Notes

- User data is stored in-memory (use a database in production)
- JWT tokens expire after 7 days
- Passwords are hashed with bcrypt (10 rounds)
- All amounts are in INR (Indian Rupees)
- Email domain must be verified in Resend

## Deployment

Deploy to Netlify:

1. Connect your repository to Netlify
2. Set environment variables in Netlify dashboard:
   - `RESEND_API_KEY`
   - `JWT_SECRET`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
3. Deploy using:
   ```sh
   npm run build
   ```

The Netlify functions will be automatically deployed with your site.

## Security Features

- **Password Hashing**: bcrypt with 10 rounds
- **JWT Tokens**: Secure token-based authentication
- **Email Verification**: Domain verification required
- **Payment Signature Verification**: Server-side Razorpay signature validation
- **CORS Protection**: Proper CORS headers on all API endpoints
- **Input Validation**: Zod schema validation for all forms

## Testing the System

1. **Signup Flow**:
   - Navigate to `/signup`
   - Create account with valid email
   - Check email inbox for welcome message
   - Automatically logged in after signup

2. **Login Flow**:
   - Navigate to `/login`
   - Enter email and password
   - Redirected to homepage on success

3. **Profile Access**:
   - Click user avatar in navigation
   - View profile information
   - All user fields displayed

## License

This project is built with Lovable and uses various open-source packages.
