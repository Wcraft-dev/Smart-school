import express  from 'express'
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import classRoutes from "./class.routes";
const app = express()

app.use("/auth",authRoutes)
app.use("/user", userRoutes);
app.use("/class", classRoutes);

export default app
