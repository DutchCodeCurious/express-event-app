import categoryDate from "../../data/categories.json" assert { type: "json" };

const updateCategory = (id, name) => {
  const category = categoryDate.categories.find(
    (category) => category.id === id
  );

  if (!category) {
    throw new Error("Category not found");
  }

  category.name = name ?? category.name;
  return category;
};

export default updateCategory;
