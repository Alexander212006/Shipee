import "../styles/App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="relative flex min-h-screen w-full items-center justify-center bg-zinc-100 px-4">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(212,212,216,0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,212,216,0.20)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_100%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 w-full">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
