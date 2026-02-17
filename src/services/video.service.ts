import { Video } from "../models/Video";
import { Like } from "../models/Like";
import { Follow } from "../models/Follow";
import { User } from "../models/User";

export const createVideo = async (userId: number, data: any) => {
  return Video.create({ ...data, userId });
};

export const publishVideo = async (videoId: string | number, published: boolean) => {
  const video = await Video.findByPk(videoId);
  if (!video) throw new Error("Video not found");

  video.published = published;
  await video.save();
  return video;
};

export const listVideos = async () => {
  return Video.findAll({ where: { published: true } });
};

export const videoDetails = async (id: string | number) => {
  return Video.findByPk(id);
};

export const editVideo = async (id: string | number, data: any) => {
  const video = await Video.findByPk(id);
  if (!video) throw new Error("Video not found");

  delete data.published; 

  return video.update(data);
};

export const likeVideo = async (userId: number, videoId: string | number) => {
  return Like.create({ userId, videoId } as any);
};

export const followCreator = async (userId: number, creatorId: string | number) => {
  return Follow.create({ followerId: userId, followingId: creatorId } as any);
};

export const creatorProfile = async (creatorId: string | number) => {
  const creator = await User.findByPk(creatorId);

  const videos = await Video.findAll({ where: { userId: creatorId } });
  const followers = await Follow.count({ where: { followingId: creatorId } });
  const likes = await Like.count({});

  return {
    creator,
    videos,
    followers,
    likes
  };
};
