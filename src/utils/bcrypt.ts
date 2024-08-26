import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedpassword: string
): Promise<boolean> => {
  const isPasswordMatched = await bcrypt.compare(password, hashedpassword);
  return isPasswordMatched;
};
