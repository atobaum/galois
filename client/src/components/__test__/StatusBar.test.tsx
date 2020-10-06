import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import StatusBar from "../core/StatusBar";

jest.mock("../../hooks/useCurrentUser");
jest.mock("react-redux");

describe("<StatusBar />", () => {
  const dispatch = useDispatch();
  it("renders properly", () => {
    const { getByText } = render(
      <MemoryRouter>
        <StatusBar />
      </MemoryRouter>
    );
  });

  it("새 제텔 만들기 버튼", () => {
    const { getByText } = render(
      <MemoryRouter>
        <StatusBar />
      </MemoryRouter>
    );

    const newBtn = getByText("New");

    fireEvent.click(newBtn);
    expect(dispatch).toHaveBeenLastCalledWith({
      type: "editor/START_EDIT",
      payload: null,
    });
  });
});
