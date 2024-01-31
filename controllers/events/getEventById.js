import eventData from "../../data/events.json" assert { type: "json" };

const getEventById = (id) => {
  id = Number(id);
  return eventData.events.find((event) => event.id === id);
};

export default getEventById;
