# Badge Reader Web App

Badge Reader Web App is a web application designed to manage and track badges using a simple interface. It includes features for badge creation, modification, and scanning.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Sketchapp Notes](#sketchapp-notes)

## Features

- **Badge Management:**
  - Create, modify, and delete badges.
  - Retrieve a list of all badges or a specific badge by ID.

- **Admin Authentication:**
  - Secure admin login with authentication token.

- **Real-time Badge Scanning:**
  - WebSocket integration for real-time badge scanning.

## Installation

**1. Clone the repository:**

```bash
git clone https://github.com/your-username/badge-reader-web-app.git
```
**2. Navigate to the project directory:**

```bash
cd badge-reader-web-app
```
**3. Install dependencies:**

- **API**
```bash
cd ./badge-reader-api npm install
```
- **Client**
```bash
cd ./badge-reader-client npm install
```

**4. Configure API:**

- Edit badge-reader-api/config/api.json to set the API host and port.
- Edit badge-reader-api/config/jwt.json to set the jwt secret.
- Edit badge-reader-api/config/database.json to set the database host and port.
- Edit badge-reader-api/config/client.json to set the client host and port.

**5. Conifigure Client:**

- Edit badge-reader-client/config/api.json to set the API host and port.


## Usage
Start the API server:

```bash
cd ./badge-reader-api && npm start
```
The API will be accessible at http://localhost:8000 by default.

Start the React App (Client):

```bash
cd ./badge-reader-client && npm start
```

The React App will be accessible at http://localhost:3000 by default.

Now everything sould be running correctly

## Sketchapp Notes

[https://sketchboard.me/RD7VguUGMzDJ?](https://sketchboard.me/RD7VguUGMzDJ?)
