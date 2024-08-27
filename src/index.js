
// import _ from 'lodash';
import { join } from "lodash-es";
import printMe from './func.js';
import tcpImage from './assets/tcp1.jpeg'
import questionImage from './assets/question.png'
import QQSvg from './assets/QQ.svg'
import loadScriptImage from './assets/loadScript.jpg'
import imageText from './assets/imageText.txt'
function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    // 执行这一行需要引入 lodash（目前通过 script 脚本引入）
    element.innerHTML = join(['Hello', 'webpack'], ' ');
    btn.innerHTML = '点我输出数据在控制台!';
    btn.onclick = printMe;
    element.appendChild(btn);

    const container = document.createElement('div');
    container.cssText = 'width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;padding: 20px; box-sizing: border-box;';

    // 测试asset/resource
    const image = document.createElement('img');
    image.src = tcpImage;
    container.appendChild(image);

    // 测试asset/inline
    const inlineImg = document.createElement('img');
    inlineImg.src = questionImage
    container.appendChild(inlineImg);

    // 测试asset/source
    const text = document.createElement('div');
    text.style.cssText = 'width: 100%; height: 200px; background-color: #ccc; font-size: 20px; line-height: 200px; text-align: center;';
    text.textContent = imageText + tcpImage;
    container.appendChild(text);

    // 测试 asset
    const svgImg = document.createElement('img');
    svgImg.src = QQSvg;
    container.appendChild(svgImg);
    const loadScriptImg = document.createElement('img');
    loadScriptImg.src = loadScriptImage;
    container.appendChild(loadScriptImg);
    const questionImg = document.createElement('img');
    questionImg.src = questionImage;
    container.appendChild(questionImg);

   

    element.appendChild(container);


    return element;
}



document.body.appendChild(component());