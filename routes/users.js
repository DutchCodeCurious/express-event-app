import Express from "express";

// Controllers
import getUsers from "../controllers/users/getUsers.js";
import getUserById from "../controllers/users/getUserById.js";
import getEventsByUserId from "../controllers/events/getEventsByUserId.js";
import createUser from "../controllers/users/createUser.js";
import updateUser from "../controllers/users/updateUser.js";
import deleteUser from "../controllers/users/deleteUser.js";

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

// check of verniewen
router.get("/:id/events", async (req, res) => {
  try {
    const { id } = req.params;
    const user = getUserById(id);
    const events = await getEventsByUserId(id);

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

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const userName = getUserById(id).name;
    const deletedUser = deleteUser(id);
    if (!deletedUser) {
      res.status(404).send({ message: "User not found" });
    } else {
      res.status(200).json({ message: `${userName} deleted` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by deleting user" });
  }
});

export default router;
