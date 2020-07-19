import { Note, SourceType, Source } from "../lib/models/Note";

const ADD_SCRAP = "links/ADD_SCRAP" as const;
const REMOVE_SCRAP = "links/REMOVE_SCRAP" as const;
const TOGGLE_READ = "links/TOGGLE_READ" as const;

const ADD_TAG = "links/ADD_TAG" as const;
const REMOVE_TAG = "links/REMOVE_TAG" as const;

export const addLink = (url: string) => ({
  type: ADD_SCRAP,
  payload: { type: SourceType.url, content: url } as Source,
});

export const addMemo = (content: string) => ({
  type: ADD_SCRAP,
  payload: { type: SourceType.memo, content } as Source,
});

export const removeScrap = (id: string) => ({
  type: REMOVE_SCRAP,
  payload: id,
});

export const toggleRead = (id: string) => ({
  type: TOGGLE_READ,
  payload: id,
});

export const addTag = (linkId: string, tag: string) => ({
  type: ADD_TAG,
  payload: {
    linkId,
    tag,
  },
});

export const removeTag = (linkId: string, tag: string) => ({
  type: REMOVE_TAG,
  payload: {
    linkId,
    tag,
  },
});

type LinksAction =
  | ReturnType<typeof addLink>
  | ReturnType<typeof removeScrap>
  | ReturnType<typeof toggleRead>
  | ReturnType<typeof addTag>
  | ReturnType<typeof removeTag>;

const initialState: Note[] = [
  {
    id: "123",
    createdAt: "2020-01-01T01:01Z",
    updatedAt: "2020-01-01T01:01Z",
    title: "Google",
    tags: [],
    source: {
      type: SourceType.url,
      content: "https://google.com",
    },
    content: "test content",
  },
];

function linksReducer(state: Note[] = initialState, action: LinksAction) {
  switch (action.type) {
    case ADD_SCRAP:
      const nextId = Math.floor(Math.random() * 10000) + "";
      return state.concat({
        id: nextId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        title: action.payload.content,
        tags: [],
        source: action.payload,
      });

    case REMOVE_SCRAP:
      return state.filter((link) => link.id !== action.payload);

    case TOGGLE_READ:
      return state.map((link) =>
        link.id === action.payload
          ? {
              ...link,
            }
          : link
      );

    case ADD_TAG:
      return state.map((link) =>
        link.id !== action.payload.linkId
          ? link
          : { ...link, tags: link.tags.concat(action.payload.tag) }
      );

    case REMOVE_TAG:
      return state.map((link) =>
        link.id !== action.payload.linkId
          ? link
          : {
              ...link,
              tags: link.tags.filter((tag) => tag !== action.payload.tag),
            }
      );

    default:
      return state;
  }
}

export default linksReducer;
