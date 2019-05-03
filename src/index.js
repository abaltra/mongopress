import express from "express";
import { json, urlencoded } from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import { posts, users, auth } from "./routes";
import * as middlewares from "./middleware";
import mongoose from 'mongoose'

const app = new express();

mongoose.connect(`${process.env.MONGO_URL}/mongopress` , { useNewUrlParser: true });
mongoose.set("useCreateIndex", true);

// set middlewares
app.use(helmet());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

const PORT = process.env.WEB_PORT || 3000;

// set routes
app.get("/posts", middlewares.auth.ensureLoggedIn, posts.list);
app.post("/posts", posts.add);
app.put("/posts/:id", posts.update);
app.get("/posts/:id", posts.get);
app.delete("/posts/:id", posts.remove);

app.get("/users", users.list);
app.post("/users", users.add);
app.get("/users/:id", users.get);
app.put("/users/:id", users.update);
app.delete("/users/:id", users.remove);

app.post("/auth/login", auth.login);

app.listen(PORT, (err) => {
    console.log(`App listening on port ${PORT}`)
});