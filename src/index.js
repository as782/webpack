
// import _ from 'lodash';
import { join } from "lodash-es";
import printMe from './func.js';
function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    // 执行这一行需要引入 lodash（目前通过 script 脚本引入）
    element.innerHTML =join(['Hello', 'webpack'], ' ');
    btn.innerHTML = '点我输出数据在控制台!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
  }
  
  document.body.appendChild(component());