import Express from "express";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
//controllers
import getCategories from "../controllers/categories/getCategories.js";
import getCategoriesById from "../controllers/categories/getCategoriesById.js";
import createCategory from "../controllers/categories/createCategory.js";
import updateCategory from "../controllers/categories/updateCategory.js";
import deleteCategory from "../controllers/categories/deleteCategory.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();

    res.status(200).json(categories);
    console.log("Categories sent");
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Something went wrong by getting categories" });
  }
});

//Make sure you can search for multiple categories id's
router.get(
  "/:id",
  async (req, res) => {
    try {
      const { id } = req.params;
      const category = await getCategoriesById(id);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong by creating category" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = await updateCategory(id, name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = deleteCategory(id);

    res.status(200).json({
      message: `Category with id ${id} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
});
export default router;
