"use client";
import useCart from "@/hooks/cart";

const CartPage = () => {
  const { products } = useCart();
  console.log(products);
  return (
    <div className="w-screen px-[4%] lg:px-[8%] mx-auto mt-16">
      <h2 className="text-2xl font-bold">Cart</h2>
      <div className="pt-2">ui57tu</div>
    </div>
  );
};

export default CartPage;
