import { useLazyQuery } from "@apollo/client";
import { getZettelQuery } from "../api/zettelQuery";

export default function useZettel(
  id: number
): { zettel?: Zettel; loading?: boolean } {
  const [query, { data, loading, error, called }] = useLazyQuery(
    getZettelQuery,
    {
      variables: { id },
    }
  );

  if (!id) return {};
  if (!called) query();
  if (error) console.log(error);

  if (data) return { zettel: data.zettel, loading };
  else return { loading };
}
