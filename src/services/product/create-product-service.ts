import { Readable } from "node:stream";
import AppError from "../../errors/app-errors.js";
import prisma from "../../prisma/index.js";
import cloudinary from "../../config/cloudinary.js";

interface CreateProductServiceProps {
  name: string;
  price: number;
  description: string;
  category_id: string;
  bannerBuffer: Buffer;
  bannerName: string;
}

export default class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    bannerBuffer,
    bannerName,
  }: CreateProductServiceProps) {
    const categoryExists = await prisma.category.findUnique({
      where: {
        id: category_id,
      },
    });

    if (!categoryExists) {
      throw new AppError("Category does not exist");
    }

    let bannerUrl = "";

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "products",
            resource_type: "image",
            public_id: `${Date.now()}-${bannerName.replace(
              /[^a-zA-Z0-9]/g,
              ""
            )}`,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        const bufferStream = Readable.from(bannerBuffer);
        bufferStream.pipe(uploadStream);
      });

      bannerUrl = result.secure_url;
    } catch (error) {
      console.error("Cloudinary Error:", error);
      throw new AppError("Error uploading image to storage");
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        banner: bannerUrl,
        categoryId: category_id,
      },
    });

    return product;
  }
}
