# EcoPlate 🌍🍽️

**EcoPlate** is a full-stack web application designed to bridge the gap between food donors (restaurants, caterers) and food recipients (NGOs, shelters). It facilitates the real-time redistribution of surplus food to reduce waste and hunger.

## 🚀 Features

* **Role-Based Authentication:** Secure login/signup for Donors and NGOs.
* **Donor Dashboard:** Easy-to-use form for restaurants to post food details (quantity, expiry, type).
* **Real-Time Feed:** NGOs see available food instantly and can "Claim" it to prevent double-booking.
* **Status Tracking:** Visual indicators for 'Available' vs 'Claimed' items.
* **Cloud Database:** All data is persisted securely in MongoDB Atlas.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Tailwind CSS, Lucide React (Icons)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas (Cloud NoSQL)
* **Deployment:** Vercel (Frontend), Render (Backend)

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/ecoplate.git](https://github.com/your-username/ecoplate.git)
    cd ecoplate
    ```

2.  **Setup Backend**
    ```bash
    cd Backend
    npm install
    # Create a .env file and add your MONGO_URI
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd Frontend/eco-plate
    npm install
    npm run dev
    ```

## 🔮 Future Improvements

* **Geo-Location:** Sort listings by distance using MongoDB `$near`.
* **Notifications:** Email alerts via SendGrid when food is claimed.
* **Image Upload:** Allow donors to upload photos of the food using AWS S3.
