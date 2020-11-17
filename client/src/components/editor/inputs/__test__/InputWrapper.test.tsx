import React from "react";
import { render } from "@testing-library/react";
import InputWrapper from "../InputWrapper";

describe("<InpurWrapper />", () => {
  it("renders its name and children", () => {
    const { getByText } = render(
      <InputWrapper name="display name">inner component</InputWrapper>
    );

    getByText("display name");
    getByText("inner component");
  });
});
