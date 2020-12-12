const {describe, it} =  require("@jest/globals");

describe('Guided learning', function () {
    it('should Add Jquery to the DOM', function () {
        require("../src/player");

        expect(document.head.innerHTML)
            .toBe('<script src=\"//code.jquery.com/jquery-latest.min.js\"></script>');
    });
});
