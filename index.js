import express from "express";
import dotenv from "dotenv";

// Sentry
import * as Sentry from "@sentry/node";

// Middleware
import log from "./middleware/logMiddleware.js";

// Routes
import eventsRouter from "./routes/events.js";
import usersRouter from "./routes/users.js";
import categoriesRouter from "./routes/categories.js";
import loginRouter from "./routes/login.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(log);

Sentry.init({
  dsn: "https://a0d71f1be7f842b47d0ff27fbe2fb4fe@o4506659498950656.ingest.sentry.io/4506677559689216",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    //new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get("/", function rootHandler(req, res) {
  res.end("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

app.use(Sentry.Handlers.requestHandler());
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(Sentry.Handlers.errorHandler());

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
