import userModel, { User } from "@src/models/userModel";

export default {
  async findById(id: number): Promise<User | null> {
    const user = await userModel.findOne({ id });
    return user;
  },

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
