import express from "express";

import log from "./middleware/logMiddleware.js";

import eventsRouter from "./routes/events.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(express.json());
app.use(log);

app.use("/events", eventsRouter);
app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
