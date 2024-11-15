import Product from "./_components/Product";

export default function Home() {
  return (
    <div className="w-screen px-[4%] lg:px-[8%] mx-auto mt-16">
      <h2 className="text-2xl font-bold">List Product</h2>
      <div className="pt-2">
        <Product />
      </div>
    </div>
  );
}
