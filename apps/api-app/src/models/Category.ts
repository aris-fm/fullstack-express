import { DataTypes, type Model, type Optional } from "sequelize";
import { db } from "@/config/db.ts";
import type { Category as CategoryAttributes } from "@common/types/Category.ts";

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id"> {}

interface CategoryInstance
  extends
    Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {}

export const Category = db.define<CategoryInstance>(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("income", "expense"),
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "categories",
    timestamps: false,
    freezeTableName: true,
  },
);
