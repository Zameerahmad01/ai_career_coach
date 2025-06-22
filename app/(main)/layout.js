import React from "react";

export default function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen pt-24 pb-20 w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] pointer-events-none" />
      {children}
    </div>
  );
}
