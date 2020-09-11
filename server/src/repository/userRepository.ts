import userModel, { User } from "../models/userModel";

export default {
  async findBySocial(provider: string, id: number): Promise<User | null> {
    const user = await userModel.findOne({
      social: {
        $elemMatch: {
          provider,
          id,
        },
      },
    });
    return user;
  },

  async create(args: {
    username: string;
    social: [{ id: string; provider: string }];
    picture?: string;
    email: string;
  }): Promise<User> {
    //TODO id
    const user = new userModel({
      ...args,
      id: ~~(Math.random() * 1000),
    });
    await user.save();
    return user;
  },
};
