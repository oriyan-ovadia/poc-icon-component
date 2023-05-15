import type { Preview } from "@storybook/react";
import "./global.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

export default preview;
