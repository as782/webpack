

const btn = document.createElement('button');
btn.innerHTML = '点击加载axios模块';
btn.onclick = () => {
    import(/* webpackChunkName:"myaxios"  */ 'axios').then((_) => {
        console.log(_.Axios);
 

    })
}
document.body.appendChild(btn);