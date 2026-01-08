# 🌙 Midnight Stone: A Digital Culinary Experience

**Midnight Stone** is a basic full-stack online food ordering web interface. It features a live-updating menu for customers and a "Kitchen Command" dashboard for owners to manage trends and orders.

## 🛠️ Tech Stack
- **Frontend:** React + Vite
- **Styling:** CSS3 (Custom Variables & Playfair Display typography)
- **Backend:** Node.js + Express
- **Database:** SQLite3

## 🚀 Features
- **Dynamic Menu:** Categorized items with "House Signatures" that appear based on popularity.
- **Cart Logic:** Real-time quantity management and tax calculations.
- **Kitchen Command:** A split-screen dashboard for owners to approve orders and track item trends.
- **Custom Notifications:** Thematic alert system replacing standard browser pop-ups by using modals to make faux-alerts.

## ⚙️ Installation & Setup

1. **Clone the repository:**
   `git clone https://github.com/vai_04/midnight-stone.git`

2. **Install dependencies:**
   `npm install`

3. **Initialize the Database:**
   Run `node backend/server.cjs` once to seed the initial menu.

4. **Run the App:**
   - Start the Backend: `node backend/server.cjs`
   - Start the Frontend: `npm run dev`
   - Ctrl+Click on the localhost link in the terminal to open the website.

## 📝 Future Scope (Post-Time Constraints)
### While the core machine of Midnight Stone is fully functional, the following features were sidelined to meet the immediate deadline and are prioritized for future development:

i. **Robust Authentication:** The current "Classy Toggle" login is a UI placeholder. Future versions will replace this with JWT (JSON Web Tokens) or Firebase Auth to secure the Owner Dashboard and protect the Repertoire database from unauthorized changes.

ii. **Live Order Tracking:** Once authentication is live, a real-time status bridge (using WebSockets or Socket.io) will allow customers to see when their "Commissions" move from Pending to In the Kitchen or Ready.

iii. **Image Integration:** Transitioning from a minimalist text-only menu to a high-fidelity gallery featuring compressed, lazy-loaded images of the "House Signatures".

## 🖋️ License
This project was created as a poetic and painful (often painful and poetic go hand in hand :) exploration of web architecture.
