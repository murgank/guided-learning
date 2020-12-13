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
                    steps: [{
                        action:{}
                    }]
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
            '<div class="popover-inner">some-tip</div></div></div>')
    });

    describe('tooltip position based on screen size and element position',() => {
        const tooltipDimension = {
            height: 20,
            width: 100
        }
        const elementPosition = {
            left: 50,
            top: 50,
            height: 20,
            width: 100
        }
        const { getBestPosition } = require("../src/player");

        it('should make tooltip align right if position is available', function () {
            const bodyDimension = {
                width: 250,
                height: 200
            }

            const position = getBestPosition(elementPosition,tooltipDimension,bodyDimension);

            expect(position.left).toEqual(150);
            expect(position.top).toEqual(50);
        });

        it('should make tooltip align bottom if position right is not available', function () {
            const bodyDimension = {
                width: 200,
                height: 200
            }

            const position = getBestPosition(elementPosition,tooltipDimension,bodyDimension);

            expect(position.left).toEqual(50);
            expect(position.top).toEqual(70);
        });

        it('should make tooltip align left if position right and bottom is not available', function () {
            elementPosition.left = 150;
            const bodyDimension = {
                width: 250,
                height: 70
            }

            const position = getBestPosition(elementPosition,tooltipDimension,bodyDimension);

            expect(position.left).toEqual(50);
            expect(position.top).toEqual(50);
        });
    })
});
