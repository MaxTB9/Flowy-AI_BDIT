import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./pages/Landing";
import Guest from "./pages/Guest";
import Ops from "./pages/Ops";
import DemoPanel from "./components/DemoPanel";
import PageTransition from "./components/PageTransition";

export default function App() {
  const location = useLocation();
  return (
    <>
      <AnimatePresence mode="wait">
        <PageTransition routeKey={location.pathname}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/guest" element={<Guest />} />
            <Route path="/ops" element={<Ops />} />
          </Routes>
        </PageTransition>
      </AnimatePresence>
      <DemoPanel />
    </>
  );
}
