import sys
from pathlib import Path

# Add the project root to the Python path
project_root = Path(__file__).parent.parent.parent
sys.path.append(str(project_root))

from backend.app import app
import serverless_wsgi

def handler(event, context):
    return serverless_wsgi.handle(app, event, context)
