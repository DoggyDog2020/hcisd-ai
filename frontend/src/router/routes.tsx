import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { TeacherDashboard } from '../features/teacher/Dashboard/Dashboard'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'teacher',
        element: (
          <ProtectedRoute allowedRoles={['Teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        )
      }
    ]
  }
]);