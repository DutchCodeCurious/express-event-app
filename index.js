import express from "express";
import dotenv from "dotenv";

// Middleware
import log from "./middleware/logMiddleware.js";
import jwtCheck from "./middleware/auth.js";

// Routes
import eventsRouter from "./routes/events.js";
import usersRouter from "./routes/users.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(log);

app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
