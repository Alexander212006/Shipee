import "../styles/App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-100 bg-[linear-gradient(to_right,rgba(212,212,216,0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,212,216,0.20)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_42%,transparent_100%)] px-4">
      <Outlet />
    </main>
  );
}

export default App;
