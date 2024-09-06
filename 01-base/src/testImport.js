

const btn = document.createElement('button');
btn.innerHTML = '点击加载axios模块';
btn.onclick = () => {
    import(/* webpackChunkName:"myaxios"  */ 'axios/unsafe/adapters/http.js').then((_) => {
        console.log(_);
 

    })
}
document.body.appendChild(btn);