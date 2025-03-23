# Bookshop - E-Commerce Frontend

## 📌 Project Overview
Bookshop is a full-fledged e-commerce system built with **Vite, React, Tailwind CSS, TypeScript, and Ant Design**. It allows users to browse books, add them to their cart, and complete purchases securely using **SurjoPay** for payment processing.

This system includes **role-based authentication**, where admins can manage products, users, and orders, while regular users can shop, track orders, and update their profiles.

## 🚀 Features
### **User Features**
✅ Browse and view product details  
✅ Add products to cart  
✅ Secure checkout with **SurjoPay** integration  
✅ View purchase history and order details  
✅ Change password and update profile  

### **Admin Features**
🔹 Add, update, and delete products  
🔹 Block/unblock users  
🔹 Manage user orders  
🔹 Monitor system activities  

## 🛠️ Technologies Used
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Ant Design
- **State Management:** Redux Toolkit
- **Authentication:** JWT
- **API Handling:** Redux Toolkit Query (RTK Query)
- **Payment Gateway:** SurjoPay

## 📂 Project Structure
```
📦 bookshop-frontend
├── 📂 src
│   ├── 📂 components  # Reusable UI components
│   ├── 📂 pages        # Page views (Home, Product Details, Checkout, etc.)
│   ├── 📂 redux       # Redux state management (cart, authentication, etc.)
│   ├── 📂 api         # API services
│   ├── 📂 assets      # Images and static files
│   ├── 📂 styles      # Global styles and Tailwind configuration
│   ├── App.tsx       # Main app entry point
│   ├── main.tsx      # Vite's entry point
│
├── 📄 index.html
├── 📄 package.json
├── 📄 tailwind.config.js
├── 📄 tsconfig.json
└── 📄 README.md
```

## 🎯 Installation & Setup
To run the project locally, follow these steps:

### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/bookshop.git
cd bookshop
```

### 2️⃣ Install dependencies
```sh
yarn install   # or npm install
```

### 3️⃣ Configure environment variables
Create a `.env` file in the root directory and add:
```
VITE_API_BASE_URL=your_backend_api_url
VITE_SURJOPAY_KEY=your_surjopay_api_key
```

### 4️⃣ Start the development server
```sh
yarn dev   # or npm run dev
```

The app will run on `http://localhost:5173/` (default Vite port).

## ✅ Deployment
To build the project for production:
```sh
yarn build  # or npm run build
```
This generates an optimized production-ready build in the `dist/` folder.

## 📌 Contributing
Feel free to contribute to this project by forking the repository, making changes, and submitting a pull request. 🚀

## 📝 License
This project is open-source and available under the **MIT License**.

---
🔗 **Stay Connected**  
💻 GitHub: [ikhtiaj-arif](https://github.com/ikhtiaj-arif)  
📧 Email: your- md.ikhtiajarif@gmail.com  

