/*
	 * id    	姓名		电话	 拼音
	 * 01    	张三		110		 zhangsan
	 * 02   	李四	 	120		 lisi
	 * 03		王五		119		 wangwu 
	 

	 localStorage.contact = [{},{},{}];
	* 1.先获取页面中的必要元素
    *       接收数据的一个空数组
    *       右侧首字母的导航
    *       还有相同首字母的集合
    *
    * 2.封装一个函数，然后进行调用
    * 3.封装函数以后的第一步，首先先要清空或者说是格式化HTML中的内容，
    * 4.函数中需要有一个能够接收筛选数据之后的空数组
    * 5.然后对具有相同首字母的信息对象进行foreach，然后添加入新的数据内容innerHTML
    * 
    *  
 */
$(function(){
/*	let arr = [
	{id:1,name:'黎莉莉',tell:'13353476197',pinyin:'lilili'},
	{id:2,name:'刘镠琉',tell:'13620618575',pinyin:'liuliuliu'},
	{id:3,name:'郭果果',tell:'17156628888',pinyin:'guoguoguo'},
	{id:4,name:'毕子碧',tell:'18935551666',pinyin:'bizibi'},
	{id:5,name:'武子厚',tell:'16551525155',pinyin:'wuzihou'},
	{id:6,name:'艾乂霭',tell:'13610268575',pinyin:'aiaiai'},
	{id:7,name:'衣衣亦',tell:'17156828888',pinyin:'yiyiyi'},
	{id:8,name:'锌茜茜',tell:'18935551666',pinyin:'xinxixi'},
	{id:9,name:'武子轩',tell:'17551515155',pinyin:'wuzixuan'},
	{id:10,name:'牛妞妞',tell:'13680618575',pinyin:'niuniuniu'},
	{id:11,name:'郭果果',tell:'17156728888',pinyin:'guoguoguo'},
	{id:12,name:'玖九九',tell:'18935551666',pinyin:'jiujiujiu'},
	{id:13,name:'史肆拾',tell:'17551515155',pinyin:'shisishi'},
	{id:14,name:'武子轩',tell:'15751515155',pinyin:'wuzixuan'},
	{id:15,name:'牛妞妞',tell:'16320618575',pinyin:'niuniuniu'},
	{id:16,name:'郭果果',tell:'19156628888',pinyin:'guoguoguo'},
	{id:17,name:'玖九九',tell:'18835551666',pinyin:'jiujiujiu'},
	{id:18,name:'史肆拾',tell:'17751515155',pinyin:'shisishi'},
	{id:19,name:'韩寒涵',tell:'15235559999',pinyin:'haihaihai'},
	{id:20,name:'贺赫赫',tell:'15335559999',pinyin:'hehehe'}];
	localStorage.contact = JSON.stringify(arr);*/


	/* 1.先获取页面中的必要元素
    *       接收数据的一个空数组
    *       右侧首字母的导航
    *       还有相同首字母的集合*/
	let data = JSON.parse(localStorage.getItem('contact'));
	let dl = $('dl')[0];
	let ul = $('.slide')[0];
	let tip = $('.tip')[0];
	let height = $('header')[0].offsetHeight + tip.offsetHeight;
	let inputs = $('input')[0];
	//l[{},{},{}]
	//g[{}]
	//b[{}]
	//w[{}]
	//h[{}]
	render(data);
	let dts = $('dt');
	let arr1 = [];
	Array.prototype.forEach.call(dts,function(element){
		arr1.push(element.offsetTop);
	})
	tip.innerText = dts[0].innerText;
	window.addEventListener('scroll',function(){
		var tops = document.body.scrollTop || document.documentElement.scrollTop || window.scrollY || window.pageXOffset;
		arr1.forEach((element,index) => {
			if(tops + height >= element){
                tip.innerText = dts[index].innerText;
            }
		})
	})

	//搜索
	inputs.addEventListener('input',function(){
		let inp = this.value.trim();
		let obj1 = data.filter(element =>element.pinyin.includes(inp) || element.name.includes(inp) || element.tell.includes(inp))
		render(obj1)
	})


	function render(data){
	// 创建一个对象存放首字母数组
		dl.innerHTML = '';
		let obj = [];
		//对首字母进行遍历
		data.forEach(element => {
			// 获取首字母
			let firstChar = element.pinyin.trim().charAt(0).toUpperCase();
			// 如果首字母里面是undefined
			if(!obj[firstChar]){
				// firstChar转为数组
				obj[firstChar] = [];
			}
			// 数组里添加首字母是它的element元素
			obj[firstChar].push(element);
		});

		//对内容进行遍历并排序
		let keys = Object.keys(obj).sort();
		// 依次遍历排列好的每个字母
		keys.forEach(element => {
			dl.innerHTML += `<dt>${element}</dt>`;
			ul.innerHTML += `<li>${element}</li>`;
			obj[element].forEach(v => {
				dl.innerHTML += `
					<dd>
						<a href="tel:${v.tell}">
							${v.name}
						</a>
					</dd>
				`
			})
		})
	}

})
