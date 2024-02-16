import userData from "../../data/users.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const upadateUser = async (id, name, image, password) => {
  const prisma = new PrismaClient();
  const updatedUser = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      name,
      image,
      password,
    },
  });
  if (!updatedUser || updatedUser.count === 0) {
    throw new NotFoundError(`user`, id);
  }
  return {
    message: `User with id ${id} has been updated successfully!`,
  };
};

export default upadateUser;
