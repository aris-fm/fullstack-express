import { DataTypes, type Model, type Optional } from "sequelize";
import { db } from "@/config/db.ts";
import { Category } from "@/models/Category.ts";
import type { Transaction as TransactionAttributes } from "@common/types/Transaction.ts";

interface TransactionInstance
  extends
    Model<Optional<TransactionAttributes, "id">>,
    Optional<TransactionAttributes, "id"> {}

export const Transaction = db.define<TransactionInstance>(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
      onDelete: "SET NULL",
      allowNull: true,
    },
  },
  {
    tableName: "transactions",
    freezeTableName: true,
  },
);

// Define the association between Transaction and Category
Transaction.belongsTo(Category, { foreignKey: "category_id" });
Category.hasMany(Transaction, { foreignKey: "category_id" });
