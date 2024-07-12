import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { Falcul } from "./rough.ts";

Deno.test("Falcul should return the factorial of a positive number", () => {
    assertEquals(Falcul(5), 120);
    assertEquals(Falcul(10), 3628800);
});

Deno.test("Falcul should return 1 for 0", () => {
    assertEquals(Falcul(0), 1);
});


