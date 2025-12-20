# VectorShift Frontend Technical Assessment
### Submitted by: Rahul Sharma

A full-stack Pipeline Builder application that allows users to visually design, connect, and validate AI workflows. The project consists of a React-based frontend for the visual interface and a FastAPI backend for graph processing and validation.

---

## Project Overview

This application serves as a "No-Code" interface for building LLM pipelines. Users can drag nodes onto a canvas, connect them to define logic, and submit the pipeline to the backend to ensure it is a valid **Directed Acyclic Graph (DAG)**.

### Key Features
- **Visual Pipeline Builder:** Drag-and-drop interface using React Flow.
- **9 Custom Node Types:**
  - **Inputs:** `Input`, `File`
  - **Logic:** `LLM`, `Text`, `Filter`, `Transform`
  - **Data:** `Database`, `API`, `Sticky Note`
- **Dynamic Handles:** Typing `{{ variable }}` in a Text node automatically generates connectable input handles.
- **DAG Validation:** Real-time backend validation to detect cycles (infinite loops) in the pipeline.
- **"Cosmic" UI:** A custom-styled dark theme with glassmorphism and neon effects.

---

##  Tech Stack

### Frontend
- **Framework:** React.js
- **Library:** React Flow
- **State Management:** Zustand
- **Styling:** CSS Modules, CSS Variables

### Backend
- **Framework:** FastAPI (Python)
- **Server:** Uvicorn
- **Validation:** Pydantic

---

## Setup & Installation

### 1. Backend Setup (Python)

```bash
cd backend
pip install fastapi uvicorn
python -m uvicorn main:app --reload
```

Backend runs at: http://127.0.0.1:8000

### 2. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend runs at: http://localhost:3000

---

## How to Use

- **Add Nodes:** Drag nodes from the toolbar onto the canvas.
- **Connect Nodes:** Link source handles to target handles.
- **Dynamic Variables:**  
  Type `{{ myVariable }}` inside a Text node to auto-generate input handles.
- **Submit & Validate:**  
  Click **Submit Pipeline** to validate DAG structure.

---

## Directory Structure

```
/
├── backend/
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── nodes/
│   │   ├── ui.js
│   │   ├── store.js
│   │   ├── submit.js
│   │   ├── index.js
│   │   ├── toolbar.js
│   │   ├── utils.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── package-lock.json
└── README.md
```

---

Developed for the **VectorShift Technical Assessment**.
