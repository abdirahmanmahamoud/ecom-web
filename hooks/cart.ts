import { create } from "zustand";

// Define the Product type
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

// Define the shape of the store state
interface ShopState {
  products: Product[];
  total: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  productById: (productId: string) => Product | undefined;
  updateQuantity: (productId: string, quantity: number) => void;
}

// Create the Zustand store with type safety
const useCart = create<ShopState>((set, get) => ({
  products: [], // Initial products array
  total: 0, // Initial total price

  // Add a product to the cart
  addToCart: (product: Product) => {
    const updatedProducts = [...get().products, product];
    const updatedTotal = calculateTotal(updatedProducts);

    set({
      products: updatedProducts,
      total: updatedTotal,
    });
  },

  // Get a product by its ID
  productById: (productId: string) => {
    const product = get().products.find((p) => p.id === productId);
    return product;
  },

  // Update the quantity of a product in the cart
  updateQuantity: (productId: string, quantity: number) => {
    const updatedProducts = get().products.map((p) => {
      if (p.id === productId) {
        return { ...p, quantity };
      }
      return p;
    });
  },

  // Remove a product from the cart by its ID
  removeFromCart: (productId: string) => {
    const updatedProducts = get().products.filter((p) => p.id !== productId);
    const updatedTotal = calculateTotal(updatedProducts);

    set({
      products: updatedProducts,
      total: updatedTotal,
    });
  },
}));

// Utility function to calculate the total price
const calculateTotal = (products: Product[]): number => {
  return products.reduce((sum, product) => sum + product.price, 0);
};

export default useCart;
