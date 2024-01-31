import userData from "../../data/users.json" assert { type: "json" };
import { v4 as uuid } from "uuid";

const createUser = (name, image, password) => {
  const newUser = {
    id: uuid(),
    name,
    image,
    password,
  };
  userData.users.push(newUser);
  return newUser;
};

export default createUser;
