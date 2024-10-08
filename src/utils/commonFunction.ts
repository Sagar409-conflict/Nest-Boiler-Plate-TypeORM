// import Cryptr from 'cryptr';
// const cryptr = new Cryptr('myTotallySecretKey');

// export const encryptPassword = async (password: string) => {
//   return cryptr.encrypt(password);
// };
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const hashPassword = async (plainPassword: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(plainPassword, salt);
  return hashPassword;
};

export const matchPassword = async (
  plainPassword: string,
  hashPassword: string,
) => {
  return await bcrypt.compare(plainPassword, hashPassword);
};

export const metaDataForPaginations = async (
  page: number,
  limit: number,
  count: number,
) => {
  return {
    currentPage: Math.abs(page),
    currentLimit: Math.abs(limit),
    totalPages: Math.ceil(count / limit),
    totalRecords: count,
  };
};
