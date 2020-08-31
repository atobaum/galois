import { Zettel } from "../models/Zettel";

const ADD_ZETTEL = "zettel/ADD_ZETTEL" as const;

export const addZetel = (zettel: Zettel) => ({
  type: ADD_ZETTEL,
  payload: zettel,
});

type InboxAction = ReturnType<typeof addZetel>;

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
    case ADD_ZETTEL:
      return { zettels: [...state.zettels, action.payload] };
    default:
      return state;
  }
}
