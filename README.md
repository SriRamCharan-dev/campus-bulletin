# Campus Bulletin

A modern, full-stack web application for managing campus announcements and events. Built with Node.js, Express, and MySQL, featuring a beautiful glass-morphism UI design.

## 🌐 Live Demo

**[https://campus-bulletin-production.up.railway.app/login](https://campus-bulletin-production.up.railway.app/login)**

## ✨ Features

- **User Authentication**: Secure signup and login system
- **Announcement Management**: Create, read, update, and delete campus announcements
- **Event Tracking**: Add event dates, venues, and categories
- **Interest Counter**: Students can mark interest in events
- **Role-Based Views**: Separate interfaces for admins and regular users
- **Responsive Design**: Beautiful glass-morphism UI that works on all devices
- **Real-time Updates**: Live database integration with MySQL

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Template Engine**: EJS
- **Styling**: Custom CSS with glass-morphism design
- **Deployment**: Railway
- **Version Control**: Git & GitHub

## 📦 Installation

### Prerequisites

- Node.js (v20.0.0 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/SriRamCharan-dev/campus-bulletin.git
   cd campus-bulletin
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   PORT=8080
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=announcements
   DB_PORT=3306
   ```

4. **Start the application**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

5. **Access the application**
   
   Open your browser and navigate to: `http://localhost:8080/login`

## 🗄️ Database Schema

The application creates two tables automatically:

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

### Notices Table
```sql
CREATE TABLE notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(255),
  event_date DATE,
  venue VARCHAR(255),
  roles VARCHAR(255),
  interested_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment (Railway)

This project is deployed on [Railway](https://railway.app/). Follow these steps to deploy your own instance:

1. **Create a new Railway project**
   - Add a MySQL service
   - Add a Node.js service from your GitHub repository

2. **Configure environment variables** in your Node.js service:
   ```
   DB_HOST=<Railway Public MySQL Host>
   DB_PORT=<Railway Public MySQL Port>
   DB_USER=${{MySQL.MYSQLUSER}}
   DB_PASSWORD=${{MySQL.MYSQLPASSWORD}}
   DB_NAME=${{MySQL.MYSQLDATABASE}}
   PORT=8080
   ```

3. **Generate a public domain** in the Node.js service settings

4. **Deploy** - Railway will automatically build and deploy your application

## 📁 Project Structure

```
campus-bulletin/
├── public/
│   └── style.css          # Global styles with glass-morphism design
├── views/
│   ├── index.ejs          # Admin dashboard
│   ├── users.ejs          # Student dashboard
│   ├── login.ejs          # Login page
│   ├── signup.ejs         # Registration page
│   ├── new.ejs            # Create announcement
│   ├── edit.ejs           # Edit announcement
│   └── delete.ejs         # Delete confirmation
├── index.js               # Main application file
├── package.json           # Dependencies and scripts
├── Procfile               # Railway deployment config
├── .env                   # Environment variables (not in repo)
├── .gitignore             # Git ignore rules
└── README.md              # Project documentation
```

## 🎨 Design Features

- **Glass-morphism UI**: Modern, translucent card designs with backdrop blur
- **Gradient Backgrounds**: Dynamic color schemes for visual appeal
- **Smooth Animations**: Hover effects and transitions for better UX
- **Responsive Layout**: Mobile-first design approach
- **Custom Typography**: Clean, readable fonts throughout

## 🔒 Security Notes

- Passwords are currently stored in plain text (for development)
- **TODO**: Implement bcrypt hashing before production use
- **TODO**: Add session management with express-session
- **TODO**: Implement CSRF protection
- Environment variables are used to protect database credentials

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👤 Author

**Sriramcharan**

- GitHub: [@SriRamCharan-dev](https://github.com/SriRamCharan-dev)

## 🙏 Acknowledgments

- Railway for hosting
- MySQL for database management
- Express.js community for excellent documentation

---

**Built with ❤️ for campus communities**
