import { PrismaClient } from "@prisma/client";

const getCategoriesById = async (id) => {
  const prisma = new PrismaClient();
  const category = prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export default getCategoriesById;
