export const AllProduct = async () => {
  const res = await fetch("http://localhost:4000/product", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await res.json();
  return result;
};
