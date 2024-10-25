import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  const formData = await req.formData();

  const file = formData.get("image");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    // Upload image to Cloudinary
    const uploadResponse = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: "image" },
        (error, result) => {
          if (error) {
            console.error("Upload Error:", error);
            reject(new Error("Upload failed"));
          } else {
            resolve(result);
          }
        }
      );

      // End the stream with the buffer
      stream.end(buffer);
    });

    // Respond with the URL of the uploaded image
    const url = uploadResponse.secure_url;
    return NextResponse.json({
      message: "Success",
      url,
      status: 201,
    });
  } catch (error) {
    console.error("Error occurred", error);
    return NextResponse.json(
      { message: "Failed", error: error.message },
      { status: 500 }
    );
  }
};
