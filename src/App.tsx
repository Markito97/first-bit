import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./routes/router";
import { Suspense } from "react";
import ErrorBoundary from "./components/ErroBoundary/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<></>}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
