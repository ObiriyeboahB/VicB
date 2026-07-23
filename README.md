# VicB - Part-Time Job Marketplace

A fast, simple, and secure platform connecting job seekers (workers) with clients who need services. Inspired by Bolt and InDrive.

## 🎯 Overview

VicB is a full-stack web application that enables:
- **Workers** to offer services, apply for jobs, and get paid
- **Clients** to post jobs, hire workers, and make payments
- **Admins** to manage the platform, verify users, and handle disputes

## 🛠 Tech Stack

### Frontend
- **React.js** - UI library
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Socket.io Client** - Real-time messaging
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **JWT** - Authentication
- **Socket.io** - Real-time communication
- **Bcryptjs** - Password hashing
- **Dotenv** - Environment variables

### Third-party Services
- **Paystack** - Payment processing
- **Cloudinary** - File uploads
- **Google Maps API** - Location services

## 📁 Project Structure

```
VicB/
├── frontend/                      # React application
│   ├── public/
│   ├── src/
│   │   ├── pages/                # Page components
│   │   ├── components/           # Reusable UI components
│   │   ├── services/             # API calls
│   │   ├── context/              # Auth & global state
│   │   ├── styles/               # Tailwind config
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
│
├── backend/                       # Node.js/Express API
│   ├── routes/                   # API routes
│   ├── controllers/              # Business logic
│   ├── models/                   # Database models/queries
│   ├── middleware/               # Auth, validation, error handling
│   ├── config/                   # Configuration files
│   ├── sockets/                  # Socket.io handlers
│   ├── utils/                    # Helper functions
│   ├── .env.example              # Environment template
│   ├── server.js                 # Entry point
│   └── package.json
│
├── database/                      # Database setup
│   └── schema.sql                # PostgreSQL schema
│
├── .gitignore
└── README.md
```

## 🗄 Database Schema

### Tables
1. **users** - User accounts (worker, client, admin)
2. **worker_profiles** - Worker-specific information
3. **jobs** - Job postings
4. **job_offers** - Worker offers for jobs
5. **messages** - Real-time chat messages
6. **payments** - Payment transactions
7. **reviews** - Job reviews and ratings

See `database/schema.sql` for detailed schema.

## 🔐 Security Features

- ✅ JWT authentication with protected routes
- ✅ Password hashing with bcryptjs
- ✅ Role-based access control (RBAC)
- ✅ Environment variable protection
- ✅ Input validation and sanitization
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration

## 📱 Key Features

- 🔍 **Distance-based Job Matching** - Uses Haversine formula
- 💬 **Real-time Chat** - Socket.io powered messaging
- 💳 **Secure Payments** - Paystack escrow system
- ⭐ **Ratings & Reviews** - Star ratings after job completion
- 📍 **Location-based Services** - Google Maps integration
- 🔔 **Notifications** - Push notifications for jobs, offers, messages
- 🎯 **Urgent Jobs** - Fast-track job flagging
- 📸 **Profile Photos** - Cloudinary integration
- 📊 **Admin Dashboard** - Platform management tools

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v12+)
- npm or yarn

### Installation

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your credentials
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

#### Database Setup
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE vicb_db;

# Run schema
\c vicb_db
\i ../database/schema.sql
```

## 🔑 Environment Variables

Create a `.env` file in the backend folder:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/vicb_db

# Authentication
JWT_SECRET=your_very_secure_jwt_secret_key

# Payment Gateway
PAYSTACK_SECRET=your_paystack_secret_key
PAYSTACK_PUBLIC=your_paystack_public_key

# Maps
GOOGLE_MAPS_KEY=your_google_maps_api_key

# File Upload
CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

# Server
PORT=3000
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication
```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login and get JWT
GET    /api/auth/me             - Get current user (protected)
```

### Jobs
```
POST   /api/jobs                - Create job (client only)
GET    /api/jobs                - List all jobs (with filters)
GET    /api/jobs/:id            - Get job details
POST   /api/jobs/:id/apply      - Apply for job
PUT    /api/jobs/offers/:id/accept - Accept job offer
PUT    /api/jobs/:id/status     - Update job status
GET    /api/jobs/my-jobs        - Get user's jobs
```

### Users
```
PUT    /api/users/profile       - Update user profile
PUT    /api/users/worker-profile - Update worker info
PUT    /api/users/toggle-availability - Toggle availability
GET    /api/users/worker/:id    - Get worker public profile
```

### Chat
```
GET    /api/chat/:jobId         - Get messages for job
POST   /api/chat/:jobId         - Send message
WS     /socket.io               - Real-time events
```

### Payments
```
POST   /api/payments/initiate   - Initiate payment
GET    /api/payments/verify/:ref - Verify payment
POST   /api/payments/release/:id - Release payment to worker
```

### Reviews
```
POST   /api/reviews             - Submit review
GET    /api/reviews/:userId     - Get user reviews
```

## 🎨 Design System

### Colors
- **Primary**: Green (#22C55E)
- **Text**: Dark Gray (#1F2937)
- **Background**: White (#FFFFFF)

### Typography
- **Font Family**: Inter or Poppins
- **Responsive Design**: Mobile-first approach

### Components
- Navbar
- JobCard
- WorkerCard
- ChatBox
- RatingStars
- PaymentModal
- CategoryFilter

## 📖 Frontend Pages

1. **Landing Page** (`/`) - Hero, categories, testimonials
2. **Register** (`/register`) - User signup
3. **Login** (`/login`) - User signin
4. **Client Dashboard** (`/dashboard/client`) - Client overview
5. **Worker Dashboard** (`/dashboard/worker`) - Worker overview
6. **Job Listings** (`/jobs`) - Browse jobs with filters
7. **Job Detail** (`/jobs/:id`) - Full job information
8. **Post Job** (`/post-job`) - Create new job
9. **Chat** (`/chat/:jobId`) - Real-time messaging
10. **Profile** (`/profile`) - User profile management
11. **Payment** (`/payment/:jobId`) - Payment processing
12. **Reviews** (`/reviews/:userId`) - User reviews
13. **Admin Dashboard** (`/admin`) - Platform management

## 🔄 Real-time Features (Socket.io)

```javascript
// Events
join_room            - Join job chat room
send_message         - Send message
receive_message      - Receive message
typing               - Show typing indicator
user_online          - Track online status
notification         - Send notifications
```

## 📊 User Roles

### Worker
- Browse and apply for jobs
- View profile and ratings
- Chat with clients
- Receive payments
- Submit reviews

### Client
- Post jobs
- View worker applications
- Accept/reject offers
- Pay workers via Paystack
- Submit reviews

### Admin
- Verify users
- Manage jobs
- View payment logs
- Handle disputes
- Configure platform fees

## 🔒 Security Best Practices

- All passwords hashed with bcryptjs
- JWT tokens for stateless authentication
- CORS enabled for frontend domain only
- Rate limiting on all endpoints
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- XSS protection with React

## 📝 Contributing

1. Create a feature branch
2. Make your changes
3. Commit with clear messages
4. Push and create a Pull Request

## 📄 License

MIT License - see LICENSE file for details

## 📞 Support

For issues, questions, or suggestions, please open an issue on GitHub.

## 🎉 Ready to Build?

Start with the installation steps above and begin customizing for your needs!

---

**VicB** - Connecting workers with opportunities, fast and simple. ⚡
