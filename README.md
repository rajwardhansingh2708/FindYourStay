
# FindYourStay 🏡

**FindYourStay** is a student accommodation discovery platform designed to help students find and compare PGs, hostels, and student-friendly stays near their colleges.

The goal is to make finding suitable student accommodation easier, more convenient, and more transparent.

## ✨ Features

- 🏠 Browse PGs and hostels
- 🎓 Explore accommodation near colleges
- 🔍 Search and filter accommodation options
- 🛏️ View room types and pricing
- 📍 Explore property locations and details
- 🧾 View amenities and accommodation information
- 🖼️ Upload and display property images
- 🏢 Add and edit property listings
- 🗄️ PostgreSQL database integration
- 🔗 REST API powered by Node.js and Express.js

> FindYourStay is actively under development. Features and workflows may change as the project evolves.

## 🛠️ Tech Stack

### Frontend
- React
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- REST APIs

### Database
- PostgreSQL

### Tools and Services
- Git and GitHub
- Cloudinary for property image storage

## 📁 Project Structure

```text
FindYourStay/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── .gitignore
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
└── README.md
```

## 🚀 Getting Started

Follow these steps to run FindYourStay locally.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/rajwardhansingh2708/FindYourStay.git
cd FindYourStay
```

### 2. Set Up the Database

1. Start PostgreSQL.
2. Create a database named `findyourhostel`.
3. Configure the database connection using environment variables.
4. Set up the required database tables before running the backend.

### 3. Set Up the Backend

Open a terminal in the project root and run:

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the environment variables required by the application.

The configuration may include:

- `PORT`
- `DB_USER`
- `DB_HOST`
- `DB_NAME`
- `DB_PASSWORD`
- `DB_PORT`
- `JWT_SECRET`
- Cloudinary credentials

Use your own local values. Never commit your `.env` file or expose API secrets.

Start the backend using the appropriate script defined in `backend/package.json`.

### 4. Set Up the Frontend

Open another terminal in the project root and run:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## 🔐 Security

- Keep environment variables and API credentials private.
- Never upload `.env` files to GitHub.
- Validate incoming API requests.
- Protect routes that require authentication and authorization.

## 🗺️ Future Improvements

- Advanced accommodation search and filtering
- College-based distance filtering
- Saved properties and favorites
- Improved property comparison
- Property verification workflows
- Student reviews and ratings
- Automated API testing
- Further UI and accessibility improvements

## 🤝 Contributing

Suggestions, bug reports, and improvements are welcome.

For significant changes, consider opening an issue before submitting a pull request.

## 👨‍💻 Author

**Raj Wardhan Singh**

- GitHub: [@rajwardhansingh2708](https://github.com/rajwardhansingh2708)

---

⭐ If you find this project interesting, consider giving the repository a star!
