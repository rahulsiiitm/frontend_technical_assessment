# VectorShift Frontend Technical Assessment
### Developed by Rahul Sharma

A powerful, node-based Pipeline Builder application built with **React**, **React Flow**, and **FastAPI**. This tool allows users to visually design AI pipelines, create dynamic variable connections, and validate the graph structure (DAG detection).

## Features

### Core Functionality
- **Drag & Drop Interface:** Intuitive canvas to organize and connect nodes.
- **9 Custom Node Types:**
  - **Inputs/Outputs:** `Input`, `Output`
  - **Logic:** `LLM`, `Text`, `Filter`, `Transform`
  - **Data & APIs:** `Database`, `API`, `Sticky Note`
- **Dynamic Handles:** Typing `{{ variableName }}` in a Text Node automatically creates a new input handle for that variable.
- **Pipeline Validation:** Clicking "Submit" sends the graph to a **Python/FastAPI** backend to check if the pipeline is a valid **Directed Acyclic Graph (DAG)** or contains cycles.

### UI/UX Design
- **"Cosmic" Dark Theme:** A premium aesthetic using deep violet gradients, glassmorphism, and neon accents.
- **Interactive Elements:** Glowing nodes, animated connections, and smooth modal transitions.
- **Responsive Layout:** A clean, horizontal toolbar that maximizes canvas space.

## Tech Stack

- **Frontend:** React.js, React Flow, Zustand (State Management), CSS Modules.
- **Backend:** Python, FastAPI, Pydantic.
- **Styling:** Pure CSS with CSS Variables for theming.

---

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)

### 1. Frontend Setup
Navigate to the project root directory:
```bash
# Install dependencies
npm install

# Start the development server
npm start