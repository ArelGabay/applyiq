from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers.analysis_controller import router as analysis_router
from app.controllers.health_controller import router as health_router


def create_app() -> FastAPI:
    app = FastAPI(title="ApplyIQ API", version="0.1.0")

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "http://localhost:3001",
            "https://applyiq-arel.vercel.app",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(health_router)
    app.include_router(analysis_router)
    return app


app = create_app()
