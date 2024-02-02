import Express from "express";

//controllers
import getCategories from "../controllers/categories/getCategories.js";
import getCategoriesById from "../controllers/categories/getCategoriesById.js";
import createCategory from "../controllers/categories/createCategory.js";
import updateCategory from "../controllers/categories/updateCategory.js";
import deleteCategory from "../controllers/categories/deleteCategory.js";

const router = Express.Router();

router.get("/", (req, res) => {
  try {
    const categories = getCategories();
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
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = getCategoriesById(id);

    if (!category) {
      res.status(404).send({ message: "Category not found" });
    } else {
      res.status(200).json(category);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong by getting category" });
  }
});

router.post("/", (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = createCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong by creating category" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedCategory = updateCategory(id, name);
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong by updating category" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = getCategoriesById(id).name;
    const deletedCategory = deleteCategory(id);

    if (!deletedCategory) {
      res.status(404).send({ message: "Category not found" });
    } else {
      res
        .status(200)
        .json({ message: `Category ${category} has been deleted` });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: "Something went wrong by deleting category" });
  }
});
export default router;
