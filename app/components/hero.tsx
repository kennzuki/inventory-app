'use client';


import Topkpi from './Topkpi';
import { TopBar } from './Topbar';
import { SalesTrendChart } from './SalesTrendChart';
import { StockByCategoryChart } from './StockByCategory';
import { TopProductsList } from "./TopProducts";
import { RecentActivityList } from './RecentActivity';
import { LowStockList } from './LowStockList';
import { SALES_TREND, STOCK_BY_CATEGORY, PIE_COLORS, TOP_PRODUCTS, RECENT_ACTIVITY, LOW_STOCK } from '../lib/dashboard-data';



const hero = () => {

    return (
        <>
            {/* Main column */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top bar */}
                <TopBar />

                {/* Scrollable body */}
                <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    <div>
                        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
                        <p className="text-sm text-[#6B6B63]">Overview of stock, sales, and activity.</p>
                    </div>
                    {/* KPIS */}
                    <Topkpi />

                    {/* Sales trend */}
                    <SalesTrendChart data={SALES_TREND} />

                    {/* Pie + Top products */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <StockByCategoryChart data={STOCK_BY_CATEGORY} colors={PIE_COLORS} />
                        <TopProductsList products={TOP_PRODUCTS} />
                    </div>

                    {/* Activity + low stock */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <RecentActivityList activity={RECENT_ACTIVITY} />

                        <LowStockList items={LOW_STOCK} />
                    </div>
                </main>
            </div>
        </>
    )
}

export default hero