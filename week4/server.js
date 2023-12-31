import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import dataRoutes from "./routes/data.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.sendFile(
    path.join("/home/dobby/SKKUding/study/week4", "/mnt/data/week2.html")
  );
});

app.use(authRoutes);
app.use(dataRoutes);

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});

export default app;
