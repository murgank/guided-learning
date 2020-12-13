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
            $(document.body).append("<style>" + guide.css+ "</style>");
            setContent();
        }
    );
}

function setContent() {
    $(".sttip").remove();
    let selector;
    let content;
    if(steps[curStep-1].action.type === 'tip') {
        selector = steps[curStep-1].action.selector;
        content = steps[curStep-1].action.contents["#content"];
    } else {
        content = '<p>Thank you for Taking guided learning</p>';
        selector = 'body';
    }
    $(selector).after("<div  class='sttip'> " +
        "<div class='tooltip in'> " +
        "<div class='tooltip-arrow'></div>" +
        "<div class='tooltip-arrow second-arrow'></div>" +
        "<div class='popover-inner'>" +
        guide.tiplates.tip +
        "</div>" +
        "</div>" +
        "</div>");
    $("span[data-iridize-role='stepsCount']").text(steps.length);
    $("span[data-iridize-role='stepCount']").text(curStep);
    $("a[data-iridize-role='nextBt']").click(handleNextClick);
    $("button[data-iridize-role='prevBt']").click(handlePrevClick);
    $("div[data-iridize-id='content']").html(content);
}

function handleNextClick() {
    ++curStep;
    setContent();
    if(curStep > 1) {
        $("button[data-iridize-role='prevBt']").removeClass('default-prev-btn');
    }
    if(curStep === steps.length) {
        $("a[data-iridize-role='nextBt']").css({display:'none'})
    }
}

function handlePrevClick() {
    --curStep;
    setContent();
    if(curStep !== 1) {
        $("button[data-iridize-role='prevBt']").removeClass('default-prev-btn');
    }
    if(curStep < steps.length) {
        $("a[data-iridize-role='nextBt']").css({display:'block'})
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
    getData
}
