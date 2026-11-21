import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { EmailField } from "./email-field";

it("has no accessibility violations (valid state)", async () => {
  const { container } = render(<EmailField />);
  expect(await axe(container)).toHaveNoViolations();
});

it("has no accessibility violations (error state)", async () => {
  const { container } = render(<EmailField error="Enter a valid email address." />);
  expect(await axe(container)).toHaveNoViolations();
});