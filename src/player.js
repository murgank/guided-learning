const GUIDE_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";
let guide;

function getData() {
    const $ = window.jQuery;
    $.getJSON(
        GUIDE_URL,
        (json) => {
            guide = json.data;
            $("body").append("<style>" + guide.css+ "</style>"
                +"<div  class='sttip'> " +
                "<div class='tooltip in'> " +
                "<div class='tooltip-arrow'></div>" +
                "<div class='tooltip-arrow second-arrow'></div>" +
                "<div class='popover-inner'>" +
                guide.tiplates.tip + guide.tiplates.hoverTip+
                "</div>" +
                "</div>" +
                "</div>");
        }
    );
}

(function (tag, src) {
    tag.src = src;
    tag.type = 'text/javascript';
    document.head.appendChild(tag);
    tag.onload = getData
})(document.createElement('script'), 'https://code.jquery.com/jquery-3.5.1.min.js');

(function (tag, src) {
    tag.rel = 'stylesheet';
    tag.href = src;
    document.head.appendChild(tag);
})(document.createElement('link'), 'https://guidedlearning.oracle.com/player/latest/static/css/stTip.css');

module.exports = {
    getData
}
