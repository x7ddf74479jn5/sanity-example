import type { ComponentMeta, ComponentStoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";

import { PrimaryButton } from ".";

export default {
  title: "atoms/buttons/PrimaryButton",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

export const Index: ComponentStoryObj<typeof PrimaryButton> = {
  args: {
    children: "label",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: "label" }));
    await userEvent.click(canvas.getByRole("button", { name: "label" }));
  },
};
