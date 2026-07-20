from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import get_db
from src.analytics.schemas import DashboardStatsResponse
from src.analytics.services import AnalyticsService

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)


@router.get(
    "/dashboard",
    response_model=DashboardStatsResponse
)
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db)
):
    return await AnalyticsService.get_dashboard_stats(db)