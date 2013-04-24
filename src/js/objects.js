var objects = (function () {
    function beget(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
    function extend(A, B) {
        A.prototype = beget(B.prototype);
        A.prototype.constructor = A;
    }
    return {
        beget: beget,
        extend: extend
    };
}());