import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class Follow extends Model {
  public id!: number;
  public followerId!: number;
  public followingId!: number;
}

Follow.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    followerId: { type: DataTypes.INTEGER, allowNull: false },
    followingId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, modelName: "Follow" }
);
