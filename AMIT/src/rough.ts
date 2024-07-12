export function Falcul(n) {
	if (n < 0) {
		throw new Error("Negative numbers are not allowed.");
	}
	let result = 1;
	for (let i = 1; i <= n; i++) {
		result *= i;
	}
	return result;
}

console.log(Falcul(5)); // Output: 120
console.log(Falcul(0)); // Output: 1
console.log(Falcul(10)); // Output: 3628800
 