import express from "express";
import fetch from "node-fetch"; // Updated to use import
import * as Sentry from "@sentry/node"; // Import all for CommonJS compatibility
import { Integrations as TracingIntegrations } from "@sentry/tracing";


const app = express();
const PORT = 3000;

// Initialize Sentry
Sentry.init({
  dsn: "https://b18ee639bbf61c970c22a007b3f8ea20@sentry.prod.services.adup.dev/233", // Replace with your Sentry DSN
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new TracingIntegrations.Express({ app }),
  ],
  tracesSampleRate: 1.0, // Adjust sample rate as needed for performance monitoring
});

// Request Handlers for Sentry
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


// Routes

// Level 1: Basic Error Identification
app.get("/error", (req, res) => {
  // This will throw a reference error
  const result = nonexistentFunction(); // Intentional error
  res.send(result);
});

// Level 2: Context and Breadcrumbs
app.get("/api-call", async (req, res) => {
  // Incorrect URL will cause a fetch error
  try {
    const response = await fetch("http://invalid-url");
    const data = await response.json();
    res.send(data);
  } catch (err) {
    Sentry.captureException(err); // Capture the exception in Sentry
    res.status(500).send("API call failed!");
  }
});

app.get("/slow-route", async (req, res) => {
  // Simulate a slow I/O operation with a delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Perform a 5-second delay
  await delay(5000);
  res.send("This route is slow due to simulated I/O delay!");
});

// Level 4: Alerts and Issue Management
app.get("/custom-alert", (req, res) => {
  // Throws a specific error type for alerts
  throw new TypeError("This is a custom TypeError!");
});

// Level 5: Advanced Error Debugging
app.get("/conditional-error", (req, res) => {
  const { input } = req.query;
  if (input === "trigger") {
    throw new Error("Conditional Error Triggered!");
  }
  res.send("No error triggered.");
});

// Sentry error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// General error handler (after Sentry error handler)
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});