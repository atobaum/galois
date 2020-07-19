const SET_USER = "core/SET_USER" as const;
const UNSET_USER = "core/UNSET_USER" as const;

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const unsetUser = () => ({
  type: UNSET_USER,
});

type User = {
  username: string;
  email: string;
};

type CoreAction = ReturnType<typeof setUser> | ReturnType<typeof unsetUser>;

type CoreState = {
  user: User | null;
};

const initState = {
  user: null,
};

export default function coreReducer(
  state: CoreState = initState,
  action: CoreAction
): CoreState {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case UNSET_USER:
      return { user: null };
    default:
      return state;
  }
}
