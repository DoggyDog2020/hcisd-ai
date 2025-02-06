import { useEffect, useState } from 'react';
import { auth } from './services/firebase/firebase';
import { getUserRole } from './services/firebase/user';
import { SignIn } from './features/auth/SignIn';
import { TeacherDashboard } from './features/teacher/Dashboard/Dashboard';
import './App.css';

function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      console.log('Auth state changed:', user?.email);
      setUser(user);
      setError(null);

      try {
        if (user?.email) {
          console.log('Checking role for:', user.email);
          const userRole = await getUserRole(user.email);
          console.log('User role:', userRole);
          setRole(userRole);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error('Error checking user role:', error);
        setError('Error verifying user access');
        setRole(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    );
  }

  if (!user) {
    return <SignIn />;
  }

  // Route to appropriate dashboard based on role
  switch (role?.toLowerCase()) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <div>Student Dashboard Coming Soon</div>;
      case 'admin':
        return (
          <div className="admin-view">
            <h2>Admin Dashboard Coming Soon</h2>
            <button onClick={() => auth.signOut()}>Sign Out</button>
          </div>
        );      
    case 'parent':
      return <div>Parent Dashboard Coming Soon</div>;
    default:
      return (
        <div className="error-container">
          <h2>Access Error</h2>
          <p>Your account ({user.email}) is not authorized for this application.</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
        </div>
      );
  }
}

export default App;
