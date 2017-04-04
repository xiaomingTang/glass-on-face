window.onload=function(){
	function $(id){
			return document.getElementById(id);
	}
	//为节点elem切换某个类名;(有变没有，没有变有)
	function switchClass(elem,className){
		var	arr=elem.className.split(" "),
			hasClassName=false;
		for(var i in arr){
			if(arr[i]==className){
				arr[i]="";
				hasClassName=true;
			}
		}
		if(!hasClassName){
			arr.push(className);
		}
		elem.className=arr.join(" ");
		return;
	}
	//为节点elem在某两个类名间切换,类名不得为空;
	function switchClasses(elem,className1,className2){
		var	arr=elem.className.split(" "),
				hasClassName1=false,
				hasClassName2=false;
		for(var i in arr){
			if(arr[i]==className1){
				arr[i]=className2;
				hasClassName1=true;
			}
		}
		if(!hasClassName1){
			for(var i in arr){
				if(arr[i]==className2){
					arr[i]=className1;
					hasClassName2=true;
				}
			}
			if(!hasClassName2){
				alert("func error : switchClasses() !!!");
				return;
			}
		}
		elem.className=arr.join(" ");
		return;
	}
	//页面加载完成后立即完成读条。
	(function(){
		var percent=$("load").getElementsByClassName("percent")[0],
			num=percent.innerHTML,
			load=null;
		load=setInterval(function(){
			num=parseInt(percent.innerHTML);
			if(num<100){
				percent.innerHTML=++num;
				$("load").getElementsByClassName("download")[0].style.width=num*2+"px";
			}
			else{
				clearInterval(load);
				switchClasses($("load"),"disappear","current");
				switchClasses($("photo"),"disappear","current");
				switchClasses($("glass"),"disappear","current");
			}
		},1);
	})();
	
	
	
	
	
	//点击小图,则弹出大图;
	$("photo").getElementsByClassName("photos-small")[0].onclick=function(event){
		//
		if(/^.*models\/model_(\d*).jpg$/g.test(event.target.src)){
			$("selected-photo").getElementsByTagName("img")[0].src="models_big\\big_"+RegExp.$1+".jpg";
			switchClasses($("photo"),"current","disappear");
			switchClasses($("selected-photo"),"disappear","current");
		}
	}
	//点击esc,则退出大图;
	$("selected-photo").getElementsByClassName("esc")[0].onclick=function(){
		switchClasses($("selected-photo"),"disappear","current");
		switchClasses($("photo"),"current","disappear");
	}
	//包裹小眼镜群的<div>
	var smallGlass=$("glass").getElementsByClassName("glasses")[0],
	//包裹大眼镜的<div>
		bigGlass=$("selected-photo").getElementsByClassName("big-glass")[0];
	//点击眼镜,则放置该眼镜。
	smallGlass.onclick=function(event){
		if(/^.*glass_for_preview\/glass_(\d*).jpg$/g.test(event.target.src)){
			$("selected-photo").getElementsByTagName("img")[1].src="glass_on_face\\glass_"+RegExp.$1+".png";
		}
	}
	var top=parseInt(bigGlass.style.top),
		left=parseInt(bigGlass.style.left),
		distanceX=0,
		distanceY=0;
	//开始拖拽;
	bigGlass.onmousedown=function(event){
		distanceX=parseInt(event.pageX)-left;
		distanceY=parseInt(event.pageY)-top;
		document.onmousemove=function(event){
			bigGlass.style.top=parseInt(event.pageY)-distanceY+"px";
			bigGlass.style.left=parseInt(event.pageX)-distanceX+"px";
			return false;
		}
		document.onmouseup=function(){
			top=parseInt(bigGlass.style.top);
			left=parseInt(bigGlass.style.left);
			this.onmouseup = null;
			this.onmousemove = null;
			return false;
		}
		return false;
	}
}
