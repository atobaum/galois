const CREATE_ZETTEL = "zettel/CREATE_ZETTEL" as const;
const DELETE_ZETTEL = "zettel/DELETE_ZETTEL" as const;
const UPDATE_ZETTEL = "zettel/UPDATE_ZETTEL" as const;

export const addZetel = (zettel: Zettel) => ({
  type: CREATE_ZETTEL,
  payload: zettel,
});

export const deleteZettelAction = (id: string) => ({
  type: DELETE_ZETTEL,
  payload: id,
});

export const updateZettelAction = (zettel: Zettel) => ({
  type: UPDATE_ZETTEL,
  payload: zettel,
});

type InboxAction =
  | ReturnType<typeof addZetel>
  | ReturnType<typeof deleteZettelAction>
  | ReturnType<typeof updateZettelAction>;

type InboxState = {
  zettels: Zettel[];
};

const initialState: InboxState = {
  zettels: [],
};

export default function inboxReducer(
  state: InboxState = initialState,
  action: InboxAction
): InboxState {
  switch (action.type) {
    case CREATE_ZETTEL:
      return { zettels: [...state.zettels, action.payload] };
    case DELETE_ZETTEL:
      return { zettels: state.zettels.filter((z) => z.id !== action.payload) };
    case UPDATE_ZETTEL:
      return {
        zettels: state.zettels.map((z) =>
          z.id === action.payload.id ? action.payload : z
        ),
      };

    default:
      return state;
  }
}
