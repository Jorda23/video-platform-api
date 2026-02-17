import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class Like extends Model {
  public id!: number;
  public userId!: number;
  public videoId!: number;
}

Like.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    videoId: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, modelName: "Like" }
);
