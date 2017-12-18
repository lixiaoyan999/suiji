/*
* 属性
	* 字母表  几个字符  生命  关卡  下落速度
* 方法
	* 开始  产生  下落   消失  进入下一关  重新开始
 */
class Code{
	constructor(){
		this.char = ['Q','W','E','T','Y','U','P','L','H','M','N','A','C'];
		this.length = 5;
		this.current = [];
		this.speed = 10;
	}
	start(){
		this.getChars(this.length); 
		this.drops();
	}
	getChars(length){
		for(let i = 0;i < length;i++){
			this.getChar();
		}
	}
	getChar(){
		//创建随机数
		//创建节点
		//设置节点样式宽高背景字体居中，大小，位置
		//节点内容 = this.char[num]
		//添加节点到body
		let num = Math.floor(Math.random() * this.char.length);

		let top = Math.floor(Math.random() * 100);
		let left = Math.floor((window.innerWidth - 400) * Math.random() +200);


		let divs = document.createElement('div');
		divs.style.cssText = `
			width:50px;
			height:50px;
			background-color:#ccc;
			text-align:center;
			line-height:50px;
			border-radius:3px;
			position: absolute;
			top:${top}px;left:${left}px;
		`;
		divs.innerText = this.char[num];
		document.body.appendChild(divs);
		this.current.push(divs);
	}
	drops(){
		let that = this;
		setInterval(function(){
			for(let i = 0;i < that.current.length;i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 500){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.getChar();
				}
			}
		},100);
		//开启时间函数使字母往下掉落
		
	}
}