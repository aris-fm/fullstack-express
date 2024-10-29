import { Router } from "jsr:@oak/oak/router";
import { getCategories } from "@/controllers/categories/getCategories.ts";
import { getCategoryByName } from "@/controllers/categories/getCategoryByName.ts";
import { createCategory } from "@/controllers/categories/createCategory.ts";

export const categoryRouter = new Router();
categoryRouter.get("/", getCategories);
categoryRouter.get("/:name", getCategoryByName);
categoryRouter.post("/", createCategory);
