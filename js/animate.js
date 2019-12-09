
function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}

window.onload = function(){
	var txt = document.getElementById('txt');
	var box = document.getElementById('box');
	var oNavlist = document.getElementById('nav').children;
	var slider = document.getElementById('slider');
	var left = document.getElementById('left');
	var right = document.getElementById('right');
	var index = 1; // 第几张图，用该改定位
	var timer;
	var isMoving = false;

	setInterval(function(){
		var now = parseInt(getStyle(txt, 'right'));
		txt.style.right = now + 3 + 'px' ;
		if(now + 3 >= 350){
			txt.style.right = -972 + 'px';
		}
	},30);



	function next(){
		if(!isMoving){
			isMoving = true;
			index++;
			navChange();
			animate(slider, {left:-1200*index},function(){
				if(index === 6){
					slider.style.left = "-1200px";
					index = 1;
				}
				isMoving = false;
			});
		}
	}
	function pre(){
			if(!isMoving){
			isMoving = true;
			index--;
			navChange();
			animate(slider, {left:-1200*index},function(){
				if(index === 0){
					slider.style.left = "-6000px";
					index = 5;
				}
				isMoving = false;
			});
		}
	}
	var timer = setInterval(next, 3000);
			

	box.onmouseover = function(){ // 划上清除计时器
		animate(left, {opacity:50})
		animate(right, {opacity:50})
		clearInterval(timer);
	}
	// 划出继续
	box.onmouseout = function(){
		animate(left,{opacity:0})
		animate(right,{opacity:0})
		timer = setInterval(next, 3000);
	}

	right.onclick = next;
	left.onclick = pre;

	for(var i = 0; i < oNavlist.length; ++i){
		oNavlist[i].idx = i;
		oNavlist[i].onclick = function(){
			index = this.idx + 1;
			navChange();
			animate(slider, {left:-1200*index});
		}
	}

	oNavlist[0].style.color = 'white';
	function navChange(){ // 修改圆点颜色
		for(var i = 0; i < oNavlist.length; ++i){
			oNavlist[i].className = '';
			oNavlist[i].style.color = 'black';
			if(i == 0)
				oNavlist[i].style.color = 'red';
		}
		if(index ===6){
			oNavlist[0].className = 'active';
			oNavlist[0].style.color = 'white';
			if(i == 0)
				oNavlist[i].style.color = 'red';
		}
		else if(index === 0){
			oNavlist[4].className = 'active';
			oNavlist[4].style.color = 'white';
			if(i == 0)
				oNavlist[i].style.color = 'red';
		}
		else{
			oNavlist[index-1].className = 'active';
			oNavlist[index-1].style.color = 'white';
			if(i == 0)
				oNavlist[i].style.color = 'red';
		}
	}
}