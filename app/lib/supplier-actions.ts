"use server"

import { prisma } from "./db";
import { revalidatePath } from "next/cache";


export async function getSuppliers() {
    return await prisma.supplier.findMany({
        include: {
            products: {
                select: {
                    id: true,
                    name: true,
                    sku: true,
                    stock: true,
                    reorderPoint: true,
                    supplier: true,
                },
                orderBy: { name: "asc" },
            },
            purchases: {
                select: {
                    total: true,
                    createdAt: true,
                },
            },
            _count: { select: { products: true, purchases: true } },
        },
    }).then(suppliers =>
        suppliers.map(s => ({
            ...s,
            purchaseOrders: s._count?.purchases ?? 0,
            totalPurchased: s.purchases?.reduce((sum, p) => sum + Number(p.total), 0) ?? 0,
            lastPurchase: s.purchases?.[s.purchases.length - 1]?.createdAt ?? null,
        }))
    );
}

/* use server */
export async function getSupplierById(id: string) {
    return await prisma.supplier.findUnique({
        where: { id },
        include: {
            products: true,
            purchases: true,
        },
    });
}



/* use server */
export async function deleteSupplier(formData: FormData) {
    const id = String(formData.get("id") ?? "");
    if (!id) {
        throw new Error("Supplier ID is required");
    }
    await prisma.supplier.delete({
        where: { id },
    });
    revalidatePath("/suppliers");
}

/* use server */
export async function createSupplier(formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    if (!name) {
        throw new Error("Supplier name is required");
    }
    await prisma.supplier.create({ data: { name } });
    revalidatePath("/suppliers");
}

/* use server */
export async function updateSupplier(id: string, formData: FormData) {
    const name = String(formData.get("name") ?? "").trim();
    if (!name) {
        throw new Error("Supplier name is required");
    }
    await prisma.supplier.update({
        where: { id },
        data: { name },
    });
    revalidatePath("/suppliers");
}
