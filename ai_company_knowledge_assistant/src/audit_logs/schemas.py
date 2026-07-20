from datetime import datetime

from pydantic import BaseModel


class AuditLogResponse(BaseModel):
    id: int
    user_name: str
    action: str
    resource: str
    created_at: datetime

    class Config:
        from_attributes = True