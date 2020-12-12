const GUIDE_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";
let guide;

function getData() {
    const $ = window.jQuery;
    $.getJSON(
        GUIDE_URL,
        (json) => guide = json.data
    );
}

(function(tag, src) {
    tag.src = src;
    tag.type = 'text/javascript';
    document.head.appendChild(tag);
    tag.onload = getData
})(document.createElement('script'), 'https://code.jquery.com/jquery-3.5.1.min.js')

module.exports = {
    getData
}
