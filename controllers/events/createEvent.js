import eventData from "../../data/events.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createEvent = async (
  createdBy,
  title,
  description,
  image,
  categoryIds,
  location,
  startTime,
  endTime
) => {
  const prisma = new PrismaClient();

  startTime = new Date(startTime).toISOString();
  endTime = new Date(endTime).toISOString();

  return prisma.event.create({
    data: {
      id: uuid(),
      createdBy,
      title,
      description,
      image,
      categoryIds: {
        connect: categoryIds.map((id) => ({ id })),
      },
      location,
      startTime,
      endTime,
    },
  });
};

export default createEvent;
