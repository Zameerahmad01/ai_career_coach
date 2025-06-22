export default function AuthLayout({ children }) {
  return (
    <div className="flex py-16 h-screen items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
      {children}
    </div>
  );
}
