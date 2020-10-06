import { Zettel } from "../../models/Zettel";

const SET_ZETTLES = "zettel-grid/SET_ZETTELS" as const;
const APPEND_ZETTLES = "zettel-grid/APPEND_ZETTELS" as const;
const CREATE_ZETTEL = "zettel-grid/CREATE_ZETTEL" as const;
const SAVE_SUCCESS = "zettel-grid/SAVE_SUCCESS" as const;
const SAVE_FAILURE = "zettel-grid/SAVE_FAILUER" as const;

type NewZettel = Omit<Zettel, "id">;

type PendingZettel = {
  loading: boolean;
  zettel: NewZettel;
};

export const setZettelsToGrid = (zettels: Zettel[]) => ({
  type: SET_ZETTLES,
  payload: zettels,
});

export const appendZettelsToGrid = (zettels: Zettel[]) => ({
  type: APPEND_ZETTLES,
  payload: zettels,
});

export const createZettelAction = (zettel: NewZettel) => ({
  type: CREATE_ZETTEL,
  payload: zettel,
});

export const saveSuccessed = (oldZettel: NewZettel, newZettel: Zettel) => ({
  type: SAVE_SUCCESS,
  payload: {
    oldZettel,
    newZettel,
  },
});

export const saveFailed = (zettel: NewZettel) => ({
  type: SAVE_FAILURE,
  payload: zettel,
});

type ZettelGridAction =
  | ReturnType<typeof setZettelsToGrid>
  | ReturnType<typeof appendZettelsToGrid>
  | ReturnType<typeof createZettelAction>
  | ReturnType<typeof saveSuccessed>
  | ReturnType<typeof saveFailed>;

type ZettelGridState = {
  zettels: Zettel[];
  pendings: PendingZettel[];
};

const initState: ZettelGridState = {
  zettels: [],
  pendings: [],
};

export const zettelGridReducer = (
  state: ZettelGridState = initState,
  action: ZettelGridAction
): ZettelGridState => {
  switch (action.type) {
    case SET_ZETTLES:
      return { ...state, zettels: action.payload };
    case APPEND_ZETTLES:
      return { ...state, zettels: [...state.zettels, ...action.payload] };
    case CREATE_ZETTEL:
      return {
        ...state,
        pendings: [
          { loading: true, zettel: action.payload },
          ...state.pendings,
        ],
      };
    case SAVE_SUCCESS:
      const { oldZettel, newZettel } = action.payload;
      return {
        zettels: [newZettel, ...state.zettels],
        pendings: state.pendings.filter((z) => z.zettel !== oldZettel),
      };
    case SAVE_FAILURE:
      return {
        zettels: state.zettels,
        pendings: state.pendings.map((z) =>
          z.zettel === action.payload ? { loading: false, zettel: z.zettel } : z
        ),
      };
    default:
      return state;
  }
};
