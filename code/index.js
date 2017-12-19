//实例化方法
$(function(){
	let code = new Code();
	 //code.start();
	let start1 = $('.start1')[0];
    let over = $('.over')[0];
    start1.onclick = function(){
        code.start();
    }
    over.onclick = function(){
    	code.over();
    }
})