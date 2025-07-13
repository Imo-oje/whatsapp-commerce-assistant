import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // using upsert to avoid duplicate.
  const permissions = await Promise.all([
    prisma.permission.upsert({
      where: { name: "CREATE_PRODUCT" },
      update: {},
      create: { name: "CREATE_PRODUCT" },
    }),
    prisma.permission.upsert({
      where: { name: "UPDATE_PRODUCT" },
      update: {},
      create: { name: "UPDATE_PRODUCT" },
    }),
    prisma.permission.upsert({
      where: { name: "DELETE_PRODUCT" },
      update: {},
      create: { name: "DELETE_PRODUCT" },
    }),
    prisma.permission.upsert({
      where: { name: "VIEW_PRODUCT" },
      update: {},
      create: { name: "VIEW_PRODUCT" },
    }),
    prisma.permission.upsert({
      where: { name: "CREATE_ORDER" },
      update: {},
      create: { name: "CREATE_ORDER" },
    }),
    prisma.permission.upsert({
      where: { name: "MANAGE_USERS" },
      update: {},
      create: { name: "MANAGE_USERS" },
    }),
    prisma.permission.upsert({
      where: { name: "MANAGE_ROLES" },
      update: {},
      create: { name: "MANAGE_ROLES" },
    }),
  ]);

  console.log("Permissions seeded:", permissions);

  // Create or connect roles and assign permissions using the 'connect'
  const adminRole = await prisma.role.upsert({
    where: { name: "ADMIN" },
    update: {},
    create: {
      name: "ADMIN",
      permissions: {
        connect: [
          { name: "CREATE_PRODUCT" },
          { name: "UPDATE_PRODUCT" },
          { name: "DELETE_PRODUCT" },
          { name: "MANAGE_USERS" },
          { name: "MANAGE_ROLES" },
        ],
      },
    },
  });

  const userRole = await prisma.role.upsert({
    where: { name: "USER" },
    update: {},
    create: {
      name: "USER",
      permissions: {
        connect: [{ name: "VIEW_PRODUCT" }, { name: "CREATE_ORDER" }],
      },
    },
  });

  console.log("Roles seeded:", { adminRole, userRole });
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(() => prisma.$disconnect());
