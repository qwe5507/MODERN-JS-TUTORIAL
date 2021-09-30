describe("camelize", function () {

    it("leaves an empty line as is", function () {
        assert.equal(camelize(""), "");
    });

    it("turns background-color into backgroundColor", function () {
        assert.equal(camelize("background-color"), "backgroundColor");
    });

    it("turns list-style-image into listStyleImage", function () {
        assert.equal(camelize("list-style-image"), "listStyleImage");
    });

    it("turns -webkit-transition into WebkitTransition", function () {
        assert.equal(camelize("-webkit-transition"), "WebkitTransition");
    });

});
describe("filterRange", function () {

    it("returns the filtered values", function () {

        let arr = [5, 3, 8, 1];

        let filtered = filterRange(arr, 1, 4);

        assert.deepEqual(filtered, [3, 1]);
    });

    it("doesn't change the array", function () {

        let arr = [5, 3, 8, 1];

        let filtered = filterRange(arr, 1, 4);

        assert.deepEqual(arr, [5, 3, 8, 1]);
    });

});
describe("filterRangeInPlace", function () {

    it("returns the filtered values", function () {

        let arr = [5, 3, 8, 1];

        filterRangeInPlace(arr, 1, 4);

        assert.deepEqual(arr, [3, 1]);
    });

    it("doesn't return anything", function () {
        assert.isUndefined(filterRangeInPlace([1, 2, 3], 1, 4));
    });

});