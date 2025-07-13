import { Store, User } from "@prisma/client";
import prisma from "../db/client";
import { FORBIDDEN, NOT_FOUND } from "../constants/HttpStatusCode";
import appAssert from "./appAssert";

export const omitPassword = ({ passwordHash, ...safeUser }: User) => safeUser;

export const getUserAndStore = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  appAssert(user, FORBIDDEN, "Invalid User");

  const store = await prisma.store.findFirst({ where: { ownerId: user.id } });
  appAssert(store, NOT_FOUND, "Store not found");

  return { user, store };
};

export const getStoreProduct = async (
  storeId: Store["id"],
  productId: string
) => {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  appAssert(product, NOT_FOUND, "Product nor found");
  appAssert(product.storeId === storeId, FORBIDDEN, "Unauthorized access");
  return product;
};
