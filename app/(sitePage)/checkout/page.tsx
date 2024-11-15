"use client";

import useCart from "@/hooks/cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userType } from "../_components/AvatarProfile";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import countryJSON from "@/lib/country.json";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const fromSchema = z.object({
  firstName: z.string().min(2, "First Name Is Required"),
  lastName: z.string().min(2, "Last Name Is Required"),
  address: z.string().min(2, "Address Is Required"),
  city: z.string().min(2, "City Is Required"),
  state: z.string().min(2, "State Is Required"),
  zipCode: z.string().min(2, "Zip Code Is Required"),
  country: z.string().min(2, "Country Is Required"),
  phone: z.string().min(6, "Phone Is Required"),
});

const CheckoutPage = () => {
  const { products, total } = useCart();
  const [loading, setLoading] = useState(false);
  const user: userType = JSON.parse(localStorage.getItem("user") || "{}");

  if (!products || products.length === 0) {
    return redirect("/");
  }

  const from = useForm<z.infer<typeof fromSchema>>({
    resolver: zodResolver(fromSchema),
    defaultValues: {
      firstName: user?.name?.split(" ")[0],
      lastName: user?.name?.split(" ")[1],
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (user?.email == null) {
      setLoading(true);
    }
  }, [user]);

  const onSubmit = async (value: z.infer<typeof fromSchema>) => {
    setLoading(true);
    console.log(value);
  };

  return (
    <div className="w-screen px-[4%] lg:px-[8%] mx-auto mt-16">
      <h2 className="text-2xl font-bold">Checkout Page</h2>
      {user?.email == null && (
        <div className="mt-4 py-1 px-4 bg-red-600 w-[40%]">
          <p className="text-white">Please Login To Checkout</p>
        </div>
      )}
      <div className="pt-3">
        <Form {...from}>
          <form onSubmit={from.handleSubmit(onSubmit)}>
            <div className="w-full flex  justify-between">
              <div className="w-[65%] space-y-4">
                <div className="w-full flex items-center space-x-2">
                  <div className="w-[50%]">
                    <FormField
                      control={from.control}
                      name="firstName"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>First Name</Label>
                          <Input
                            {...field}
                            placeholder="Enter your email"
                            disabled={loading}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                  <div className="w-[50%]">
                    <FormField
                      control={from.control}
                      name="lastName"
                      render={({ field }) => (
                        <div className="space-y-2">
                          <Label>Last Name</Label>
                          <Input
                            {...field}
                            placeholder="Enter your email"
                            disabled={loading}
                          />
                          <FormMessage />
                        </div>
                      )}
                    />
                  </div>
                </div>
                <FormField
                  control={from.control}
                  name="address"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Address</Label>
                      <Input
                        {...field}
                        placeholder="Enter your address"
                        disabled={loading}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={from.control}
                  name="city"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        {...field}
                        placeholder="Enter your city"
                        disabled={loading}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={from.control}
                  name="state"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>State</Label>
                      <Input
                        {...field}
                        placeholder="Enter your state"
                        disabled={loading}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={from.control}
                  name="country"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Country</Label>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={loading}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countryJSON.map((country) => (
                            <SelectItem
                              value={country.name}
                              key={country.phoneCode}
                            >
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  )}
                />

                <FormField
                  control={from.control}
                  name="zipCode"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Zip Code</Label>
                      <Input
                        {...field}
                        placeholder="Enter your zip code"
                        disabled={loading}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={from.control}
                  name="phone"
                  render={({ field }) => (
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input
                        {...field}
                        placeholder={
                          countryJSON.find(
                            (country) =>
                              country.name === from.getValues("country")
                          )?.phoneCode
                        }
                        disabled={loading}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <div className="w-[30%] mt-6 shadow-lg ml-2 px-3 py-4 h-64">
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
                  <div className="w-full h-24"></div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className={cn(
                    "w-full bg-black text-white hover:bg-white hover:text-black",
                    loading && "opacity-50"
                  )}
                >
                  {loading ? "Loading..." : "Checkout"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CheckoutPage;
