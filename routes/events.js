import Express from "express";

// Controllers
import getEvents from "../controllers/events/getEvents.js";
import getEventById from "../controllers/events/getEventById.js";
import deleteEventById from "../controllers/events/deleteEventById.js";
import createEvent from "../controllers/events/createEvent.js";
import updateEvent from "../controllers/events/updateEvent.js";

const router = Express.Router();

router.get("/", (req, res) => {
  try {
    const events = getEvents();
    res.status(200).json(events);
    console.log("Events sent");
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by getting events" });
  }
});

router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const event = getEventById(id);

    if (!event) {
      res.status(404).send({ message: "Event not found" });
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong by getting event" });
  }
});

router.post("/", (req, res) => {
  try {
    const {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;
    const newEvent = createEvent(
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime
    );
    res.status(201).json(newEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong by creating event" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    } = req.body;
    const updatedEvent = updateEvent(
      id,
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime
    );

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong by updating event" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const eventName = getEventById(id).title;
    const deletedEvent = deleteEventById(id);

    if (!deletedEvent) {
      res.status(404).send({ message: `Event with ${id} not found` });
    } else {
      res.status(200).json({ message: `Event ${eventName} deleted` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong by deleting event" });
  }
});

export default router;
