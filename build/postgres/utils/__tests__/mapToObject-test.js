"use strict";
var mapToObject_1 = require("../mapToObject");
test('will turn a Map into a JavaScript object', function () {
    expect(mapToObject_1.default(new Map([['a', 1], ['b', 2], ['c', 3]]))).toEqual({ a: 1, b: 2, c: 3 });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwVG9PYmplY3QtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wb3N0Z3Jlcy91dGlscy9fX3Rlc3RzX18vbWFwVG9PYmplY3QtdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOENBQXdDO0FBRXhDLElBQUksQ0FBQywwQ0FBMEMsRUFBRTtJQUMvQyxNQUFNLENBQUMscUJBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQzVGLENBQUMsQ0FBQyxDQUFBIn0=