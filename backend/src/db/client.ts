import { PrismaClient } from "@prisma/client";
import { DATABASE_URL, NODE_ENV,TEST_DATABASE_URL } from "../constants/env";

const dbUrl = NODE_ENV === "production"
  ? DATABASE_URL
  : TEST_DATABASE_URL;

const prisma = new PrismaClient({
  datasources: {
    db: { url: dbUrl },
  },
});

export default prisma;
