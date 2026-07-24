import type { Activity } from "../lib/dashboard-data";

type RecentActivityListProps = {
    activity: Activity[];
};

export function RecentActivityList({ activity }: RecentActivityListProps) {
    return (
        <div className="rounded-lg border border-black/10 bg-white px-5 py-4">
            <h2 className="text-sm font-semibold mb-3">Recent Activity</h2>
            <ul className="space-y-3">
                {activity.map((a, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#2E7D75] shrink-0" />
                        <div className="flex-1">
                            <p className="text-[#1A1D1D]">{a.text}</p>
                            <p className="text-xs text-[#6B6B63]">{a.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}