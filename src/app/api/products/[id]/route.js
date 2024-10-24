import dbConnect from "@/utils/dbConnect";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const product = await Product.findById(id);
    if (!product)
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to load product" }), {
      status: 500,
    });
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const product = await Product.findByIdAndUpdate(id, await req.json(), {
      new: true,
    });
    if (!product)
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(product), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      status: 400,
    });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await dbConnect();

  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product)
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to delete product" }), {
      status: 500,
    });
  }
}
