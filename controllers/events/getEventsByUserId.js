import eventData from "../../data/events.json" assert { type: "json" };

const getEventsByUserId = (id) => {
  id = Number(id);
  return eventData.events.filter((event) => event.createdBy === id);
};

export default getEventsByUserId;
