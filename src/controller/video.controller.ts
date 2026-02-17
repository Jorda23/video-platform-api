import { Request, Response } from "express";
import * as videoService from "../services/video.service";

export const createVideo = async (req: Request | any, res: Response) => {
  const video = await videoService.createVideo(req.user.id, req.body);
  res.json(video);
};

export const publishVideo = async (req: Request, res: Response) => {
  const video = await videoService.publishVideo(
    req.params.id as string,
    req.body.published
  );
  res.json(video);
};

export const listVideos = async (req: Request, res: Response) => {
  const videos = await videoService.listVideos();
  res.json(videos);
};

export const videoDetails = async (req: Request, res: Response) => {
  const video = await videoService.videoDetails(req.params.id as string);
  res.json(video);
};

export const editVideo = async (req: Request, res: Response) => {
  const video = await videoService.editVideo(req.params.id as string, req.body);
  res.json(video);
};

export const likeVideo = async (req: Request | any, res: Response) => {
  const like = await videoService.likeVideo(req.user.id, req.params.id as string);
  res.json(like);
};

export const followCreator = async (req: Request | any, res: Response) => {
  const follow = await videoService.followCreator(
    req.user.id,
    req.params.id as string
  );
  res.json(follow);
};

export const creatorProfile = async (req: Request, res: Response) => {
  const profile = await videoService.creatorProfile(req.params.id as string);
  res.json(profile);
};
