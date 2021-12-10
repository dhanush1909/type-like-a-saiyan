export default {
    init: (Vue) => {
        Vue.prototype.$theme = new Theme();
    }
}

const DEFAULT_THEME = 'light';
const ALL_THEMES = ['light', 'gotham'];

class Theme {
    currentTheme;

    constructor() {
        const userPreference = localStorage.getItem("tls-theme");
        this.setTheme(userPreference || DEFAULT_THEME)
    }

    setTheme(newTheme) {
        let body = document.querySelector("body");
        for (let idx in ALL_THEMES) {
            if (newTheme === ALL_THEMES[idx]) {
                body.classList.add(newTheme);
            } else {
                body.classList.remove(ALL_THEMES[idx]);
            }
        }

        localStorage.setItem("tls-theme", newTheme);
        this.currentTheme = newTheme;
    }
}