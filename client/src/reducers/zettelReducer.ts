import { Zettel } from "../models/Zettel";

const CREATE_ZETTEL = "zettel/CREATE_ZETTEL" as const;
const DELETE_ZETTEL = "zettel/DELETE_ZETTEL" as const;

export const addZetel = (zettel: Zettel) => ({
  type: CREATE_ZETTEL,
  payload: zettel,
});

export const deleteZettelAction = (id: number) => ({
  type: DELETE_ZETTEL,
  payload: id,
});

type InboxAction =
  | ReturnType<typeof addZetel>
  | ReturnType<typeof deleteZettelAction>;

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

    default:
      return state;
  }
}
