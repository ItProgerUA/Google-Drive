import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAuthStore } from "feature/auth/store/authStore";
import Auth from "feature/auth";
import Layout from "layouts";
import Dashboard from "feature/daschboard";

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? <>{children}</> : <Navigate to="/auth" replace />;
};

const PublicAuthRoute = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const isAuth = useAuthStore((state) => state.isAuth);

  return isAuth ? <Navigate to="/" replace /> : <>{children}</>;
};

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <PublicAuthRoute>
        <Auth />
      </PublicAuthRoute>
    ),
  },
  {
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/folders/:folderId",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 — Page not found</div>,
  },
]);
