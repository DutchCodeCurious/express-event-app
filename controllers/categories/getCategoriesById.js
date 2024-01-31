import categorieData from "../../data/categories.json" assert { type: "json" };

const getCategoriesById = (ids) => {
  let categories = [];
  ids.forEach((id) => {
    const categorie = categorieData.categories.find(
      (categorie) => categorie.id === Number(id)
    );
    if (categorie) {
      categories.push(categorie);
    }
  });
  return categories;
};

export default getCategoriesById;
