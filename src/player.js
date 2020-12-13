const GUIDE_URL = "https://guidedlearning.oracle.com/player/latest/api/scenario/get/v_IlPvRLRWObwLnV5sTOaw/5szm2kaj/?callback=?";
let guide;
let curStep = 1;
let steps;
let $;

function getData() {
    $ = window.jQuery;
    $.getJSON(
        GUIDE_URL,
        (json) => {
            guide = json.data;
            steps = guide.structure.steps;
            $(document.body).append("<style>" + guide.css + "</style>");
            $(document.body).append("<div  class='sttip'> " +
                "<div class='tooltip in'> " +
                "<div class='tooltip-arrow'></div>" +
                "<div class='tooltip-arrow second-arrow'></div>" +
                "<div class='popover-inner'>" +
                guide.tiplates.tip +
                "</div>" +
                "</div>" +
                "</div>");
            $("span[data-iridize-role='stepsCount']").text(steps.length);
            $("a[data-iridize-role='nextBt']").click(handleNextClick);
            $("button[data-iridize-role='prevBt']").click(handlePrevClick);
            setContent();
        }
    );
}

function setContent() {
    $("span[data-iridize-role='stepCount']").text(curStep);
    let content;
    if (steps[curStep - 1].action.type === 'tip') {
        content = steps[curStep - 1].action.contents["#content"];
        setPosition();
    } else {
        content = '<p>Thank you for Taking guided learning</p>';
    }

    $("div[data-iridize-id='content']").html(content);
}

function isValid(top, left, maxLeft, maxTop) {
    return top >= 0 && top <= maxTop && left >= 0 && left <= maxLeft;
}

function getBestPosition(elementPosition, tooltipPosition, bodyPosition) {
    const maxLeft = bodyPosition.width - tooltipPosition.width;
    const maxTop = bodyPosition.height - tooltipPosition.height;
    let top, left;
    top = elementPosition.top;
    left = elementPosition.left + elementPosition.width;
    if (isValid(top, left, maxLeft, maxTop)) return {top: top, left: left};
    top = elementPosition.top + elementPosition.height;
    left = elementPosition.left
    if (isValid(top, left, maxLeft, maxTop)) return {top: top, left: left}
    top = elementPosition.top;
    left = elementPosition.left - tooltipPosition.width;
    if (isValid(top, left, maxLeft, maxTop)) return {top: top, left: left}
    top = elementPosition.top - tooltipPosition.height;
    left = elementPosition.left
    return {top: top, left: left}
}

function setPosition() {
    const elements = $(steps[curStep - 1].action.selector);
    const elementPosition = elements[elements.length - 1].getBoundingClientRect();
    const tooltipPosition = $('.tooltip')[0].getBoundingClientRect();
    const bodyPosition = $(document.body)[0].getBoundingClientRect();

    const position = getBestPosition(elementPosition, tooltipPosition, bodyPosition);

    $('.sttip').css({position: 'absolute', ...position});
}

function handleNextClick() {
    ++curStep;
    setContent();
    if (curStep > 1) {
        $("button[data-iridize-role='prevBt']").removeClass('default-prev-btn');
    }
    if (curStep === steps.length) {
        $("a[data-iridize-role='nextBt']").css({display: 'none'})
    }
}

function handlePrevClick() {
    --curStep;
    setContent();
    if (curStep === 1) {
        $("button[data-iridize-role='prevBt']").addClass('default-prev-btn');
    }
    if (curStep < steps.length) {
        $("a[data-iridize-role='nextBt']").css({display: 'block'})
    }
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
    getData,
    getBestPosition
}
