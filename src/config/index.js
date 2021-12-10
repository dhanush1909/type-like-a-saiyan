import FontAwesomePlugin from "./fontAwesome";
import ThemePlugin from "./theme";

export default function (Vue) {
    FontAwesomePlugin.init(Vue);
    ThemePlugin.init(Vue);
}