import userData from "../../data/users.json" assert { type: "json" };
import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";

const createUser = async (name, image, password) => {
  const prisma = new PrismaClient();

  return prisma.user.create({
    data: {
      id: uuid(),
      name,
      image,
      password,
    },
  });
};

export default createUser;
