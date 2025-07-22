from models import User

def seed_db(db):  
    # Create sample users
    users = [
        User(username="user1", email="user1@example.com", password="password123"),
        User(username="user2", email="user2@example.com", password="password123"),
        User(username="user3", email="user3@example.com", password="password123"),
        User(username="user4", email="user4@example.com", password="password123"),
        User(username="user5", email="user5@example.com", password="password123")
    ]
    
    for user in users:
        db.session.add(user)
    
    db.session.commit()