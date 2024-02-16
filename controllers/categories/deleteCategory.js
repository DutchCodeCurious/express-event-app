import categorieData from "../../data/categories.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";

const deleteCategory = async (id) => {
  const prisma = new PrismaClient();

  const deleteCategory = await prisma.category.deleteMany({
    where: {
      id: id,
    },
  });
  if (!deleteCategory || deleteCategory.count === 0) {
    throw new Error("Category not found");
  }
  return id;
};

export default deleteCategory;
