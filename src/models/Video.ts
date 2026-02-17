import { DataTypes, Model } from "sequelize";
import { sequelize } from "../sequelize";

export class Video extends Model {
  public id!: number;
  public title!: string;
  public url!: string;
  public published!: boolean;
  public userId!: number;
}

Video.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    published: { type: DataTypes.BOOLEAN, defaultValue: false }
  },
  { sequelize, modelName: "Video" }
);
