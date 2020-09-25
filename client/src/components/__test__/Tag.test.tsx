import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tag from "../Tag";

describe("<Tag />", () => {
  it("renders properly", () => {
    const { getByText } = render(<Tag name="태그" />);
    const span = getByText("#태그");
    expect(span).not.toHaveStyle("cursor: pointer");
    getByText("#태그");
  });

  it("클릭했을 때 핸들러 호출", () => {
    const onClick = jest.fn();
    const { getByText } = render(<Tag name="태그" onClick={onClick} />);
    const span = getByText("#태그");
    expect(span).toHaveStyle("cursor: pointer");
    fireEvent.click(span);
    expect(onClick).toBeCalledTimes(1);
  });
});
