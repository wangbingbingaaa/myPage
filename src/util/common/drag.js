/*弹窗拖拽，适用于ant design */

let draging = false;
let dragDom;
let dragpoint;

document.addEventListener('mousedown', (ev) => {
    let target = ev.target;
    //点住标题栏进行拖拽
    if (!target.classList.contains('ant-modal-title')) {
        return;
    }
    //根据标题栏的dom找到控制弹窗组件布局位置的dom，ant-design的弹窗组件的外壳在标题栏的父级第3层
    dragDom = target.parentElement?.parentElement?.parentElement;
    //由于此拖拽法对所有弹窗有效，通过classname标注控制动作取消
    if (dragDom.parentElement?.classList.contains('nodrag')) {
        dragDom = null;
        return;
    }
    draging = true;
    dragpoint = {
        x: ev.clientX,
        y: ev.clientY
    }
});
document.addEventListener('mouseup', () => {
    draging = false;
    dragDom = null;
});
document.addEventListener('mousemove', (ev) => {
    if (draging) {
        let _dragdom = dragDom;
        let sty = window.getComputedStyle(_dragdom, null);
        _dragdom.style.marginLeft = `${parseFloat(sty.marginLeft) + ev.clientX - dragpoint.x}px`;
        _dragdom.style.marginTop = `${parseFloat(sty.marginTop) + ev.clientY - dragpoint.y}px`;
        dragpoint = {
            x: ev.clientX,
            y: ev.clientY
        }
    }
});

export { }
