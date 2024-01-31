import Express from "express";

// Controllers
import getUsers from "../controllers/users/getUsers.js";
import getUserById from "../controllers/users/getUserById.js";
import getEventsByUserId from "../controllers/events/getEventsByUserId.js";
import createUser from "../controllers/users/createUser.js";
import updateUser from "../controllers/users/updateUser.js";

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

router.get("/:id/events", (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    const events = getEventsByUserId(id);

    if (!events) {
      res.status(404).send({ message: "Events not found" });
    } else {
      res.status(200).json([user, events]);
      console.log("Events sent");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong by getting events" });
  }
});

router.post("/", (req, res) => {
  try {
    const { name, image, password } = req.body;
    const newUser = createUser(name, image, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by creating user" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name, image, password } = req.body;
    const updatedUser = updateUser(id, name, image, password);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by updating user" });
  }
});

export default router;
