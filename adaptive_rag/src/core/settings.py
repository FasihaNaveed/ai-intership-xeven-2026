from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    GROQ_API_KEY: str
    MODEL_NAME: str
    EMBEDDING_MODEL: str

    CHUNK_SIZE: int
    CHUNK_OVERLAP: int

    VECTOR_DB_PATH: str
    LOG_LEVEL: str

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()