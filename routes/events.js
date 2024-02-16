import Express from "express";
import jwtCheck from "../middleware/auth.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

// Controllers
import getEvents from "../controllers/events/getEvents.js";
import getEventById from "../controllers/events/getEventById.js";
import deleteEventById from "../controllers/events/deleteEventById.js";
import createEvent from "../controllers/events/createEvent.js";
import updateEvent from "../controllers/events/updateEvent.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await getEvents();
    res.status(200).json(events);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by getting events" });
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const event = await getEventById(id);
      res.status(200).json(event);
    } catch (error) {
      nextTick(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", async (req, res) => {
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
    const newEvent = await createEvent(
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

router.put("/:id", async (req, res, next) => {
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
    const updatedEvent = await updateEvent(
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
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedEvent = await deleteEventById(id);
    res.status(200).json({
      message: `Event with id: ${id} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
