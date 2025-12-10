def require(value, field_name: str):
    if value is None or (isinstance(value, str) and not value.strip()):
        raise ValueError(f"{field_name} is required")

def positive_int(value, field_name: str):
    if not isinstance(value, int) or value <= 0:
        raise ValueError(f"{field_name} must be a positive integer")

def allowed_file(filename: str, allowed_extensions: set) -> bool:
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions

def validate_project_status(status: str):
    raise NotImplementedError("validate_project_status is not implemented")

def validate_page_status(status: str):
    raise NotImplementedError("validate_page_status is not implemented")