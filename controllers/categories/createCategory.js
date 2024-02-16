import categoriesData from "../../data/categories.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createCategory = async (name) => {
  const prisma = new PrismaClient();

  return prisma.category.create({
    data: {
      id: uuid(),
      name,
    },
  });
};

export default createCategory;
