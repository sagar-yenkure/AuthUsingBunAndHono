const comparePassword = async (password: string, hash: string) => {
  return Bun.password.verify(password, hash);
};

export default comparePassword;
