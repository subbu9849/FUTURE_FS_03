import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

// Adjust this import to match your actual filename
import LoadingScreen from "@/components/LoadingScreen";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import Pricing from "./pages/Pricing";
import Testimonials from "./pages/Testimonials";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import Admin from "./pages/Admin";

// Adjust to match actual filename
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <CustomCursor />
    <ScrollProgress />
    <Navbar />
    <div className="min-h-screen">{children}</div>
    <Footer />
  </>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => (
  <>{children}</>
);

function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />

          <Route
            path="/about"
            element={
              <AppLayout>
                <About />
              </AppLayout>
            }
          />

          <Route
            path="/services"
            element={
              <AppLayout>
                <Services />
              </AppLayout>
            }
          />

          <Route
            path="/portfolio"
            element={
              <AppLayout>
                <Portfolio />
              </AppLayout>
            }
          />

          <Route
            path="/pricing"
            element={
              <AppLayout>
                <Pricing />
              </AppLayout>
            }
          />

          <Route
            path="/testimonials"
            element={
              <AppLayout>
                <Testimonials />
              </AppLayout>
            }
          />

          <Route
            path="/faq"
            element={
              <AppLayout>
                <FAQ />
              </AppLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <AppLayout>
                <Contact />
              </AppLayout>
            }
          />

          <Route
            path="/booking"
            element={
              <AppLayout>
                <Booking />
              </AppLayout>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Admin />
              </AdminLayout>
            }
          />

          <Route
            path="*"
            element={
              <AppLayout>
                <NotFound />
              </AppLayout>
            }
          />

        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;