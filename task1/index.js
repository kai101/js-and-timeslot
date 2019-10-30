function add(a, b) {
    return a + b;
};

// this is defaultArguments tailor for numeric operation.
function defaultArguments(callForward, options) {
    const innerFunction = function(a,b){
        let inputA = a || options.a || a;
        let inputB = b || options.b || b;
        return callForward.call(null, inputA, inputB);
    }
    return innerFunction;
}

const add2 = defaultArguments(add, { b: 9 });
console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));
const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);
console.assert(add3(undefined, 10) === 12);
const add4 = defaultArguments(add, { c: 3 }); // doesn't do anything, since c isn't
console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);

// // Extra test case for falsy value that will break my previous implementation
console.assert(add4(0, 0) === 0);