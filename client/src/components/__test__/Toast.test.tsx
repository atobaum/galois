import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { closeToast } from "../../redux/modules/toast";
import Toast from "../core/Toast";

jest.mock("react-redux");

describe("<Toast />", () => {
  it("renders properly", () => {
    const { getByText } = render(<Toast />);
  });

  it("클릭했을 때 핸들러 호출", () => {
    const dispatch = useDispatch();
    const { getByText } = render(<Toast />);
    const closeBtn = getByText("X");
    fireEvent.click(closeBtn);
    expect(dispatch).toBeCalledWith(closeToast());
  });
});
