"use server";
import { cookies } from "next/headers";

type CheckoutType = {
  products: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
};
export const CheckoutRes = async ({ data }: { data: CheckoutType }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return { status: "error", message: "You are not logged in" };
  }

  const productData = {
    product: [
      data.products.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    ],
    address: `${data.address}, ${data.city}, ${data.state}, ${data.zipCode}, ${data.country}`,
    phone: data.phone,
    price: data.total,
  };

  const res = await fetch("http://localhost:4000/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.value}`,
    },
    body: JSON.stringify(productData),
  });
  const result = await res.json();

  console.log(result);

  if (!res.ok) {
    return { status: "error", message: result.message };
  }

  return { status: "success", message: result.message };
};
