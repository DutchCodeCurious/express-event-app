import categorieData from "../../data/categories.json" assert { type: "json" };

const getCategories = () => {
  return categorieData.categories;
};

export default getCategories;
