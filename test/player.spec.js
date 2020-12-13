const {describe, it} =  require("@jest/globals");

describe('Guided learning', function () {
    it('should Add Jquery and common css to the DOM', function () {
        require("../src/player");

        expect(document.head.innerHTML)
            .toBe('<script src=\"https://code.jquery.com/jquery-3.5.1.min.js\" type=\"text/javascript\"></script>' +
                '<link rel=\"stylesheet\" href=\"https://guidedlearning.oracle.com/player/latest/static/css/stTip.css\">');
    });

    it('should get guide json data and populate dom accordingly', function () {
        window.jQuery = require('jquery');
        const mockJson = {
            data: {
                css: 'some-css',
                structure: {
                    steps: []
                },
                tiplates: {
                    tip: 'some-tip',
                    hoverTip: 'hover-tip'
                }
            }
        }
        jest.spyOn(window.jQuery,"getJSON").mockImplementation((url,callback) => callback(mockJson));
        const { getData } = require("../src/player");
        getData();

        expect(window.jQuery.getJSON).toBeCalledTimes(1);
        expect(document.body.innerHTML).toBe('<style>some-css</style><div class="sttip">' +
            ' <div class="tooltip in"> <div class="tooltip-arrow"></div>' +
            '<div class="tooltip-arrow second-arrow"></div>' +
            '<div class="popover-inner">some-tiphover-tip</div></div></div>')
    });
});
