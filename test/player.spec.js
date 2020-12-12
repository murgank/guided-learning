const {describe, it} =  require("@jest/globals");

describe('Guided learning', function () {
    it('should Add Jquery to the DOM', function () {
        require("../src/player");

        expect(document.head.innerHTML)
            .toBe('<script src=\"https://code.jquery.com/jquery-3.5.1.min.js\" type=\"text/javascript\"></script>');
    });

    it('should get guide json data', function () {
        window.jQuery = require('jquery');
        const mockJson = {
            data: 'some-data'
        }
        jest.spyOn(window.jQuery,"getJSON").mockImplementation((url,callback) => callback(mockJson));
        const { getData } = require("../src/player");
        getData();

        expect(window.jQuery.getJSON).toBeCalledTimes(1);
    });
});
