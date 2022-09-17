module.exports = {
  stories: ["../app/components/**/*.stories.js"],
  staticDirs: ["../public"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/preset-create-react-app", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5"
  },
  features: {
    interactionsDebugger: true
  }
}
