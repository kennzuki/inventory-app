import { ProductDetailsClient } from "./ProductDetailsClient";

export default async function ProductIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailsClient id={id} />;
}
