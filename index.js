/*
	 * id    	姓名		电话	 拼音
	 * 01    	张三		110		 zhangsan
	 * 02   	李四	 	120		 lisi
	 * 03		王五		119		 wangwu 
	 

	 localStorage.contact = [{},{},{}]; 
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
	let data = JSON.parse(localStorage.getItem('contact'));
	let dl = $('dl')[0];
	let ul = $('.slide')[0];
	let tip = $('.tip')[0];
	let height = $('header')[0].offsetHeight + tip.offsetHeight;
	let input = $('input')[0];
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

	input.addEventListener('keyup',function(){
		
	})


	function render(data){
		dl.innerHTML = '';
		let obj = [];
		//对首字母进行遍历
		data.forEach(element => {
			let firstChar = element.pinyin.trim().charAt(0).toUpperCase();
			if(!obj[firstChar]){
				obj[firstChar] = [];
			}
			obj[firstChar].push(element);
		});

		//对内容进行便利并排序
		let keys = Object.keys(obj).sort();
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
