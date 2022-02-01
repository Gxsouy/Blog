import DefaultTheme from "vitepress/theme";
import "./custom.styl";

// figlet -f big "Gxsouy"
console.log(
  `%c
   _____
  / ____|
 | |  ____  _____  ___  _   _ _   _
 | | |_ \\ \\/ / __|/ _ \\| | | | | | |
 | |__| |>  <\\__ \\ (_) | |_| | |_| |
  \\_____/_/\\_\\___/\\___/ \\__,_|\\__, |
                               __/ |
                              |___/
`,
  "color: #42b983"
);
console.log(`%c微信/微博, 可添加：%cGxsouy`, "color: red", "color: #42b983");
export default DefaultTheme;
