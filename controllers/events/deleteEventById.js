import eventData from "../../data/events.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteEventById = async (id) => {
  const prisma = new PrismaClient();
  const deleteEvent = await prisma.event.deleteMany({
    where: {
      id: id,
    },
  });
  if (!deleteEvent || deleteEvent.count === 0) {
    throw new NotFoundError("event", id);
  }

  return id;
};

export default deleteEventById;
