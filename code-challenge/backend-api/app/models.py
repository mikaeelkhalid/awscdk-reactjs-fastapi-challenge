from sqlalchemy import Column, Integer, String, Text

from database import Base


class PhoneNo(Base):
    __tablename__ = "phone_records"

    id = Column(Integer, primary_key=True, index=True)
    task_id = Column(String, unique=True, index=True)
    phone_numbers = Column(Text)
