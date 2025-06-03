# 📚 BookStore - Modern E-commerce Platform

A full-featured online bookstore built with React, TypeScript, and modern web technologies. This platform provides a complete e-commerce solution for book retailers with admin management capabilities and user-friendly shopping experience.

![BookStore Banner](https://via.placeholder.com/1200x400/3b82f6/ffffff?text=BookStore+-+Your+Digital+Library)

## ✨ Features

### 🛍️ Customer Features

- **Browse & Search**: Advanced book search with filters by category, price, author, and rating
- **User Authentication**: Secure login/registration with JWT tokens
- **Shopping Cart**: Add/remove books, quantity management, and persistent cart
- **Wishlist**: Save favorite books for later purchase
- **Order Management**: Track orders, view order history, and order status updates
- **User Dashboard**: Personal reading statistics, spending analytics, and recommendations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Payment Integration**: Secure payment processing with order verification

### 👨‍💼 Admin Features

- **Book Management**: Add, edit, delete, and manage book inventory
- **Category Management**: Create and organize book categories
- **User Management**: View, block/unblock users, and manage user roles
- **Order Management**: Process orders, update status, and track fulfillment
- **Analytics Dashboard**: Sales metrics, user statistics, and business insights
- **Bulk Operations**: Efficient management of multiple items

### 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface using shadcn/ui components
- **Dark/Light Mode**: Theme switching capability
- **Interactive Charts**: Data visualization with Recharts
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Smooth loading experiences throughout the app
- **Error Handling**: Comprehensive error management and user feedback

## 🚀 Tech Stack

### Frontend

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Redux Toolkit** - State management with RTK Query
- **shadcn/ui** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Lucide React** - Beautiful icon library

### Backend Integration

- **RTK Query** - Efficient data fetching and caching
- **JWT Authentication** - Secure token-based authentication
- **RESTful APIs** - Clean API integration

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/bookstore.git
   cd bookstore
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install

   # or

   yarn install
   \`\`\`

3. **Environment Configuration**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

   Update the environment variables:
   \`\`\`env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=BookStore
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev

   # or

   yarn dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

\`\`\`
bookstore/
├── public/ # Static assets
├── src/
│ ├── components/ # Reusable UI components
│ │ ├── ui/ # shadcn/ui components
│ │ ├── buttons/ # Custom button components
│ │ └── forms/ # Form components
│ ├── pages/ # Page components
│ │ ├── admin/ # Admin dashboard pages
│ │ ├── auth/ # Authentication pages
│ │ └── user/ # User-facing pages
│ ├── redux/ # Redux store and slices
│ │ ├── features/ # Feature-based slices
│ │ └── store.ts # Store configuration
│ ├── utils/ # Utility functions
│ ├── hooks/ # Custom React hooks
│ ├── types/ # TypeScript type definitions
│ └── lib/ # Library configurations
├── package.json
└── README.md
\`\`\`

## 🔧 Available Scripts

\`\`\`bash

# Development

npm run dev # Start development server
npm run build # Build for production
npm run preview # Preview production build
npm run lint # Run ESLint
npm run type-check # Run TypeScript compiler

# Testing

npm run test # Run tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Run tests with coverage
\`\`\`

## 📱 Key Pages & Components

### Public Pages

- **Home** (`/`) - Landing page with featured books
- **Books** (`/books`) - Book catalog with search and filters
- **Book Details** (`/books/:id`) - Individual book information
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order placement and payment

### User Pages

- **Dashboard** (`/dashboard`) - User analytics and reading stats
- **My Orders** (`/my-orders`) - Order history and tracking
- **Profile** (`/profile`) - User profile management
- **Wishlist** (`/wishlist`) - Saved books

### Admin Pages

- **Admin Dashboard** (`/admin`) - Business analytics
- **Manage Books** (`/admin/books`) - Book inventory management
- **Manage Categories** (`/admin/categories`) - Category management
- **Manage Users** (`/admin/users`) - User administration
- **Manage Orders** (`/admin/orders`) - Order processing

### Authentication

- **Login/Register** (`/auth`) - User authentication
- **Verify Order** (`/verify-order`) - Payment verification

## 🎯 Key Features Implementation

### State Management

\`\`\`typescript
// Redux store with RTK Query
const store = configureStore({
reducer: {
auth: authSlice,
cart: cartSlice,
api: apiSlice,
},
})
\`\`\`

### Authentication Flow

\`\`\`typescript
// JWT token verification and user management
const user = verifyToken(accessToken)
dispatch(setUser({ user, token: accessToken }))
\`\`\`

### API Integration

\`\`\`typescript
// RTK Query for efficient data fetching
const { data: books, isLoading } = useGetAllProductsQuery(params)
\`\`\`

## 🔐 Authentication & Security

- **JWT Tokens**: Secure authentication with access tokens
- **Protected Routes**: Role-based access control
- **Input Validation**: Client-side and server-side validation
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Secure cross-origin requests

## 📊 Admin Dashboard Features

- **Sales Analytics**: Revenue tracking and growth metrics
- **User Management**: User statistics and account management
- **Inventory Control**: Stock levels and product management
- **Order Processing**: Order fulfillment and status updates
- **Data Visualization**: Interactive charts and graphs

## 🎨 UI Components

Built with shadcn/ui for consistent, accessible design:

- **Forms**: Input fields, selects, checkboxes, and validation
- **Navigation**: Responsive navigation with mobile menu
- **Data Display**: Tables, cards, and lists
- **Feedback**: Alerts, toasts, and loading states
- **Layout**: Responsive grid system and containers

## 🚀 Deployment

### Build for Production

\`\`\`bash
npm run build
\`\`\`

### Deploy to Vercel

\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

### Deploy to Netlify

\`\`\`bash
npm run build

# Upload dist/ folder to Netlify

\`\`\`

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**
   \`\`\`bash
   git checkout -b feature/amazing-feature
   \`\`\`
3. **Commit your changes**
   \`\`\`bash
   git commit -m 'Add some amazing feature'
   \`\`\`
4. **Push to the branch**
   \`\`\`bash
   git push origin feature/amazing-feature
   \`\`\`
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide](https://lucide.dev/) for the icon library
- [Recharts](https://recharts.org/) for data visualization
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

## 🗺️ Roadmap

- [ ] Mobile app development (React Native)
- [ ] Advanced recommendation engine
- [ ] Social features (reviews, ratings, discussions)
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Integration with external book APIs
- [ ] Subscription service for book clubs
- [ ] E-book reader integration

---

**Made with ❤️ by the BookStore Team**

[Live Demo](https://book-shop-three-eta.vercel.app)
