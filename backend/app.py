from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
import os

app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# Initialize CORS
CORS(app)

# Initialize database
db.init_app(app)

# Create tables
with app.app_context():
    db.create_all()

# Register blueprints
from controllers.project_controller import project_bp
from controllers.page_controller import page_bp
from controllers.export_controller import export_bp
from controllers.material_controller import material_bp
from controllers.template_controller import template_bp
from controllers.file_controller import file_bp
from controllers.reference_file_controller import reference_file_bp

app.register_blueprint(project_bp)
app.register_blueprint(page_bp)
app.register_blueprint(export_bp)
app.register_blueprint(material_bp)
app.register_blueprint(template_bp)
app.register_blueprint(file_bp)
app.register_blueprint(reference_file_bp)

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/api/health")
def api_health():
    return {"status": "healthy", "message": "API is running"}

if __name__ == "__main__":
    print("Starting Banana Slides backend...")
    app.run(host="0.0.0.0", port=5000, debug=os.getenv('FLASK_DEBUG', 'False') == 'True')
