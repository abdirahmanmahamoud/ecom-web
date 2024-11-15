"use client";
import Image from "next/image";
import { ProductType } from "./Product";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import useCart from "@/hooks/cart";
import { redirect } from "next/navigation";

const ProductDetail = ({ product }: { product: ProductType }) => {
  const [quantity, setQuantity] = useState(1);
  const [productCard, setProductCard] = useState<boolean>(false);
  const { addToCart, productById, updateQuantity } = useCart();

  useEffect(() => {
    const existingProduct = productById(product.id);
    if (existingProduct) {
      setQuantity(existingProduct.quantity);
      setProductCard(true);
    } else {
      setProductCard(false);
    }
  }, [productById, product.id]);

  const handleCard = () => {
    const mockProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
    };
    addToCart(mockProduct);
    redirect("/cart");
  };
  const handleUpdateQuantity = () => {
    updateQuantity(product.id, quantity);
    redirect("/cart");
  };
  return (
    <div className="w-full flex space-x-3">
      <div className="w-[45%] h-[65%]">
        <Image
          src={product.image}
          alt={`${product.name} image`}
          width={100}
          height={240}
          className="mb-6 h-full w-full rounded-md object-contain"
        />
      </div>
      <div className="w-[55%] pr-3 pt-20">
        <h2 className="font-Poppins font-semibold text-2xl leading-5 text-gray-600">
          {product.name}
        </h2>
        <p className="font-Poppins font-medium text-lg mt-1">
          {product.description}
        </p>
        <h2 className="font-Poppins font-medium text-xl mt-1">
          ${product.price * quantity}
        </h2>
        <div className="mt-16 flex space-x-1">
          <Input
            type="number"
            className="mr-3 w-20 shadow-md"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          {productCard ? (
            <Button onClick={handleUpdateQuantity}>Update Cart</Button>
          ) : (
            <Button onClick={handleCard}>Add to Cart</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
