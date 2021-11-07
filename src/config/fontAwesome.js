import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
    init: (Vue) => {
        // TODO: Once we become stable, import individual icons as needed instead of entire pack
        library.add(fas);

        // register global component
        Vue.component('font-awesome-icon', FontAwesomeIcon);
    }
}
