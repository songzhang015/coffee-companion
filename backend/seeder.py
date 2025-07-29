from models import User, Entry
from werkzeug.security import generate_password_hash

def seed_db(db):  
    # Create sample users
    users = [
        User(email="user1@example.com", password=generate_password_hash("password123")),
        User(email="user2@example.com", password=generate_password_hash("password123")),
        User(email="user3@example.com", password=generate_password_hash("password123")),
    ]
    
    # Create sample entries
    entries = [
        Entry(
            title="Sunrise Pour Over",
            date="07/01/2025",
            roastLevel="Light",
            coffeeAmount="20g",
            waterTemp="93°C",
            waterAmount="320ml",
            grindSize="Medium",
            brewTime="3:00",
            notes="Bright acidity with subtle floral notes. Crisp finish.",
            aroma=4,
            texture=3,
            flavor=5,
            acidity=4
        ),
        Entry(
            title="Afternoon Espresso",
            date="07/05/2025",
            roastLevel="Dark",
            coffeeAmount="18g",
            waterTemp="92°C",
            waterAmount="60ml",
            grindSize="Fine",
            brewTime="0:30",
            notes="Bold and rich, slight bitterness. Deep chocolate aftertaste.",
            aroma=5,
            texture=4,
            flavor=4,
            acidity=2
        ),
        Entry(
            title="Weekend V60",
            date="07/07/2025",
            roastLevel="Medium",
            coffeeAmount="22g",
            waterTemp="94°C",
            waterAmount="350ml",
            grindSize="Medium-fine",
            brewTime="2:45",
            notes="Balanced body with smooth texture. Mild citrus notes.",
            aroma=3,
            texture=4,
            flavor=4,
            acidity=3
        ),
    ]

    for user in users:
        db.session.add(user)
    for entry in entries:
        db.session.add(entry)
    
    db.session.commit()