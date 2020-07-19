import {
  Entity,
  PrimaryColumn,
  OneToOne,
  JoinColumn,
  Column,
  getRepository,
} from "typeorm";
import User from "./User";
import Note from "./Note";

@Entity()
export default class UserMeta {
  @PrimaryColumn()
  fk_user_id!: number;

  @OneToOne((type) => User, (user) => user.userMeta)
  @JoinColumn({ name: "fk_user_id" })
  user!: User;

  @Column()
  fk_inbox_id!: number;

  @OneToOne((type) => Note)
  @JoinColumn({ name: "fk_inbox_id" })
  inbox!: Note;

  static getByUserId(userid: number): Promise<UserMeta> {
    return getRepository(UserMeta)
      .findOne({ fk_user_id: userid })
      .then((res) => {
        if (!res) throw new Error("Inconsistant db: no user meta");
        else return res;
      });
  }
}
