export default {
    init: (Vue) => {
        Vue.directive('spinner', {
            bind: (el, { value, oldValue }) => {
                if (value == oldValue) return;
                toggleSpinner(value);
            },
            update: (el, { value, oldValue }) => {
                if (value == oldValue) return;
                toggleSpinner(value);

            }
        })
    },
}

function toggleSpinner(value) {
    if (value) {
        // we also need to add unique id to the div because we need to only remove 
        // div when this id when value is false. we can use el's name as id
        let loadingDiv = document.createElement('div');
        loadingDiv.classList.add('loading-spinner');
        const spinnerIcon = spinnerSvg();
        loadingDiv.innerHTML = spinnerIcon;
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(loadingDiv);
    } else {
        let loadingDiv = document.getElementsByClassName('loading-spinner');
        for (let div of loadingDiv) {
            div.remove();
        }
    }
}

function spinnerSvg() {
    return `
        <svg height="6%" version="1.1" id="L2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
            <circle fill="none" stroke="#fff" stroke-width="4" stroke-miterlimit="10" cx="50" cy="50" r="48"/>
            <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="85" y2="50.5">
                <animateTransform 
                    attributeName="transform" 
                    dur="2s"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite" />
            </line>
            <line fill="none" stroke-linecap="round" stroke="#fff" stroke-width="4" stroke-miterlimit="10" x1="50" y1="50" x2="49.5" y2="74">
                <animateTransform 
                    attributeName="transform" 
                    dur="15s"
                    type="rotate"
                    from="0 50 50"
                    to="360 50 50"
                    repeatCount="indefinite" />
            </line>
        </svg>
    `;
}