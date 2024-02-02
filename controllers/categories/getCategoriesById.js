import categorieData from "../../data/categories.json" assert { type: "json" };

const getCategoriesById = (id) => {
  return categorieData.categories.find((categorie) => categorie.id === id);
};

export default getCategoriesById;
