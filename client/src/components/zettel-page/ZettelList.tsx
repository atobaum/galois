// eslint-disable-next-line
import React, { useEffect, useState } from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelListItem from "./ZettelListItem";
import { Link } from "react-router-dom";
import useZettels from "../../hooks/useZettels";

const ZettelListCss = css`
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

type ZettelListProps = {};

function ZettelList(props: ZettelListProps) {
  const [zettels, setZettels] = useState<Zettel[]>([]);
  const { loading, done, fetchMore, zettels: data } = useZettels();

  useEffect(() => {
    if (data) setZettels(data);
  }, [setZettels, data]);

  return (
    <div css={ZettelListCss} className="zettel-list">
      {zettels.map((zettel) => (
        <Link
          key={zettel.id}
          to={"/zettel/" + zettel.number}
          onDragStart={(e) => {
            e.dataTransfer.setData(
              "text/plain",
              `[[${zettel.number}${zettel.title ? "|" + zettel.title : ""}]]`
            );
          }}
        >
          <ZettelListItem {...zettel} />
        </Link>
      ))}
      {!done && <button onClick={fetchMore}>fetch more</button>}
    </div>
  );
}

export default ZettelList;
