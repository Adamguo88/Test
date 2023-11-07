import React, { Suspense, lazy } from "react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthRouter from "pages/AuthRouter/AuthRouter";
import LoadingAnimation from "components/loading/LoadingAnimation";
const UserHome = lazy(() => import("pages/user/Home"));
const UserIndex = lazy(() => import("pages/user/Index"));
const BackIndex = lazy(() => import("pages/back/Index"));
const BackHome = lazy(() => import("pages/back/BackHome"));
const AddForm = lazy(() => import("pages/back/AddForm/AddForm"));
const SignUpFrom = lazy(() => import("pages/user/SingUpForm"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthRouter />,
    children: [
      {
        index: true,
        element: <UserHome />,
      },
      {
        path: "user",
        element: <UserIndex />,
        children: [
          {
            index: true,
            element: <UserHome />,
          },
          {
            path: "signUpFrom",
            element: <SignUpFrom />,
          },
        ],
      },

      {
        path: "back",
        element: <BackIndex />,
        children: [
          {
            index: true,
            element: <BackHome />,
          },
          {
            path: "addForm",
            element: <AddForm />,
          },
        ],
      },
    ],
  },
]);

export default function AppRouter() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
