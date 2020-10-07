// eslint-disable-next-line
import React, { useEffect, useState } from "react";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import ZettelListItem from "./ZettelListItem";
import { getZettels } from "../../api/zettelApi";
import useCurrentUser from "../../hooks/useCurrentUser";
import { Link } from "react-router-dom";

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
  const user = useCurrentUser();
  const [zettels, setZettels] = useState<Zettel[]>([]);

  useEffect(() => {
    if (user)
      getZettels().then((data) => {
        setZettels(data);
      });
  }, [, user]);

  return (
    <div css={ZettelListCss} className="zettel-list">
      {zettels.map((zettel) => (
        <Link key={zettel.id} to={"/zettel/" + zettel.id}>
          <ZettelListItem {...zettel} />
        </Link>
      ))}
    </div>
  );
}

export default ZettelList;
