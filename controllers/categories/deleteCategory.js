import categorieData from "../../data/categories.json" assert { type: "json" };

const deleteCategory = (id) => {
  const index = categorieData.categories.find((category) => category.id === id);

  if (index === -1) {
    console.log("Null");
    return null;
  }

  categorieData.categories.splice(index, 1);
  console.log(id);
  return id;
};

export default deleteCategory;
