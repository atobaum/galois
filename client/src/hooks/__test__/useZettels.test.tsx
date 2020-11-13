import React from "react";
import { MockedProvider } from "@apollo/client/testing";
import { getZettelsQuery } from "../../api/zettelQuery";
import { renderHook } from "@testing-library/react-hooks";
import useZettels from "../useZettels";
describe("useZettels", () => {
  const testZettel = {
    id: "123",
    number: 12,
    createdAt: "2020-08-08",
    title: "asdf",
    content: "Zxcv",
    contentType: "MARKDOWN",
    tags: [],
    updatedAt: "2020-08-08",
  };
  const mockedZettels = Object.keys(new Array(20).fill(0)).map((id) => ({
    ...testZettel,
    id: id,
  }));

  const mocks = [
    {
      request: {
        query: getZettelsQuery,
        variables: {
          limit: 10,
        },
      },
      result: {
        data: {
          zettels: {
            nextCursor: "9",
            data: mockedZettels.slice(0, 10),
          },
        },
      },
    },
    {
      request: {
        query: getZettelsQuery,
        variables: {
          limit: 10,
          cursor: "9",
        },
      },
      result: {
        data: {
          zettels: {
            nextCursor: "9",
            data: mockedZettels.slice(10, 20),
          },
        },
      },
    },
  ];
  const wrapper = ({ children }: any) => (
    <MockedProvider mocks={mocks}>{children}</MockedProvider>
  );

  it("fetchMore", async (done) => {
    const { result, waitForNextUpdate } = renderHook(() => useZettels(), {
      wrapper,
    });

    await waitForNextUpdate();

    expect(result.current.zettels).toHaveLength(10);

    result.current.fetchMore();
    await waitForNextUpdate();
    expect(result.current.zettels).toHaveLength(20);
    done();
  });
});
