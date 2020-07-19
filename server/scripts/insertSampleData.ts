import "../src/env";
import { createConnection, getRepository, getManager } from "typeorm";
import User from "../src/entity/User";
import Note, { ContentType } from "../src/entity/Note";

createConnection()
  .then(async (connection) => {
    const user = new User();
    user.email = "testuser1@test.com";
    user.username = "testuser1";
    await user.setPassword("1234");
    await getRepository(User).save(user);
    await user.initUser();

    const admin = new User();
    admin.email = "admin@admin.com";
    admin.username = "admin";
    await admin.setPassword("password");
    await getRepository(User).save(admin);
    await admin.initUser();

    const note = new Note();
    note.author = user;
    note.contentType = ContentType.plain;
    note.title = "testpost";
    note.content = "testpostcontent";
    await getRepository(Note).save(note);
  })
  .catch((err) => console.log(err));
