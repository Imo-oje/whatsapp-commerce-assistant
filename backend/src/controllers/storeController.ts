import { Product } from "@prisma/client";
import {
  CREATED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "../constants/HttpStatusCode";
import prisma from "../db/client";
import appAssert from "../utils/appAssert";
import { asyncHandler } from "../utils/asyncFunctionHandler";
import { getStoreProduct, getUserAndStore } from "../utils/prisma";
import {
  createProductSchema,
  createStoreSchema,
  updateProductsSchema,
  updateStoreSchema,
} from "../utils/vlidationSchema";

export const createStore = asyncHandler(async (req, res) => {
  const { businessName, logo } = createStoreSchema.parse({
    ...req.body,
  });
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const store = await prisma.store.create({
    data: { businessName, ...(logo && { logo }), ownerId: user.id },
  });
  appAssert(store, INTERNAL_SERVER_ERROR, "Could not create store");

  res.status(CREATED).json({ message: "Store created" });
});

export const updateStore = asyncHandler(async (req, res) => {
  const {
    businessName,
    logo,
    address,
    contactEmail,
    contactPhone,
    description,
    location,
  } = updateStoreSchema.parse({ ...req.body });
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const store = await prisma.store.findFirst({ where: { ownerId: user.id } });
  appAssert(store, NOT_FOUND, "Store not found");

  const updatedStore = await prisma.store.update({
    where: { id: store.id },
    data: {
      ...(businessName && { businessName }),
      ...(logo && { logo }),
      ...(address && { address }),
      ...(contactEmail && { contactEmail }),
      ...(contactPhone && { contactPhone }),
      ...(description && { description }),
      ...(location && { location }),
    },
  });
  appAssert(
    updatedStore,
    INTERNAL_SERVER_ERROR,
    "Could not update fields" /* TODO: Specify fields that failed */
  );

  res.status(OK).json({ message: "Store updated" });
});

export const getCatalog = asyncHandler(async (req, res) => {
  const { storeId } = req.params;
  const store = await prisma.store.findUnique({ where: { id: storeId } });
  appAssert(store, NOT_FOUND, "Store not found");
  const products = await prisma.product.findMany({
    where: { storeId: store.id, isdeleted: false },
  });
  appAssert(products, NOT_FOUND, "Products not found");
  res.status(OK).json({ success: true, data: { store, products } });
});

// product actions performed by store owners

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, images, price, quantity } =
    createProductSchema.parse({ ...req.body });

  const { store } = await getUserAndStore(req.userId);

  const product = await prisma.product.create({
    data: { name, description, images, price, quantity, storeId: store.id },
  });
  appAssert(product, INTERNAL_SERVER_ERROR, "Could not create product");

  res.status(CREATED).json({ success: true, data: product });
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const product = await prisma.product.findUnique({
    where: { id: productId, isdeleted: false },
  });
  appAssert(product, NOT_FOUND, "Product not found");
  res.status(OK).json({ success: true, date: product });
});

export const getAllProducts = asyncHandler(async (req, res) => {
  const { store } = await getUserAndStore(req.userId);
  const products = await prisma.product.findMany({
    where: { storeId: store.id, isdeleted: false },
  });
  appAssert(products, NOT_FOUND, "No products found");
  res.status(OK).json({ success: true, data: products });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { description, images, name, price, quantity } =
    updateProductsSchema.parse({ ...req.body });

  const { store } = await getUserAndStore(req.userId);
  const product = (await getStoreProduct(store.id, productId)) as Product;

  // Update the product
  const updatedProduct = await prisma.product.update({
    where: { id: product.id },
    data: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price !== undefined && { price }),
      ...(quantity !== undefined && { quantity }),
      ...(images && { images }),
    },
  });
  res.status(200).json({ success: true, data: updatedProduct });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const { store } = await getUserAndStore(req.userId);
  const product = (await getStoreProduct(store.id, productId)) as Product;

  const deleted = await prisma.product.update({
    where: { id: product.id },
    data: {
      isdeleted: true,
    },
  });
  appAssert(deleted, INTERNAL_SERVER_ERROR, "Could not tdelete product");
  res.status(OK).json({ success: true, data: [] });
});
