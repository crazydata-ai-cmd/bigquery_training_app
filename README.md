# BigQuery Training Workshop

A comprehensive, interactive web application designed to teach Google BigQuery concepts, ranging from foundational architecture to advanced AI integration.

## 📚 Curriculum Overview

This workshop is broken down into 6 key sessions, each covering critical aspects of BigQuery:

- **Session 1: BigQuery Foundations**
  - Architecture (Colossus, Borg, Dremel, Jupiter)
  - Storage Physics (Capacitor, Row vs Columnar) & Table Types
  - Partitioning, Clustering, and Nested Fields (Structs & Arrays)

- **Session 2: Ingestion & Query Lifecycle**
  - Ingestion Strategies (Batch vs Streaming)
  - Query Execution Graph & Slot Management
  - Advanced SQL: Window Functions, UDFs, and JOIN Optimizations
  - BI Engine & Smart Caching

- **Session 3: Explore & Analyze**
  - BI Tool Integration & Data Profiling
  - BigQuery DataFrames (Pandas/Scikit-learn)
  - Gemini for BigQuery (SQL Generation, Python, CLI)
  - Data Canvas & Conversational Analytics

- **Session 4: Governance at Scale**
  - IAM Hierarchy & Granular Security (Row/Column-Level)
  - Data Sharing (Analytics Hub, Clean Rooms)
  - CI/CD & Orchestration (Data Pipelines, Dataform, Git Integration)

- **Session 5: Cost & Performance Management**
  - Pricing Models (On-Demand vs Editions)
  - Capacity Planning (Reservations, Autoscaling)
  - Monitoring & Optimization (Information Schema, Dry Runs)

- **Session 6: The AI Data Cloud**
  - BigQuery ML (BQML) for Predictive Models
  - Remote Models & Gemini 3.0 Integration
  - Vector Search & RAG Architectures

- **Appendix: Power BI Integration**
  - Connectivity Architecture (DirectQuery vs Import)
  - Security (Workforce Identity Federation, RLS)
  - Performance Optimization (Partitioning, BI Engine, Query Folding)

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
├── .gitignore              # Git ignore file
├── app.py                  # Main Flask application entry point
├── requirements.txt        # Python dependencies
├── static/                 # CSS, Images, and Javascript assets
│   ├── css/
│   ├── images/
│   └── js/
└── templates/              # HTML Templates for each session
    ├── index.html          # Landing page
    └── sessions/
        ├── intro.html          # Introduction
        ├── session1.html       # Foundations
        ├── session2.html       # SQL Dialect
        ├── session_explore.html # Explore & Analyze
        ├── session3.html       # Governance
        ├── session4.html       # Cost Management
        ├── session5.html       # AI & ML
        └── appendix_powerbi.html
```

## 🛠️ Technology Stack
- **Backend:** Flask (Python)
- **Frontend:** HTML5, CSS3 (Custom), JavaScript
- **Styling:** Custom responsive design with Prism.js for code highlighting.
