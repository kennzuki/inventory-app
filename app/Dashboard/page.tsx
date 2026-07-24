import Sidebar from "../components/Sidebar";
import Hero from "../components/hero";

export default function DashboardPage() {
    return (
        <div className="flex h-screen w-full bg-[#F7F6F2] text-[#1A1D1D] font-sans">
            <Sidebar />
            <Hero />
        </div>
    );
}   