import Express from "express";

//controllers
import getCategories from "../controllers/categories/getCategories.js";
import getCategoriesById from "../controllers/categories/getCategoriesById.js";

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
{
  /** 
router.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const category = getCategoriesById([1, 3]);

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
*/
}
export default router;
