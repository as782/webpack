import { test2 } from "D/test2";

console.log('env global');
 test2();


export function test() {
  console.log('a/test.js');
}