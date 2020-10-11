const SET_USER = "core/SET_USER" as const;
const UNSET_USER = "core/UNSET_USER" as const;
const SET_TITLE = "core/SET_TITLE" as const;

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});

export const unsetUser = () => ({
  type: UNSET_USER,
});

export const setTitle = (title: string) => ({
  type: SET_TITLE,
  payload: title,
});

type User = {
  username: string;
  email: string;
  picture?: string;
};

type CoreAction =
  | ReturnType<typeof setUser>
  | ReturnType<typeof unsetUser>
  | ReturnType<typeof setTitle>;

type CoreState = {
  user: User | null;
  title: string;
};

const initState = {
  user: null,
  title: "",
};

export default function coreReducer(
  state: CoreState = initState,
  action: CoreAction
): CoreState {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload, title: state.title };
    case UNSET_USER:
      return { user: null, title: state.title };
    case SET_TITLE:
      return {
        user: state.user,
        title: action.payload,
      };
    default:
      return state;
  }
}
