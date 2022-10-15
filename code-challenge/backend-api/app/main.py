from fastapi import FastAPI, Depends, UploadFile, File, Form
from cleaning import cleaning_data
from get_phone_numbers import get_match_numbers
from remove_duplicate import remove_dup
import json
import models
from sqlalchemy.orm import Session
from database import SessionLocal, engine
from models import PhoneNo
import uuid
from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def home():

    res = {
        "code": 200,
        "message": "All good!"
    }

    return res


@app.post("/api/upload-file")
async def upload_file_and_read(file: UploadFile = File(...), db: Session = Depends(get_db)):

    res = {}

    de_phone_no = PhoneNo()

    try:
        f = await file.read()

        response = f.decode()

        data = cleaning_data(response)

        matched_phones = get_match_numbers(data)

        final_data = remove_dup(matched_phones)

        json_data = json.dumps(final_data)

        de_phone_no.phone_numbers = json_data

        de_phone_no.task_id = str(uuid.uuid4())

        db.add(de_phone_no)

        db.commit()

        res = {
            "code": 200,
            "task_id": de_phone_no.task_id
        }
    except:
        res = {
            "code": 500,
            "message": "Parsing unsuccessfull"
        }

    return res


@app.post("/api/get-file-result")
async def get_file_result(taskId: str = Form(), db: Session = Depends(get_db)):
    res = {}

    try:
        data = db.query(PhoneNo).filter(PhoneNo.task_id == taskId).first()

        if data:
            res = {
                "code": 200,
                "data": {
                    "phone_numbers": json.loads(data.phone_numbers),
                    "task_id": data.task_id,
                    "id": data.id
                }
            }
        else:
            res = {
                "code": 404,
                "data": {
                    "message": "Record not found against '{}' task id.".format(taskId),
                }
            }

    except:
        res = {
            "code": 500,
            "message": "Something went wrong while fetching record"
        }

    return res


@app.delete("/api/delete-record")
async def delete_record(taskId: str = Form(), db: Session = Depends(get_db)):
    res = {}

    try:
        data = db.query(PhoneNo).filter(PhoneNo.task_id == taskId).first()

        if data:
            db.delete(data)
            db.commit()

            res = {
                "code": 204,
                "data": {
                    "message": "Record with '{}' task id successfully deleted".format(data.task_id)
                }
            }

        else:
            res = {
                "code": 404,
                "data": {
                    "message": "Record with '{}' task id not found".format(taskId),
                }
            }

    except:
        res = {
            "code": 500,
            "message": "Something went wrong while deleting record"
        }

    return res


@app.get("/api/get-task-ids")
async def get_task_ids(db: Session = Depends(get_db)):
    res = {}

    try:
        data = db.query(PhoneNo.task_id).all()

        if data:

            res = {
                "code": 200,
                "data": {
                    "message": "Task IDs successfully fetched",
                    "task_ids": data
                }
            }

        else:
            res = {
                "code": 404,
                "data": {
                    "message": "No Task IDs found",
                }
            }

    except:
        res = {
            "code": 500,
            "message": "Something went wrong while deleting record"
        }

    return res
