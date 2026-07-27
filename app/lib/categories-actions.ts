"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";

// fetch all categories from database
export async function getAllCategories() {
   const categories=await prisma.category.findMany({
    orderBy:{name:"asc"},
    include:{
      _count:{select:{products:true}}
    }
   })
   return categories
}

//get largest category by count of products
export async function getLargestCategory() {
  const categories=await prisma.category.findMany({
    orderBy:{
      products:{_count:"desc"}
    },
    include:{
      _count:{select:{products:true}}
    }
  })
  return categories[0]
} 

//get low stock order level for display in categories page

export async function getLowStockProductsByCategory() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        select: {
          id: true,
          name: true,
          sku: true,
          stock: true,
          reorderPoint: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
 
  return categories
    .map((c) => ({
      categoryId: c.id,
      category: c.name,
      products: c.products.filter((p) => p.stock <= p.reorderPoint),
    }))
    .filter((c) => c.products.length > 0);
}