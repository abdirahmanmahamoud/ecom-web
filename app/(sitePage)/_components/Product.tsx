import { AllProduct } from "@/fetch/Product";
import Image from "next/image";
import Link from "next/link";

export type ProductType = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  createdAt: string;
  updatedAt: string;
};

const Product = async () => {
  const data: ProductType[] = await AllProduct();
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {data && data.length > 0 ? (
        data.map((product) => (
          <Link
            href={`/product/${product.id}`}
            className="w-full shadow-2xl shadow-gray-200 bg-white"
          >
            <div className="w-full h-[240px]">
              <Image
                src={product.image}
                alt={`${product.name} image`}
                width={100}
                height={240}
                className="mb-6 h-[240px] w-full rounded-md object-contain"
              />
            </div>
            <div className="py-2 px-3">
              <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                {product.name}
              </h2>
              <h2 className="font-Poppins font-medium text-xl mt-1">
                ${product.price}
              </h2>
            </div>
          </Link>
        ))
      ) : (
        <p className=" w-full">No products available</p>
      )}
    </div>
  );
};

export default Product;
