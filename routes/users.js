import Express from "express";

// Controllers
import getUsers from "../controllers/users/getUsers.js";
import getUserById from "../controllers/users/getUserById.js";

const router = Express.Router();

router.get("/", (req, res) => {
  try {
    const events = getUsers();
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
    const event = getUserById(id);

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
