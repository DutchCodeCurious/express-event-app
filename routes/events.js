import Express from "express";

// Controllers
import getEvents from "../controllers/events/getEvents.js";
import getEventById from "../controllers/events/getEventById.js";

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

export default router;
