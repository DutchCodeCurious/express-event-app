import eventData from "../../data/events.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";

const getEvents = async () => {
  const prisma = new PrismaClient();
  return prisma.event.findMany();
};

export default getEvents;
