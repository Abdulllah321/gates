import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

// Connect to the database
await dbConnect();

// POST API route for creating a new product
export async function POST(req) {
  try {
    const { name, description, price, imageUrl } = await req.json(); // Retrieve data from the request body

    // Validate the request body
    if (!name || !description || !price || !imageUrl) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    // Create a new product
    const product = new Product({
      name,
      description,
      price,
      imageUrl,
    });

    // Save the product to the database
    await product.save();
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create product", error: error.message },
      { status: 500 }
    );
  }
}

// GET API route for fetching all products
export async function GET() {
  try {
    const products = await Product.find(); // Fetch all products from the database
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 }
    );
  }
}
