import eventData from "../../data/events.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getEventById = async (id) => {
  const prisma = new PrismaClient();
  const event = await prisma.event.findUnique({
    where: {
      id: id,
    },
  });
  if (!event) {
    throw new NotFoundError("event", id);
  }

  return event;
};

export default getEventById;
