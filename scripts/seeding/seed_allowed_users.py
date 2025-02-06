import firebase_admin
from firebase_admin import credentials, firestore, auth
from pathlib import Path
from time import sleep

# Initialize Firebase
cred = credentials.Certificate(Path(__file__).parent / "serviceAccountKey.json")
firebase_admin.initialize_app(cred)

db = firebase_admin.firestore.client()

# User data with roles
users = {
    "admin": [
        "admin@hcisd.org",
        "sonya.brandenburg@hcisd.org",
        "beatrice.cruz@hcisd.org",
        "schawn.wreden@hcisd.org",
        "moises.vargas@hcisd.org",
        "kristal.gracia@hcisd.org",
        "jennifer.maldonado@hcisd.org",
        "bertha.perea@hcisd.org",
        "fernando.reyes@hcisd.org",
        "adriana.arellano@hcisd.org",
        "tina.garza@hcisd.org",
        "jessica.hruska@hcisd.org"
    ],
    "teacher": [
        "teacher@hcisd.org",
        "andres.gonzales@hcisd.org",
        "sadorah.gregory@hcisd.org"
    ],
    "student": ["student@hcisd.org"],
    "parent": ["parent@hcisd.org"]
}

def seed_users():
    # Create Firestore documents
    batch = db.batch()
    allowed_users_ref = db.collection("allowedUsers")
    
    # Delete existing documents
    docs = allowed_users_ref.stream()
    for doc in docs:
        batch.delete(doc.reference)

    # Create users in Firebase Auth and Firestore
    for role, emails in users.items():
        for email in emails:
            try:
                # Create auth user
                auth.create_user(
                    email=email,
                    password='test123',
                    email_verified=True
                )
                
                # Create Firestore document
                doc_ref = allowed_users_ref.document(email)
                batch.set(doc_ref, {
                    "role": role,
                    "dateAdded": firestore.SERVER_TIMESTAMP
                })
                
                print(f"Created {role} user: {email}")
                sleep(0.1)  # Rate limit protection
                
            except Exception as e:
                print(f"Error creating {email}: {str(e)}")

    # Commit Firestore batch
    batch.commit()
    print(f"Successfully seeded {sum(len(v) for v in users.values())} users!")

if __name__ == "__main__":
    seed_users()