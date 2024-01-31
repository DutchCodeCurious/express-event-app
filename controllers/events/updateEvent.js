import eventData from "../../data/events.json" assert { type: "json" };

const updateEvent = (
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
  const event = eventData.events.find((event) => event.id === id);

  if (!event) {
    throw new Error(`Event with ${id} was not found`);
  }

  event.createdBy = createdBy ?? event.createdBy;
  event.title = title ?? event.title;
  event.description = description ?? event.description;
  event.image = image ?? event.image;
  event.categoryIds = categoryIds ?? event.categoryIds;
  event.location = location ?? event.location;
  event.startTime = startTime ?? event.startTime;
  event.endTime = endTime ?? event.endTime;

  return event;
};

export default updateEvent;
