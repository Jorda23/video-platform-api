import express from "express";
import * as auth from "./controller/auth.controller";
import * as video from "./controller/video.controller";
import { authMiddleware } from "./middlewares/auth";

const app = express();
app.use(express.json());

app.post("/signup", auth.signUp);
app.post("/signin", auth.signIn);

app.get("/videos", video.listVideos);
app.get("/videos/:id", video.videoDetails);

app.post("/videos", authMiddleware, video.createVideo);
app.put("/videos/:id", authMiddleware, video.editVideo);
app.patch("/videos/:id/publish", authMiddleware, video.publishVideo);
app.post("/videos/:id/like", authMiddleware, video.likeVideo);

app.post("/creators/:id/follow", authMiddleware, video.followCreator);
app.get("/creators/:id", video.creatorProfile);

app.listen(3000);
