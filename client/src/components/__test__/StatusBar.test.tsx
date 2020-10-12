import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import StatusBar from "../core/StatusBar";
import { setTitle } from "../../redux/modules/coreReducer";

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

  it("renders title", () => {
    dispatch(setTitle("test--title"));

    const { getByText } = render(
      <MemoryRouter>
        <StatusBar />
      </MemoryRouter>
    );

    getByText("test--title");
  });
});
