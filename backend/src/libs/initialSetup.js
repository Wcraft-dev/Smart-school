import Role from "../models/role.model";
export const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count) return;
    const values = await Promise.all([
      new Role({ name: "student" }).save(),
      new Role({ name: "director" }).save(),
      new Role({ name: "teacher" }).save(),
      new Role({ name: "parents" }).save(),
      new Role({ name: "God" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.log("look at error that happend" + error);
  }
};
