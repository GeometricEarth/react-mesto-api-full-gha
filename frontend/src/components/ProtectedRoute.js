import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ element: Component, isLoggedIn, ...props }) {
  return isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />;
}
