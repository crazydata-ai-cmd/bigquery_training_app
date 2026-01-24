# BigQuery Training Workshop

A comprehensive, interactive web application designed to teach Google BigQuery concepts, ranging from foundational architecture to advanced AI integration.

## 📚 Curriculum Overview

This workshop is broken down into 6 key sessions, each covering critical aspects of BigQuery:

- **Session 1: BigQuery Foundations**
  - Architecture (Colossus, Borg, Dremel, Jupiter)
  - Storage Formats (Capacitor) & Partitioning/Clustering
  - Performance Tuning (Slot utilization, Shuffle)

- **Session 2: The SQL Dialect**
  - Handling Nested & Repeated Data (Arrays & Structs)
  - Advanced JOIN strategies
  - User-Defined Functions (UDFs)

- **Session 3: Explore & Analyze**
  - BI Tool Integration (Looker, Connected Sheets)
  - Data Profiling & Insights
  - BigQuery DataFrames (pandas/scikit-learn)

- **Session 4: Governance at Scale**
  - IAM Hierarchy & Roles
  - Granular Security (Row-Level & Column-Level)
  - Data Sharing (Analytics Hub, Clean Rooms)

- **Session 5: Cost Management**
  - Pricing Models (On-Demand vs Editions)
  - Reservations & Autoscaling
  - `INFORMATION_SCHEMA` Monitoring & Optimization

- **Session 6: BigQuery AI & Machine Learning**
  - BigQuery ML (BQML) for Regression/Classification
  - Remote Models (Gemini Integration)
  - Vector Search & RAG Architectures

## 🚀 Setup Instructions

### Prerequisites
- Python 3.10+ installed
- `pip` (Python package manager)

### 1. Clone the Repository
```bash
git clone <repository-url>
```

### 2. Create a Virtual Environment
It is recommended to run this app in an isolated environment.

**Mac/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
.\venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python app.py
```

The application will start on `http://127.0.0.1:8000/`. Open this URL in your browser to begin the workshop.

## 📂 Project Structure

```
bq_training/
├── app.py                  # Main Flask application entry point
├── requirements.txt        # Python dependencies
├── static/                 # CSS, Images, and Javascript assets
│   ├── css/
│   ├── images/
│   └── js/
└── templates/              # HTML Templates for each session
    ├── index.html          # Landing page
    ├── intro.html          # Introduction
    ├── sessions/
    │   ├── session1.html   # Foundations
    │   ├── session2.html   # SQL Dialect
    │   ├── session_explore.html # Explore & Analyze
    │   ├── session3.html   # Governance
    │   ├── session4.html   # Cost Management
    │   └── session5.html   # AI & ML
    └── appendix_powerbi.html
```

## 🛠️ Technology Stack
- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3 (Custom), JavaScript
- **Styling:** Custom responsive design with Prism.js for code highlighting.
