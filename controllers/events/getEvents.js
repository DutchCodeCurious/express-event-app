import eventData from "../../data/events.json" assert { type: "json" };

const getEvents = () => {
  let events = eventData.events;
  return events;
};

export default getEvents;
