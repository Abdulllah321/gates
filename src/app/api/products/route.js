import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";
import NodeCache from "node-cache";

// Create a new cache instance
const cache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

// Connect to the database
await dbConnect();

export async function POST(req) {
  try {
    const { name, description, price, imageUrl } = await req.json(); 
    
    const requiredFields = { name, description, price, imageUrl };
    const missingFields = Object.entries(requiredFields)
      .filter(([, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length) {
      return NextResponse.json(
        { message: `Missing fields: ${missingFields.join(", ")}` },
        { status: 400 }
      );
    }

    const product = new Product({ name, description, price, imageUrl });
    await product.save();

    cache.del("products");

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}

// GET API route for fetching all products
export async function GET() {
  try {
    // Check if the products are cached
    const cachedProducts = cache.get("products");
    if (cachedProducts) {
      return NextResponse.json(cachedProducts, { status: 200 });
    }

    // Fetch all products from the database
    const products = await Product.find();

    // Store the fetched products in cache
    cache.set("products", products);

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
}
