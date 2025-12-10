from typing import Any, Optional, Dict
from flask import jsonify

def success_response(data: Any = None, message: str = "OK", status_code: int = 200) -> Dict[str, Any]:
    return jsonify({
        "success": True,
        "message": message,
        "data": data
    }), status_code

def error_response(message: str = "Error", code: Optional[str] = None, details: Any = None, status_code: int = 500) -> Dict[str, Any]:
    return jsonify({
        "success": False,
        "message": message,
        "code": code,
        "details": details
    }), status_code

def bad_request(message: str = "Bad Request", details: Any = None) -> Dict[str, Any]:
    return error_response(message, code="BAD_REQUEST", details=details, status_code=400)

def not_found(resource: str = "Resource", message: str = "Not Found", details: Any = None) -> Dict[str, Any]:
    return error_response(f"{resource} {message}", code="NOT_FOUND", details=details, status_code=404)

def invalid_status(message: str = "Invalid Status", details: Any = None) -> Dict[str, Any]:
    return error_response(message, code="INVALID_STATUS", details=details, status_code=400)

def ai_service_error(message: str = "AI Service Error", details: Any = None) -> Dict[str, Any]:
    return error_response(message, code="AI_SERVICE_ERROR", details=details, status_code=503)

def rate_limit_error(message: str = "Rate Limit Exceeded", details: Any = None) -> Dict[str, Any]:
    return error_response(message, code="RATE_LIMIT_EXCEEDED", details=details, status_code=429)