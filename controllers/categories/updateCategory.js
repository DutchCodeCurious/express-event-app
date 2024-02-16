import categoryDate from "../../data/categories.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";

const updateCategory = async (id, name) => {
  const prisma = new PrismaClient();

  const updateCategory = await prisma.category.updateMany({
    where: {
      id: id,
    },
    data: {
      name,
    },
  });
  if (!updateCategory || updateCategory.count === 0) {
    throw new Error("Category not found");
  }
  return {
    message: `Category with id: ${id}  updated successfully`,
  };
};

export default updateCategory;
