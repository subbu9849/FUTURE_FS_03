import { useState } from "react";
import {
  LayoutDashboard, Image, Users, Calendar, MessageSquare,
  BarChart3, Settings, LogOut, Menu, X, Camera, Star,
  TrendingUp, DollarSign, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Image, label: "Portfolio", id: "portfolio" },
  { icon: Calendar, label: "Bookings", id: "bookings" },
  { icon: Users, label: "Clients", id: "clients" },
  { icon: MessageSquare, label: "Messages", id: "messages" },
  { icon: BarChart3, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const stats = [
  { icon: Camera, label: "Total Shoots", value: "1,247", change: "+12%" },
  { icon: Users, label: "Active Clients", value: "342", change: "+8%" },
  { icon: DollarSign, label: "Revenue (YTD)", value: "₹24.5L", change: "+18%" },
  { icon: Star, label: "Avg Rating", value: "4.9", change: "—" },
];

const recentBookings = [
  { client: "Priya Sharma", event: "Wedding", date: "2024-12-15", status: "Confirmed" },
  { client: "Rohan Patel", event: "Pre-Wedding", date: "2024-12-20", status: "Pending" },
  { client: "Ananya Rao", event: "Baby Shoot", date: "2024-12-22", status: "Confirmed" },
  { client: "Vikram Mehta", event: "Corporate", date: "2024-12-28", status: "In Progress" },
];

const Admin = () => {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 glass border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/5">
          <Camera className="h-6 w-6 text-terracotta" strokeWidth={1.5} />
          <span className="font-heading text-lg tracking-[0.1em] text-white">
            SUBBU STUDIO
          </span>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveNav(item.id);
                setSidebarOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200",
                activeNav === item.id
                  ? "bg-terracotta/10 text-terracotta"
                  : "text-white/40 hover:text-white hover:bg-white/5",
              )}
            >
              <item.icon className="h-4 w-4" strokeWidth={1.5} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-red-400 hover:bg-white/5 transition-all text-sm">
            <LogOut className="h-4 w-4" strokeWidth={1.5} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="glass border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <div className="w-8 h-8 rounded-full bg-terracotta/20 border border-terracotta/30 flex items-center justify-center">
              <span className="font-nav text-xs text-terracotta">S</span>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-light text-white mb-2">
              Welcome back, Subbu
            </h1>
            <p className="text-muted-foreground font-body">
              Here's what's happening with your studio today.
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-terracotta/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-terracotta" strokeWidth={1.5} />
                  </div>
                  <span className={cn(
                    "text-xs font-nav",
                    stat.change.startsWith("+") ? "text-green-400" : "text-muted-foreground",
                  )}>
                    {stat.change}
                  </span>
                </div>
                <p className="text-muted-foreground font-body text-xs mb-1">{stat.label}</p>
                <p className="font-heading text-2xl font-light text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Recent bookings table */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-heading text-xl text-white mb-6">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left pb-4 font-nav text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Client</th>
                    <th className="text-left pb-4 font-nav text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Event</th>
                    <th className="text-left pb-4 font-nav text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Date</th>
                    <th className="text-left pb-4 font-nav text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking, i) => (
                    <tr key={i} className="border-b border-white/5 last:border-0">
                      <td className="py-4 text-white font-body text-sm">{booking.client}</td>
                      <td className="py-4 text-muted-foreground font-body text-sm">{booking.event}</td>
                      <td className="py-4 text-muted-foreground font-body text-sm">{booking.date}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-nav uppercase tracking-[0.1em]",
                          booking.status === "Confirmed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : booking.status === "Pending"
                              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                              : "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                        )}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
