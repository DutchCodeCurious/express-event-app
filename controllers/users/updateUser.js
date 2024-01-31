import userData from "../../data/users.json" assert { type: "json" };

const upadateUser = (id, name, image, password) => {
  const user = userData.users.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }
  user.name = name ?? user.name;
  user.image = image ?? user.image;
  user.password = password ?? user.password;
  return user;
};

export default upadateUser;
