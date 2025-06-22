import { CircleLoader } from "react-spinners";
import { Suspense } from "react";

export default function Layout({ children }) {
  return (
    <div className="px-5 container mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense
        fallback={
          <div className="h-[100vh] flex items-center justify-center">
            <CircleLoader color="white" />
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
