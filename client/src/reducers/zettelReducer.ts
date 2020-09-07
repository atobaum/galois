import { Zettel } from "../models/Zettel";

const CREATE_ZETTEL = "zettel/CREATE_ZETTEL" as const;

export const addZetel = (zettel: Zettel) => ({
  type: CREATE_ZETTEL,
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
    case CREATE_ZETTEL:
      return { zettels: [...state.zettels, action.payload] };
    default:
      return state;
  }
}
