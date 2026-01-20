# 🏫 Ujala School Management System

Developed a full-stack web application for managing school operations and records. Built a MERN-based system enabling student and teacher management, fee tracking, sponsorships/donations management, and certificate handling through role-based access control and RESTful APIs. Implemented a React dashboard UI (AdminLTE-based) with authentication, CRUD workflows, and reporting-style views.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=000000)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

**Backend:** Node.js • Express.js • MongoDB • Mongoose • JWT Auth • RESTful API  
**Frontend:** React (Create React App) • React Router • Redux • Axios • AdminLTE • Bootstrap

## Key Challenges

• Implementing role-based authentication/authorization (Admin / Student / Finance)  
• Designing MongoDB schemas for school records (fees, sponsorships, donations, certificates)  
• Maintaining consistent CRUD workflows across multiple modules (students, teachers, donors, sponsors, classes)  
• Integrating image upload configuration (Cloudinary URL + upload preset)  
• Building an admin dashboard UI with reusable layout/components

## Key Outcomes

✓ Role-based login implemented for Admin, Student, and Finance users  
✓ REST API route modules for school operations (auth, students, teachers, fees, donors, sponsors, donations, sponsorships, classes, certificates)  
✓ React dashboard UI with multiple modules and reusable components  
✓ CRUD operations for core entities (Students, Teachers, Classes, Donors, Sponsors)  
✓ Financial tracking flows for fees, donations, and sponsorships  
✓ Certificate workflow support (Leaving Certificate)

---

## Project Structure

```
UjalaSchoolManagementWebsite/
├── server/                        # Node.js/Express backend
│   ├── app/
│   │   ├── controllers/           # Request handlers
│   │   ├── middleware/            # Auth middleware
│   │   ├── models/                # MongoDB schemas
│   │   ├── routes/                # API endpoints
│   │   └── utils/                 # Helpers (e.g., token)
│   └── index.js                   # Server entry point
├── client/                        # React frontend (Create React App)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── screens/
│       └── services/              # API service wrappers
├── package.json                   # Root scripts (dev, server, client)
└── Procfile                       # (present, but deployment not documented here)
```

## Getting Started

### Prerequisites

- Node.js (v14.x recommended — see `package.json` engines)
- npm
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd UjalaSchoolManagementWebsite
```

2. **Install root dependencies**

```bash
npm install
```

3. **Install client dependencies**

```bash
cd client
npm install
```

### Environment Variables

Create a `.env` file in the project root (same level as `package.json`) and set:

```env
MONGO_URI=your_mongodb_connection_string_here
CLOUDINARY_URL=your_cloudinary_url_here
CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset_here
```

### Running the Project

1. **Run backend + frontend together (recommended)**

```bash
cd UjalaSchoolManagementWebsite
npm run dev
```

2. **Or run backend only**

```bash
npm run server
```

3. **Or run frontend only**

```bash
cd client
npm start
```

### Default Ports

- Backend API: `5000`
- Frontend (React): `3000`

### Note for Windows Users

The React start/build scripts include `--openssl-legacy-provider` for compatibility. If you hit OpenSSL errors, use Node.js v14–v16 or adjust `NODE_OPTIONS` as needed.
