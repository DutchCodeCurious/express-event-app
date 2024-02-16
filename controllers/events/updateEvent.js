import eventData from "../../data/events.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";

const updateEvent = async (
  id,
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

  const updateEvent = await prisma.event.update({
    where: {
      id: id,
    },
    data: {
      createdBy,
      title,
      description,
      image,
      categoryIds: {
        set: [],
        connect: categoryIds.map((id) => ({ id })),
      },
      location,
      startTime,
      endTime,
    },
  });

  if (!updateEvent || updateEvent.count === 0) {
    throw new Error(`Event with ${id} was not found`);
  }

  return {
    message: `Event with id: ${id} updated successfully`,
  };
};

export default updateEvent;
