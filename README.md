# TravelTrucks

TravelTrucks is a web application for a camper rental company. Users can browse available campers, filter them by various criteria, add them to favorites, view detailed information, and make reservations.

## 🚀 Features

- **Camper Listings**: View all available campers.
- **Filtering**: Filter by location, vehicle type, and equipment (AC, kitchen, TV, etc.).
- **Favorites**: Add campers to a favorites list (persisted in localStorage).
- **Detail Page**: View photos, technical specifications, user reviews, and a booking form.
- **Pagination**: Load more campers with a "Load More" button.
- **Reviews**: User reviews with a 5-star rating system.
- **Booking Form**: Reserve a camper with name, email, date, and comment fields (success message displayed).
- **Loading Indicator**: Animated spinner for asynchronous operations.
- **Error Handling**: User-friendly messages for API errors (e.g., 429 Too Many Requests).
- **Responsive Design**: Desktop-first, but mobile-friendly.

## 🛠️ Technologies Used

- **React** (with Vite)
- **Redux Toolkit** (state management)
- **React Router** (routing)
- **Axios** (API requests)
- **CSS Modules** (component-based styling)
- **MockAPI** (backend service)

## 📦 Installation

1. **Clone the repository:**
    ```bash
    git clone git@github.com:MiracSengul/CampersGuide.git

## Install dependencies
    npm install

## Start the development server
    npm run dev