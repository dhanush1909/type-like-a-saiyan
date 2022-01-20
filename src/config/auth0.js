import { Auth0Plugin } from "../auth";

const domain = "dev-68h8t4kz.us.auth0.com";
const clientId = "Be9YSD3SYhdGlKgSUXANBcPG51HsKEOz";

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
