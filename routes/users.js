import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

// Controllers
import getUsers from "../controllers/users/getUsers.js";
import getUserById from "../controllers/users/getUserById.js";
import getEventsByUserId from "../controllers/events/getEventsByUserId.js";
import createUser from "../controllers/users/createUser.js";
import updateUser from "../controllers/users/updateUser.js";
import deleteUser from "../controllers/users/deleteUser.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const events = await getUsers();
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
      const event = await getUserById(id);
      res.status(200).json(event);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

// check of verniewen
router.get(
  "/:id/events",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const events = await getEventsByUserId(id);

      res.status(200).json(events);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", async (req, res) => {
  try {
    const { name, image, password } = req.body;
    const newUser = await createUser(name, image, password);
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Something went wrong by creating user" });
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, image, password } = req.body;
    const updatedUser = await updateUser(id, name, image, password);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
    res.status(200).json({
      message: `User with id ${id} has been deleted successfully!`,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
