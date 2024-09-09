
import { cube } from './math.js';
import './index.css'
 function component() {
 
  const element = document.createElement('pre');
  element.classList.add('font');
 
  element.innerHTML = [
    '你好 webpack！',
    '5 的立方等于 ' + cube(5)
  ].join('\n\n');

   return element;
 }

 document.body.appendChild(component());