# Wedding Planner Admin Dashboard

A professional admin dashboard for managing users, vendors, and wedding packages for a wedding planning application.

## Features

- **Dashboard Overview**: Key metrics and analytics
- **User Management**: View, add, edit, and delete users
- **Vendor Management**: Manage wedding vendors and their services
- **Package Management**: Create and manage wedding packages
- **Responsive Design**: Works on all device sizes
- **Modern UI**: Clean and professional interface

## Technologies Used

- React.js
- React Router
- Recharts for data visualization
- CSS3 for styling
- Vite for fast development

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd dashborad
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. Open your browser and visit:
   ```
   http://localhost:3000
   ```

### Building for Production

To create a production build:
```bash
npm run build
```

## Project Structure

```
dashborad/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── UserManagement.jsx
│   │   ├── VendorManagement.jsx
│   │   └── PackageManagement.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Features Overview

### Dashboard
- Overview of key metrics (users, vendors, packages, revenue)
- Revenue and bookings charts
- Recent activity feed

### User Management
- View all users in a table format
- Filter users by role and status
- Search functionality
- Add, edit, activate/deactivate, and delete users

### Vendor Management
- Manage wedding vendors
- Filter by category and status
- View vendor ratings
- Add, edit, activate/deactivate, and delete vendors

### Package Management
- Create and manage wedding packages
- Filter by category and status
- View package details (price, vendors, bookings)
- Add, edit, activate/deactivate, and delete packages

## Customization

To customize the dashboard:

1. Modify the CSS files in `src/` to change the styling
2. Update the data in each page component to connect to your API
3. Add new features by creating new components in the `components/` directory

## License

This project is licensed under the MIT License.