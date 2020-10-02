import { getManager } from "typeorm";
import postgrasqlLoader from "../loaders/postgresqlLoader";

import initState from "./initState";

export default async () => {
  const existedUser = initState.user;
  if (!process.env.TYPEORM_DATABASE)
    process.env.TYPEORM_DATABASE = "galois_test";
  await postgrasqlLoader();
  const manager = getManager();
  await manager.query("DELETE FROM revision;");
  await manager.query("DELETE FROM zettel;");
  await manager.query("DELETE FROM social_account;");
  await manager.query("DELETE FROM refresh_token;");
  await manager.query("DELETE FROM user_account;");
  await manager.query(
    `insert into user_account (id, username, email, thumbnail) values (${existedUser.id} ,'${existedUser.username}', '${existedUser.email}', '${existedUser.thumbnail}') returning id;`
  );

  await manager.query(
    `insert into social_account (fk_user_id, provider, social_id) values (${existedUser.id}, '${existedUser.socialAccount.provider}', '${existedUser.socialAccount.socialId}');`
  );

  const zettel = initState.zettel;

  const insertZettelQuery = `insert into zettel  (id, title, fk_user_id) values (${zettel.id}, '${zettel.title}', '${existedUser.id}');`;
  const insertRevisionQuery = `insert into revision ("content","type",uuid,"version",zettel_id) values ('${zettel.content}', '${zettel.contentType}', '${zettel.uuid}', ${zettel.version}, ${zettel.id});`;
  await manager.query(insertZettelQuery);
  await manager.query(insertRevisionQuery);
};
