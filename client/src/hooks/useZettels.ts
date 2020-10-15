import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import { getZettelsQuery } from "../api/zettelQuery";

type useZettelsArgs = {};

export default function useZettels(
  option?: useZettelsArgs
): {
  fetchMore: () => void;
  zettels: Zettel[];
  done: boolean;
  loading: boolean;
} {
  const [done, setDone] = useState(false);

  const { data, loading, fetchMore: fetchMoreGql } = useQuery(getZettelsQuery, {
    variables: {
      limit: 10,
    },
  });

  const fetchMore = () => {
    if (!done)
      fetchMoreGql({
        variables: { cursor: data.zettels.nextCursor },
        updateQuery: (prev: any, { fetchMoreResult }: any) => {
          if (!fetchMoreResult) return prev;
          if (fetchMoreResult.zettels.data.length === 0) setDone(true);
          return {
            zettels: {
              ...prev.zettels,
              nextCursor: fetchMoreResult.zettels.nextCursor,
              data: [...prev.zettels.data, ...fetchMoreResult.zettels.data],
            },
          };
        },
      });
  };

  const zettels: Zettel[] = useMemo(
    () =>
      data
        ? data.zettels.data.map((z: any) => ({
            ...z,
            createdAt: new Date(z.createdAt),
          }))
        : [],
    [data]
  );

  return {
    loading,
    fetchMore,
    done,
    zettels,
  };
}
