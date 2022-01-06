import { Auth0Plugin } from "../auth";

const domain = "dev-68h8t4kz.us.auth0.com";
const clientId = "M4HnhOTuiuZsRKPstNDtu7ixBk3NPCXo";

export default {
  init: (Vue, router) => {
    Vue.use(Auth0Plugin, {
      domain,
      clientId,
      onRedirectCallback: (appState) => {
        router.push(
          appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
        );
      },
    });
  },
};
