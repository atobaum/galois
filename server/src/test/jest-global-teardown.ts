import { getConnection } from "typeorm";

module.exports = async () => {
  const conn = getConnection();
  await conn.close();
};
