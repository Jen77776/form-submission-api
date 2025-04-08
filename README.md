# form-submission-api
# 📄 Form Submission API

A full-stack mini web application that allows university employees to submit receipts for reimbursement. The app includes a React-based form frontend, a Flask RESTful API backend, and data persistence via SQLite.

## Features

-  Submit purchase date
-  Submit amount
-  Provide purchase description
-  Upload a receipt file (e.g. image or PDF)
-  File is stored on the server; form data is saved in SQLite

---

##  Tech Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | React + Axios + Bootstrap  |
| Backend    | Flask (Python) + flask-cors |
| Database   | SQLite             |
| File Upload | Flask + Werkzeug  |

---
---

## Reason for Choosing This Tech Stack

I chose **React + Flask + SQLite** because they together allow rapid development and clean separation of concerns. React provides a responsive, component-based UI that makes form handling intuitive. Flask is lightweight, easy to configure, and ideal for quick API prototyping, especially with `flask-cors` enabling smooth cross-origin communication. SQLite is built into Python and perfect for lightweight apps without requiring setup.

I considered using the preferred stack (.NET + Angular), but chose this stack due to:
- Faster local setup and iteration
- Easier debugging of CORS and file upload issues
- Better alignment with my recent experience

In a production setting, I would consider PostgreSQL for scalability, and perhaps FastAPI or .NET Core for stricter typing and documentation generation. But for this task, Flask + SQLite offered the best balance of speed and structure.

---

## Setup Instructions

###  Backend (Flask)：
Flask server will run at: http://127.0.0.1:5050


```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```
###  Frontend (React)：
React app will run at: http://localhost:3000   
Submits POST request to: http://localhost:5050/api/submit
```bash
cd frontend
npm install
npm start
```
## ⏱ Time Spent

| Task                      | Estimated | Actual |
|---------------------------|-----------|--------|
| Backend (API + DB)        | 1.5 hr    | 1.5 hr |
| Frontend (React Form)     | 1.5 hr    | 2 hr   |
| Debugging (CORS + Ports)  | 0.5 hr    | 2 hr   |
| Testing + Cleanup         | 0.5 hr    | 0.5 hr |
| **Total**                 | ~4 hrs    | ~6 hrs |

## Why this tech stack?
React offers fast UI prototyping and is industry standard.

Flask is lightweight and ideal for small RESTful services.

SQLite is perfect for local development and simplicity.

Axios + Flask + CORS allow smooth integration with modern frontends.

## Challenges & Solutions
1. CORS Preflight Errors (403)
Issue: Browser blocked POST request from React (localhost:3000) to Flask (localhost:5000).

Fix:

Installed and used flask-cors

Replaced CORS(app, origins=...) with CORS(app) for development flexibility

2. Port 5000 conflict (macOS)
Issue: Port 5000 was used by macOS system service (ControlCenter, AirPlay), Flask never received the request.

Fix:

Switched backend to port 5050

Updated frontend axios URL accordingly
##  Code Highlights

- All form fields are validated before submission.
- Backend enforces file presence and type.
- The app uses environment-agnostic solutions (no hardcoded paths).
- The project structure separates frontend and backend cleanly for easy testing and deployment.
