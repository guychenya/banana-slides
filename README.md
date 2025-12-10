+# Banana Slides
+
+Vibe your PPT like vibing code.
+
+A native AI-powered PPT generator based on nano banana pro 🍌. Generate full decks from idea/outline/page descriptions, auto-extract text and image links, upload any material, and edit via natural-language “Vibe” commands—towards a true “Vibe PPT”.
+
+If this project helps you, please consider starring 🌟 and forking 🍴.
+
+- English | [中文版 README](./README_CN.md)
+
+## 🎯 Goal
+
+Lower the barrier to creating PPTs so anyone can quickly produce beautiful, professional presentations.
+
+## ✨ Motivation
+
+Traditional AI PPT generators are fast but often:
+- Rigid templates; limited style flexibility
+- Low freedom; hard to iterate multiple rounds
+- Homogeneous outputs; similar look and feel
+- Generic materials; lack specificity
+- Disjoint text-image layouts; weak design quality
+
+nano banana pro 🍌 yields high-quality, aesthetic, and consistent slides, accurately following prompts and style references. So we built a native “Vibe PPT” app on top of it.
+
+## 👨💻 Use Cases
+
+- Beginners: Zero-barrier creation of beautiful PPTs; no design experience needed
+- PPT Pros: Use AI layout and text-image combos to spark design ideas
+- Educators: Convert teaching content into illustrated lesson slides quickly
+- Students: Finish assignments fast; focus on content, not formatting
+- Professionals: Visualize proposals and product intros; adapt quickly across scenarios
+
+## 🎨 Examples
+
+- The evolution of money: From shells to paper currency
+- DeepSeek-V3.2 technical showcase
+- Human impact on the ecosystem
+- Intelligent production line for prepared foods
+
+More examples: See “Examples” in-app.
+
+## 🗺️ Roadmap
+
+- ✅ Create PPT from idea/outline/page description
+- ✅ Parse Markdown image references
+- ✅ Add more materials per slide
+- ✅ Vibe voice edits for selected regions
+- ✅ Material module: generate/upload
+- ✅ Upload/parse multiple file types
+- ✅ Vibe voice adjustments for outline and descriptions
+- 🔄 Element segmentation + inpaint for generated images
+- 🔄 Web search
+- 🔄 Agent mode
+- 🧭 Optimize frontend load speed
+- 🧭 Online presentation
+- 🧭 Simple animations and slide transitions
+- 🧭 Multi-language support
+- 🧭 User system
+
+## 🎯 Features
+
+1. Flexible creation paths
+   - One-line generation: Input a theme, get a clean outline and page descriptions
+   - Natural language edits: Vibe-style commands like “Change page 3 to a case study”
+   - Outline/Description modes: Batch generate or fine-tune manually
+
+2. Powerful material parsing
+   - Multi-format: Upload PDF/Docx/MD/Txt; backend parses automatically
+   - Smart extraction: Key points, image links, chart info
+   - Style references: Upload a reference image/template for custom slide style
+
+3. “Vibe” natural-language edits
+   - Local redraw: “Replace this chart with a pie chart”
+   - Full-page optimization: High-res, consistent pages via nano banana pro 🍌
+
+4. Export-ready formats
+   - Export PPTX or PDF in one click
+   - Default 16:9 ratio for ready-to-present layouts
+
+## 📦 Getting Started
+
+### Using Docker Compose (Recommended)
+
+Windows users: Install Docker Desktop, enable WSL2 backend, and ensure ports 3000 and 5000 are free.
+
+1) Clone
+```
+git clone https://github.com/Anionex/banana-slides
+cd banana-slides
+```
+
+2) Configure environment
+```
+cp .env.example .env
+```
+Edit `.env`:
+```
+GOOGLE_API_KEY=your-google-api-key-here
+GOOGLE_API_BASE=https://generativelanguage.googleapis.com
+PORT=5000
+```
+
+3) Start services
+```
+docker compose up -d
+```
+
+4) Access
+- Frontend: [http://localhost:3000](http://localhost:3000)
+- Backend API: [http://localhost:5000](http://localhost:5000)
+
+5) Logs
+```
+docker compose logs -f --tail 50 backend
+docker compose logs -f --tail 50
+docker compose logs -f --tail 50 frontend
+```
+
+6) Stop
+```
+docker compose down
+```
+
+7) Update
+```
+git pull
+docker compose down
+docker compose build --no-cache
+docker compose up -d
+```
+
+### From Source
+
+Requirements:
+- Python 3.10+
+- uv (Python package manager)
+- Node.js 16+ and npm
+- Google Gemini API key
+
+Backend:
+```
+git clone https://github.com/Anionex/banana-slides
+cd banana-slides
+curl -LsSf https://astral.sh/uv/install.sh | sh
+uv sync
+cp .env.example .env
+# edit .env with GOOGLE_API_KEY and GOOGLE_API_BASE
+cd backend
+uv run python app.py
+```
+Verify: [http://localhost:5000/health](http://localhost:5000/health)
+
+Frontend:
+```
+cd frontend
+npm install
+# optional: edit src/api/client.ts for a custom backend URL
+npm run dev
+```
+Access: [http://localhost:3000](http://localhost:3000)
+
+## 🛠 Tech Stack
+
+Frontend: React 18 + TypeScript, Vite 5, Zustand, React Router v6, Tailwind CSS, @dnd-kit, Lucide React, Axios  
+Backend: Python 3.10+, Flask 3.0, uv, SQLite + SQLAlchemy, Google Gemini API, python-pptx, Pillow, ThreadPoolExecutor, Flask-CORS
+
+## 📁 Structure
+
+See the repo tree for `frontend/`, `backend/`, `tests/`, `v0_demo/`, etc.
+
+## 🤝 Contributing
+
+Issues and PRs are welcome.
+
+## 📄 License
+
+MIT
+