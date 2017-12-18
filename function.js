/*
   获取某一个元素的子元素
* */

function childNode(element) {
    let arr = [];
    let childnodes = element.childNodes;
    childnodes.forEach(function (ele) {
        if (ele.nodeType == 1) {
            arr.push(ele)
        }
    });
    /*
    *  添加
    *  冒充 : 数组 冒充
    *  nodeList -> 数组
    * */
    arr = Array.prototype.filter.call(childnodes, function (element) {
        return element.nodeType == 1
    });
    /*for (let i = 0; i < childnodes.length; i++) {
        if (childnodes[i].nodeType == 1) {
            arr.push(childnodes[i]);
        }
    }*/
    return arr;
}

function firstElementChild(element) {
    return childNode(element)[0];
}

function createCircle(num) {
    let box = document.querySelector('.box');
    for (let i = 0; i < num; i++) {
        let divs = document.createElement('div');
        divs.classList.add('circle');

        let w = Math.floor(Math.random() * 30 + 20);

        let color = getColor();
        let l = (innerWidth - w) * Math.random() - innerWidth / 2,
            t = (innerHeight - w) * Math.random() - innerHeight / 2;
        divs.style.cssText = `
             background:${color};
             width:${w}px;
             height:${w}px;
        `;
        box.appendChild(divs);

        /*setTimeout(function(){
            divs.style.left = `${l}px`;
            divs.style.top = `${t}px`;
        },100)*/
    }

}

function getColor() {
    let str = `rgb(${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)},${Math.floor(Math.random() * 256)})`;
    return str;
}

/*
*  获取指定元素
*   $(select[,ranger])
*   select  String  选择器
*   ranger  对象(元素节点)    选择范围
*
*  $('#box')
*  $('.box')
*  $('div')
*
*  $('<p>')
*
*  $(function(){})
*  1、首字符
*    分类
*      #    id
*      .    class
*      tag  tagname
* */

function $(select,ranger = document) {
    if (typeof select == 'string') {
        //ranger = ranger?ranger :document;
        //ranger = ranger || document;
        let selector = select.trim();
        let firstChar = selector.charAt(0);
        if (firstChar == '#') {
            return document.getElementById(selector.substring(1));
        } else if (firstChar == '.') {
            return document.getElementsByClassName(selector.substring(1));
        } else if (/^[a-zA-Z][A-Za-z1-6]{0,6}$/.test(selector)) {
            return document.getElementsByTagName(selector);
        } else if (/^<[a-zA-Z][A-Za-z1-6]{0,6}>$/.test(selector)) {
            return document.createElement(selector.slice(1, -1));
        }
    } else if (typeof select == 'function') {
        window.onload = function () {
            select();
        }
    }
}


/*
*  prepend()
*   在某一个元素的 最前面 插入一个子元素 =>  第一个元素节点之前
*
*   1、第一个元素节点
* */
function append(parentNode,child){
    parentNode.appendChild(child);
}

function prepend(parentNode,child){
    let firstChild = parentNode.firstElementChild;
    if(firstChild){
        parentNode.insertBefore(child,firstChild);
    }else{
        parentNode.appendChild(child);
    }
}

HTMLElement.prototype.append =  function(child){
  this.appendChild(child);
};
HTMLElement.prototype.prepend = function(child){
    let firstChild = this.firstElementChild;
    if(firstChild){
        this.insertBefore(child,firstChild);
    }else{
        this.appendChild(child);
    }
};

HTMLElement.prototype.prependTo = function(parentNode){
    parentNode.parpend(this);
}


/* 外部 */
/*
* box.insert(div)
* div.insertTo(box)
 */
HTMLElement.prototype.insert = function(node){
    //  this   node
    let parent = this.parentNode;
    parent.insertBefore(node,this);
}

HTMLElement.prototype.insertTo = function(parentNode){
    parentNode.insert(this);
}
/* after
   元素后面 => 元素兄弟节点(必须是一个元素节点)的前面 */
HTMLElement.prototype.after = function(node){
    let parent = this.parentNode;
    let next = this.nextElementSibling;
    if(next){
        next.insert(node);
    }else{
        parent.append(node);
    }
}

HTMLElement.prototype.afterTo = function(node){
    node.after(this);
}


/* 查找 */
/* 查找父元素 */
HTMLElement.prototype.parent = function(){
    return this.parentNode;
}

/* 查找某元素的父辈元素 */
HTMLElement.prototype.parents = function(){
    let parent = this.parentNode;
    let arr = [];
    while(parent.nodeName != 'HTML'){       // nodeName  节点名
        arr.push(parent);
        parent = parent.parentNode;
        if(parent.nodeName == 'HTML'){
            arr.push(parent);
        }else if(parent.nodeName == 'BODY'){
            arr.push(parent);
        }
    }
    return arr;
}

/* 查找定位属性 */

HTMLElement.prototype.offsetParents = function(){
    let node = null;
    let parents = this.parents();
    for(let i = 0;i < parents.length;i++){
        let v = window.getComputedStyle(parents[i],null).position;  //parents中带有positon属性值得元素
        if(v == 'relative' || v == 'absolute'){
            node = parents[i];
            break;
        }
        if(!node){
            node = document.body;
        }
    }
    return node;
}




