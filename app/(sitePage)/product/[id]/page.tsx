import { productDetailById } from "@/fetch/Product";
import { ProductType } from "../../_components/Product";
import ProductDetail from "../../_components/ProductDetail";

const ProductDetailPage = async ({ params }: { params: { id: string } }) => {
  const data: ProductType = await productDetailById(params.id);
  return (
    <div className="w-screen px-[4%] lg:px-[8%] mx-auto mt-16">
      <h2 className="text-2xl font-bold">Product Detail</h2>
      <div className="pt-2">
        <ProductDetail product={data} />
      </div>
    </div>
  );
};

export default ProductDetailPage;
