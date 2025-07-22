import { NOT_FOUND, OK } from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await prisma.product.findUnique({
    where: { id: productId, isdeleted: false },
  });
  appAssert(product, NOT_FOUND, "Product not found");
  res.status(OK).json({ success: true, date: product });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await prisma.product.findMany();
  appAssert(products, NOT_FOUND, "No products found");
  res.status(OK).json({ success: true, data: products });
});
