from models import User

def seed_db(db):  
    # Create sample users
    users = [
        User(email="user1@example.com", password="password123"),
        User(email="user2@example.com", password="password123"),
        User(email="user3@example.com", password="password123"),
        User(email="user4@example.com", password="password123"),
        User(email="user5@example.com", password="password123")
    ]
    
    for user in users:
        db.session.add(user)
    
    db.session.commit()