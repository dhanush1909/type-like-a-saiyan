import FontAwesomePlugin from "./fontAwesome";
import ThemePlugin from "./theme";
import Auth from "./auth0";

export default function (Vue, attributes) {
  FontAwesomePlugin.init(Vue);
  ThemePlugin.init(Vue);
  Auth.init(Vue, attributes.router);
}
