var theme = "#1E90FF";
export default class Theme {
  getTheme = data => {
    theme = data;
  };
  putTheme = () => {
    return theme;
  };
}
