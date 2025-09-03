from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey
from typing import Optional, List

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(db.String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(db.String(255), nullable=False)

    entries: Mapped[List["Entry"]] = relationship(back_populates="user")

    def __repr__(self):
        return f"User('{self.email}')"
    
class Entry(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(db.String(100), nullable=False)
    date: Mapped[str] = mapped_column(db.String(10), nullable=False)
    user_id: Mapped[int] = mapped_column(ForeignKey("user.id"))

    aroma: Mapped[int] = mapped_column(nullable=False)
    texture: Mapped[int] = mapped_column(nullable=False)
    flavor: Mapped[int] = mapped_column(nullable=False)
    acidity: Mapped[int] = mapped_column(nullable=False)

    roastLevel: Mapped[Optional[str]] = mapped_column(db.String(100))
    coffeeAmount: Mapped[Optional[str]] = mapped_column(db.String(100))
    waterTemp: Mapped[Optional[str]] = mapped_column(db.String(100))
    waterAmount: Mapped[Optional[str]] = mapped_column(db.String(100))
    grindSize: Mapped[Optional[str]] = mapped_column(db.String(100))
    brewTime: Mapped[Optional[str]] = mapped_column(db.String(100))
    brewMethod: Mapped[Optional[str]] = mapped_column(db.String(100))
    notes: Mapped[Optional[str]] = mapped_column(db.String(1000))
    
    user: Mapped["User"] = relationship(back_populates="entries")