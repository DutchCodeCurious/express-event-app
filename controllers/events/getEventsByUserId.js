import eventData from "../../data/events.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getEventsByUserId = async (id) => {
  const prisma = new PrismaClient();
  const userEvents = await prisma.event.findMany({
    where: {
      createdBy: id,
    },
  });
  if (!userEvents) {
    throw new NotFoundError("user", id);
  }
  return userEvents;
};

export default getEventsByUserId;
