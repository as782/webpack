import { test2 } from "D/test2.js";

console.log('env global');
 test2();


export function test() {
  console.log('a/test.js');
}