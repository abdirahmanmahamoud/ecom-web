"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/cart";
import { X } from "lucide-react";
import Link from "next/link";

const CartPage = () => {
  const { products, total, removeFromCart } = useCart();
  return (
    <div className="w-screen px-[4%] lg:px-[8%] mx-auto mt-16">
      <h2 className="text-2xl font-bold">Cart</h2>
      <div className="pt-2">
        {products && products.length > 0 ? (
          <div className="w-full flex flex-col lg:flex-row lg:justify-between">
            <div className="w-[70%]">
              {products.map((product) => (
                <div className="flex items-center justify-between shadow-lg">
                  <div className="flex items-center space-x-3 w-[80%]">
                    <img
                      src={product.image}
                      alt={`${product.name} image`}
                      width={100}
                      height={240}
                      className="mb-6 h-[140px] w-[22%] rounded-md object-contain"
                    />
                    <div className="flex flex-col">
                      <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                        {product.name}
                      </h2>
                      <h2 className="font-Poppins font-medium text-xl mt-1">
                        {product.quantity} x {product.price / product.quantity}=
                        ${product.price}
                      </h2>
                    </div>
                  </div>
                  <div className="w-[20%] h-full flex items-center justify-center">
                    <X
                      onClick={() => removeFromCart(product.id)}
                      className="cursor-pointer w-5 h-5"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[30%] mt-6 shadow-lg ml-2 px-3 py-4 relative">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                    Total Product
                  </h2>
                  <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(total)}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                    Shipping Fee
                  </h2>
                  <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(Math.round(total * 0.01 * 100) / 100)}
                  </h2>
                </div>
                <div className="flex justify-between">
                  <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                    Total
                  </h2>
                  <h2 className="font-Poppins font-medium text-lg leading-5 text-gray-600 line-clamp-2">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(total + Math.round(total * 0.01 * 100) / 100)}
                  </h2>
                </div>
                <div className="w-full h-32"></div>
              </div>
              <div className="absolute bottom-4 left-0 right-0">
                <Button className="w-full mx-2" asChild>
                  <Link href="/checkout">Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <h2>Cart is empty</h2>
        )}
      </div>
    </div>
  );
};

export default CartPage;
