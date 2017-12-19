/*
* 属性
	* 字母表  几个字符  生命  关卡  下落速度
* 方法
	* 开始  产生  下落   消失  进入下一关  重新开始
 */
class Code{
	constructor(){
		this.char = [['A','img/A.png'],['B','img/B.png'],['C','img/C.png'],['D','img/D.png'],['E','img/E.png'],['F','img/F.png'],['G','img/G.png'],['H','img/H.png'],['I','img/I.png'],['K','img/K.png'],['L','img/L.png'],['M','img/M.png'],['N','img/N.png'],['O','img/O.png'],['P','img/P.png'],['Q','img/Q.png'],['R','img/R.png'],['S','img/S.png'],['T','img/T.png'],['U','img/U.png'],['V','img/V.png'],['W','img/W.png'],
			['X','img/X.png'],['Y','img/Y.png'],['Z','img/Z.png']];	
		this.length = 5;
		this.current = [];
		this.speed = 5;

		this.position = [];
		//获取分数与分数值;添加默认值
		this.scroe = document.querySelector('.box > div:first-child > span');
		this.life = document.querySelector('.box > div:nth-child(2) > span');
		this.scroe1 = 0;
		this.life1 = 5;
		//下一个：设置过关所需个数
		this.cg = 5;
	}
	start(){
		this.getChars(this.length); 
		this.drops();
		this.keys();
	}
	getChars(length){
		for(let i = 0;i < length;i++){
			this.getChar();
		}
	}
	checkedExist(char){
		return this.current.some(ele => ele.innerText == char);//数组去重
	}
	checkedPosition(pos){
		return this.position.some(ele => Math.abs(ele - pos)<= 50) //位置去重,当前元素位置小于等于元素宽度(Math.abs取绝对值)
	}
	getChar(){
		//创建随机数
		//创建节点
		//设置节点样式宽高背景字体居中，大小，位置
		//节点内容 = this.char[num]
		//添加节点到body
		let num = Math.floor(Math.random() * this.char.length);
		//this.char[num]   this.current[i]
		//调用去重方法
		//do...while遍历数组
		do{
			num = Math.floor(Math.random() * this.char.length);
		}while(this.checkedExist(this.char[num][0]));


		let top = Math.floor(Math.random() * 100);
		let left = Math.floor((window.innerWidth - 400) * Math.random() +200);

		do{
			left = Math.floor((window.innerWidth - 400) * Math.random() +200);
		}while(this.checkedPosition(left));


		let divs = document.createElement('div');
		function bg(){
				 let r = Math.floor(Math.random()*255);
				 let g = Math.floor(Math.random()*255);
				 let b = Math.floor(Math.random()*255);
				 return `rgb(${r},${g},${b})`;
		}
		divs.style.cssText = `
			width:50px;
			height:50px;
			color:#fff;
			font-size:0;
			background:${bg()};
			background:url(${this.char[num][1]}) center/cover;
			text-align:center;
			line-height:50px;
			border-radius:50%;
			position: absolute;
			top:${top}px;left:${left}px;
		`;
		divs.innerText = this.char[num][0];
		document.body.appendChild(divs);
		this.current.push(divs);
		this.position.push(left);
	}
	drops(){
		let that = this;
		//开启时间函数使字母往下掉落
		that.t = setInterval(function(){
			for(let i = 0;i < that.current.length;i++){
				let tops = that.current[i].offsetTop + that.speed;
				that.current[i].style.top = tops + 'px';
				if(tops >= 600){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					//life1
					//添加条件如果life<=0,提示是否重新开始
					that.life1--;
					that.life.innerText = that.life1;
					if(that.life.innerText < 0){
						let flag = confirm('是否重新开始');
						if(flag){
							that.restart();
						}else{
							close();
						}
					}
				}
			}
		},100);	
	}
	keys(){
		/*
			* let that = this
			* 添加keydown事件
			* 声明一个变量(code) = String.fromCharCode.(e.keycode)字母编码转换成相对应的字母 ||  String.toUpperCase(e.key)
			* 遍历字母
			* 	 如果是删除current中的元素
			* 	 	   删除页面中的元素
			* 	       添加一个新的元素
			* ++分数
			* 如果分数足够，进入下一关	
		 */
		let that = this;
		document.onkeydown = function(e){
			let code =  String.fromCharCode(e.keyCode); //e.key.toUpperCase();
			for(let i = 0; i < that.current.length;i++){
				if(code == that.current[i].innerText){
					document.body.removeChild(that.current[i]);
					that.current.splice(i,1);
					that.position.splice(i,1);
					that.getChar();
					that.scroe.innerText = ++that.scroe1;
					if(that.scroe.innerText == that.cg){
						that.next();
					}
				}
			}

		}
	}

	next(){
		/*
			* 清除时间函数 && 清空数据：视图+数据
			* 产生一组新数值
			* 	length++
			* 	需要消除个数增加（+=10）
			*   产生字符
			*   掉落字符
		 */
		clearInterval(this.t);
		/*for(let i = 0;i < this.current.length;i++){
			document.body.removeChild(this.current[i]);
		}*/
		this.current.forEach(ele => {
			document.body.removeChild(ele);
		})
		this.current = [];
		this.position = [];

		this.length++;
		this.cg += 10;

		this.getChars(this.length);
		this.drops();
	}
	restart(){
		/*
		 	* 清空界面·
		 	* 分值：0
		 	* 生命值：100
		 	* cg：5
		 	* length:5
			* 产生字符
			* 掉落字符
		 */
		clearInterval(this.t);
		this.current.forEach(ele => {
			document.body.removeChild(ele);
		})
		this.current = [];
		this.position = [];

		this.score1 = 0;
		this.scroe.innerText = this.scroe1;

		this.life1 = 5;
		this.life.innerText = this.life1;

		this.length = 5;
		this.getChars(this.length);

		this.drops();
	}
	over(){
		clearInterval(this.t);
		this.current.forEach(ele => {
			document.body.removeChild(ele);
		})
		this.current = [];
		this.position = [];
	}

}