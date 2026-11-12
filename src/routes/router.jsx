import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import { PublicOnlyRoute } from "@/routes/PublicOnlyRoute";
import { AppShell } from "@/components/layout/AppShell";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import HomePage from "@/pages/HomePage";
import BudgetsPage from "@/pages/BudgetsPage";
import CreateBudgetPage from "@/pages/CreateBudgetPage";
import EditBudgetPage from "@/pages/EditBudgetPage";
import PlaceholderPage from "@/pages/PlaceholderPage";

// `handle.title` feeds the breadcrumb in the top bar.
export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [
      { path: ROUTES.login, element: <LoginPage /> },
      { path: ROUTES.register, element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppShell />,
        children: [
          {
            path: ROUTES.home,
            element: <HomePage />,
            handle: { title: "Home" },
          },
          {
            path: ROUTES.budgets,
            element: <BudgetsPage />,
            handle: { title: "Budgets" },
          },
          {
            path: ROUTES.budgetNew,
            element: <CreateBudgetPage />,
            handle: { title: "Budgets" },
          },
          {
            path: ROUTES.budgetEditPattern,
            element: <EditBudgetPage />,
            handle: { title: "Budgets" },
          },
          {
            path: ROUTES.transactions,
            element: <PlaceholderPage title="Transactions" />,
            handle: { title: "Transactions" },
          },
          {
            path: ROUTES.savings,
            element: <PlaceholderPage title="Savings" />,
            handle: { title: "Savings" },
          },
        ],
      },
    ],
  },
  { path: "*", element: <Navigate to={ROUTES.home} replace /> },
]);
