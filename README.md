# 🛒 eCommerce Website Clone - Product Listing App (inspired by eBay, Facebook Marketplace etc)

A simple e-commerce frontend built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It fetches products from the [DummyJSON API](https://dummyjson.com/) and allows users to browse, filter, and view individual product details.

---

## 🚀 Features

- 🛍️ Product grid with images, titles, and prices
- 🔍 Search and keyword filtering
- 🧩 Category selection using radio buttons
- 💰 Price range filter
- 📦 Pagination
- 📄 Dedicated product detail page
- ⚛️ Context API for global filter state
- 🧼 Reset filter functionality

---

## 📁 Project Structure

src/
│
├── components/
│ ├── Sidebar.tsx # Filters and search
│ ├── MainContent.tsx # Product grid with pagination
│ ├── ProductPage.tsx # Product details
│ ├── BookCard.tsx # Individual product card
│
├── context/
│ └── FilterContext.tsx # Context provider for filters
│
├── App.tsx # Routes and layout
├── main.tsx # Root rendering with providers
├── index.css # Tailwind CSS

yaml
Copy
Edit

---

## 🧪 API Used

- **DummyJSON** – `https://dummyjson.com/products`

Example endpoints:
- `GET /products` — list of products
- `GET /products/search?q=term`
- `GET /products/:id` — single product

---

🔧 Tech Stack
⚛️ React + TypeScript

⚡ Vite

💨 Tailwind CSS

🌐 Axios

📦 React Router DOM

🎯 Context API

🎯 Future Improvements
Add cart functionality

User login/auth

Sorting by date or brand

Real API integration

📄 License
This project is open-source and available under the MIT License.
