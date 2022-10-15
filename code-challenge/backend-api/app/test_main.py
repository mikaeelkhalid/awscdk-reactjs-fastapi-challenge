from fastapi.testclient import TestClient

from .main import app

client = TestClient(app)


def test_home():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "All good!"}


def test_upload_file_and_read():
    response = client.post(
        "/api/upload-file",
        headers={'Content-Type': 'multipart/form-data'},
        json={"file": "foobar"},
    )
    assert response.status_code == 200
    assert response.json() == {
        "code": 200,
        "task_id": "de_phone_no.task_id"
    }
