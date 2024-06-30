const bcryptPassword = async (password: string) => {
  return await Bun.password.hash(password);
};

export default bcryptPassword;
