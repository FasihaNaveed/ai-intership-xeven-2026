from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200


def test_add_document():
    response = client.post("/documents", json={
        "title": "Test",
        "content": "Testing content"
    })
    assert response.status_code == 200
    assert "id" in response.json()


def test_get_documents():
    response = client.get("/documents")
    assert response.status_code == 200
    assert isinstance(response.json(), list)