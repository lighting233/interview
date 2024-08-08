let a = BigInt(123)
let b = Object.prototype.toString.call(a)
let c = Symbol(233)
console.log(b)

//在 JavaScript 中，整数的最大安全整数是 2 的 53 次方减 1，而不是 2 的 52 次方，
//是因为 JavaScript 使用的是双精度浮点数表示数字。在双精度浮点数中，一位用于表示符号位，11 位用于表示指数，剩下的 52 位用于表示尾数（即小数部分或整数部分）。
//由于 JavaScript 中整数部分占用 52 位，再加上符号位，所以能够精确表示的整数范围是从 -2^53 到 2^53。因此，JavaScript 中整数的最大安全整数是 2 的 53 次方减 1。
//但由于 0 也被包含在整数范围内，所以实际能够表示的最大整数值是 25^3 - 1