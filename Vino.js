var wordDict = {array:[[]]};
var wordPos = [];

var DialogEvent = [];
var ImgBtn = [];
var LayerTxt = [];
var LayerImg = [];
var AnimPos = [];
var TimeLyr = 0;
var Lyrnow = 0;
var nclick = false;
function PlaceImage(dir,nm,ek,ye,ze,btn,width,height,hitb){///aray or not
	base_image = new Image();
	base_image.src = dir;
	this.newImg = {Image:base_image,name:nm,x:ek,y:ye,z:ze};
	if(width!=undefined){
		this.newImg["width"] = width;
	}
	if(height!=undefined){
		this.newImg["height"] = height;
	}
	for(var i=0;i<LayerImg.length;i++){
		if(LayerImg[i].z>ze){
			LayerImg.splice(i,0,newImg);
			if(hitb!=undefined){
				for(var o=0;o<hitb.length;o++){
					if(hitb[o].x!=undefined){
						AddBtn(nm,btn,base_image,{x:hitb[o].x,y:hitb[o].y,width:hitb[o].width,height:hitb[o].height});
					}else if(hitb[o].a1!=undefined){
						AddBtn(nm,btn,base_image,{a1:hitb[o].a1,a2:hitb[o].a2,ay:hitb[o].ay,tx:hitb[o].tx,ty:hitb[o].ty});
					}
				}
			}else{
				AddBtn(nm,btn,base_image,{x:ek,y:ye});
			}
			return;
		}
	}
	LayerImg.push(newImg);
	if(hitb!=undefined){
		for(var o=0;o<hitb.length;o++){
			if(hitb[o].x!=undefined){
				AddBtn(nm,btn,base_image,{x:hitb[o].x,y:hitb[o].y,width:hitb[o].width,height:hitb[o].height});
			}else if(hitb[o].a1!=undefined){
				AddBtn(nm,btn,base_image,{a1:hitb[o].a1,a2:hitb[o].a2,ay:hitb[o].ay,tx:hitb[o].tx,ty:hitb[o].ty});
			}
		}
	}else{
		AddBtn(nm,btn,base_image,{x:ek,y:ye});
	}
}
///AddBtn Add to ImgBtn is per btn with name or array of button
function AddBtn(nm,btn,base_image,hit){//ek,ye,width,height){//add hitbox button
	if(btn!=undefined){
		if(hit.x!=undefined){
			var width = hit.width;
			var height = hit.height;
			var ek = hit.x;
			var ye = hit.y;
			base_image.onload = function(){
				if(width==undefined){
					width=base_image.width;
				}
				if(height==undefined){
					height=base_image.width;
				}
				ImgBtn.push({name:nm,x1:ek,x2:width+ek,y1:ye,y2:height+ye,action:btn});
			}
		}else if(hit.a1!=undefined){
			var ae1 = hit.a1;
			var ae2 = hit.a2;
			var aye = hit.ay;
			var txe = hit.tx;
			var tye = hit.ty;
			var xy = Math.abs(tye-aye)/Math.abs(ae2-ae1);
			ImgBtn.push({name:nm,a1:ae1,a2:ae2,ay:aye,tx:txe,ty:tye,xpery:xy,action:btn});
		}
	}
}
function Jarak(pos1,pos2){
	return Math.sqrt(Math.pow(Math.abs(pos1.x-pos2.x),2)+Math.pow(Math.abs(pos1.y-pos2.y),2));
}
function GetCenter(cor){//it is right?
	var center = {x:0,y:0};
	for(var i=0;i<cor.length;i++){
		center.x+=cor[i].x;
		center.y+=cor[i].y;
	}
	return {x:center.x/cor.length,y:center.y/cor.length};
}
function GetTriAngle(pos1,pos2,cntr){
	if((Math.abs(pos1.y-pos2.y)>3)&&(pos1.x!=pos2.x)){
		if(Math.abs(cntr.x-pos1.x)>Math.abs(cntr.x-pos2.x)){
			return {a:{x:pos1.x,y:pos1.y},b:{x:pos2.x,y:pos1.y},c:{x:pos2.x,y:pos2.y}};//reverse clockwise
		}
		return {a:{x:pos2.x,y:pos2.y},b:{x:pos1.x,y:pos1.y},c:{x:pos1.x,y:pos2.y}};
	}
	return 0;
}
function Animate(o){
	if(o.time==0){
		if(o.name=="func1"){
			console.log(o);
		}
		DelItemArr(AnimPos,function(x){return x.name==o.name});
		return;
	}
	function SameNm(x){return (x.name==o.name);};
	var Arrpar = [[ImgBtn,SameNm],[LayerImg,SameNm],[LayerTxt,SameNm]];
	function FindChange(arr,func){
		var i = FindIndex(arr,func);
		if(i!=undefined)Change(arr,i);
		return i;
	}
	if(o.func!=undefined){
		o.func(o.par);
		o.time-=1;
	}
	ArrFunc([FindChange],Arrpar,[function(x){return (x!=undefined);}]);
	function Change(arr,i){
		if(o.x!=undefined){
			var plus = ((o.x-arr[i].x)/o.time);
			arr[i].x=arr[i].x+plus;
		}else if(o.y!=undefined){
			var plus = ((o.y-arr[i].y)/o.time);
			arr[i].y=arr[i].y+plus;
		};
		o.time-=1;
	}
}
function GetRectBtn(cor,i){
	var Rect = {x:0,y:0,width:0,height:0};
	var nexti = cor[i+1];
	if(nexti==undefined){
		nexti = cor[0];
	}
	if((cor[i].x==nexti.x)&&(cor[i].y!=nexti.y)){
		for(var o=i+1;o<cor.length;o++){
			var nexto = cor[o+1];
			if(nexto==undefined){
				nexto = cor[0];
			}
			if((nexti.y==cor[o].y)&&(cor[o].x==nexto.x)&&(nexti.x!=cor[o].x)){
				if(cor[i].y==nexto.y){
					Rect.width = Math.abs(nexti.x-nexto.x);
					Rect.height = Math.abs(nexti.y-nexto.y);
					if(cor[i].y>nexti.y){
						Rect.y = nexti.y;
					}else{
						Rect.y = cor[i].y;
					}
					if(nexti.x>nexto.x){
						Rect.x = nexto.x;
					}else{
						Rect.x = nexti.x;
					}
					return Rect;
				}
			}
		}
	}
}
function SliceRectBtn(pos,cor){//slice in line who crossed in the y in two point wich near
	for(var i=0;i<cor.length;i++){
		if(i+1!=cor.length){
			if(((pos.y>cor[i].y)&&(pos.y<cor[i+1].y))||((pos.y<cor[i].y)&&(pos.y>cor[i+1].y))){
				return {x:cor[i].x,y:pos.y,i:i+1};
			}
		}else{
			if(((pos.y>cor[i].y)&&(pos.y<cor[0].y))||((pos.y<cor[i].y)&&(pos.y>cor[0].y))){
				return {x:cor[i].x,y:pos.y,i:i+1};
				
			}
		}
	}
	return 0;
}
function Add(arai,obj){
	if(arai.length==0){
		arai.push(obj);
		return;
	}
	if(!((arai[arai.length-1].x==obj.x)&&(arai[arai.length-1].y==obj.y))){
		arai.push(obj);
	}
}
function AddRect(arai,obj){
	if(obj!=undefined){
		arai.push(obj);
	}
}
function NewSplice(arai,obj,i,o){
	if(arai.length==0){
		arai.splice(i,o,obj);
		return;
	}
	if(!((arai[i].x==obj.x)&&(arai[i].y==obj.y))){
		arai.splice(i,o,obj);
	}
}
function SplitButton(cor){//array object searah clockwise dan dari bawah
	var center = GetCenter(cor);
	var TriAngBtn = [];
	var ReImgBtn = [];
	for(var i=0;i<cor.length;i++){
		if(i+1!=cor.length){
			var TriBtn = GetTriAngle(cor[i],cor[i+1],center);
			if(TriBtn!=0){
				var tye,xy;
				if(TriBtn.a.y==TriBtn.b.y){
					tye = TriBtn.c.y;
				}else{
					tye = TriBtn.b.y;
				}
				xy = Math.abs(tye-TriBtn.b.y)/Math.abs(TriBtn.a.x-TriBtn.b.x);
				//a2 always get 90 degree point
				ReImgBtn.push({a1:TriBtn.a.x,a2:TriBtn.b.x,ay:TriBtn.a.y,tx:TriBtn.b.x,ty:tye,xpery:xy});
				Add(TriAngBtn,TriBtn.b);
				Add(TriAngBtn,TriBtn.c);
			}
		}else{
			var TriBtn = GetTriAngle(cor[i],cor[0],center);
			if(TriBtn!=0){
				var tye,xy;
				if(TriBtn.a.y==TriBtn.b.y){
					tye = TriBtn.c.y;
				}else{
					tye = TriBtn.b.y;
				}
				xy = Math.abs(tye-TriBtn.b.y)/Math.abs(TriBtn.a.x-TriBtn.b.x);
				ReImgBtn.push({a1:TriBtn.a.x,a2:TriBtn.b.x,ay:TriBtn.a.y,tx:TriBtn.b.x,ty:tye,xpery:xy});
				Add(TriAngBtn,TriBtn.b);
				Add(TriAngBtn,TriBtn.c);
			}
		}
	}
	for(var i=0;i<TriAngBtn.length;i++){
		var newPos = SliceRectBtn(TriAngBtn[i],TriAngBtn);
		if(newPos!=0){
			NewSplice(TriAngBtn,{x:newPos.x,y:newPos.y},newPos.i,0);
			i+=1;
		}
	}
	var Rect = [];
	for(var i=0;i<TriAngBtn.length;i++){
		AddRect(Rect,GetRectBtn(TriAngBtn,i));
	}
	return ReImgBtn.concat(Rect); 
}
function LoadImage(img){
	if((img.height!=undefined)&&(img.width!=undefined)){
		ctx.drawImage(img.Image,img.x,img.y,img.width,img.height);
	}else if(img.height!=undefined){
		ctx.drawImage(img.Image,img.x,img.y,img.Image.width,img.height);
	}else if(img.width!=undefined){
		ctx.drawImage(img.Image,img.x,img.y,img.width,img.Image.height);
	}else{
		ctx.drawImage(img.Image,img.x,img.y);
	}
}
function LoadTxt(Txt){//Tampilkan Text,layer text dan image berbeda karena text HARUS diatas
	ctx.fillStyle = Txt.color;
	ctx.font = Txt.height+"px Arial";
	if(TimeLyr==0){
		Txt.len=Txt.Text.length*(fps/Txt.speed);
	}
	var time = (Txt.len/(fps/Txt.speed));
	if((time<Txt.Text.length)){//tampilkan char satu persatu
		var Tek = Txt.Text.substr(0,time);
		for(var i=0;i<=Txt.line.length;i++){
			if(time>Txt.line[i]){
				ctx.fillText(Tek.substr(Txt.line[i],Txt.line[i+1]-Txt.line[i]), Txt.x, Txt.y+(i*20));
			}
		}
		Txt.len+=1;
	}else{//tampilkan semua string
		var Tek = Txt.Text;
		for(var i=0;i<=Txt.line.length;i++){
			if(time>Txt.line[i]){
				ctx.fillText(Tek.substr(Txt.line[i],Txt.line[i+1]-Txt.line[i]), Txt.x, Txt.y+(i*20));
			}
		}
	}
}
function PlaceText(nm,str,he,ek,ye,ze,spd,clr){//Buat Text ke LayerTxt
	var Line = [];
	var kata = "";
	Line.push(0);
	var wordray = str.split(" ");
	var len = 0;
	var lenvar = 1;
	if((spd==0)||(spd==undefined)){
		lenvar=str.length;
		spd=fps;
	}
	for(var i=0;i<wordray.length;i++){
		kata+=wordray[i];
		if(ctx.measureText(kata).width>=canvas.width-100){
			len+=kata.length;
			Line.push(len-1);
			kata="";
		}
	}
	Line.push(str.length);
	var time = ((fps/spd)*str.length);
	for(var i=0;i<LayerTxt.length;i++){//mengatur z dimensi di text
		if(LayerTxt[i].z>ze){
			LayerTxt.splice(i,0,{name:nm,Text:str,x:ek,y:ye,height:he,len:lenvar,speed:spd,color:clr,maxW:canvas.width-100,line:Line});
			LongTimeLyr(time);
			return;
		}
	}
	LayerTxt.push({name:nm,Text:str,x:ek,y:ye,height:he,len:lenvar,speed:spd,color:clr,maxW:canvas.width-100,line:Line});
	LongTimeLyr(time);
}
function LongTimeLyr(time){
	if(time>TimeLyr){//wait for the longest text done
		TimeLyr=time;
	}
}
function GameStart(ImageList){
	var promises = ImageList.map(function(url){
		return loadImage(url);
	});
	Promise.all(promises).then(LoadEnd);
	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.addEventListener("load", () => resolve(img));
			img.addEventListener("error", err => reject(err));
			img.src = src;
		});
	};
	function LoadEnd(){
		Main();
		setInterval(function(){
			Update();LoadLayer();
		},fps);
	}
}
function DelItemArr(Arr,func){
	var ind = FindIndex(Arr,func);
	if(ind!=undefined){
		Arr.splice(ind,1);
		return true;
	}
	return false;
}
function NewLayer(lyr){//setaip layer
	if(lyr!=undefined){
		lyr.forEach(SetAction);
		function SetAction(_Layer){
			function SameNm(e){return _Layer.name==e.name;};
			switch(_Layer.action){
				case "Image":
					SetImage(_Layer);
					break;
				case "Text":
					PlaceText(_Layer.name,_Layer.Text,_Layer.height,_Layer.x,_Layer.y,_Layer.z,_Layer.speed,_Layer.color);
					break;
				case "Delete":
					DelLayer(_Layer);
					break;
				case "Wait":
					nclick = true;
					break;
				case "ReTxt":
					if((!_Layer.ReAnim)){
						LayerTxt[FindIndex(LayerTxt,SameNm)].Text = _Layer.Text;
					}else{
						var newText = LayerTxt[FindIndex(LayerTxt,SameNm)];
						var str = _Layer.Text;
						DelLayer(_Layer);
						PlaceText(newText.name,str,newText.height,newText.x,newText.y,newText.z,newText.speed,newText.color);
					}
					break;
				case "ReImg":
					base_image = new Image();
					base_image.src = _Layer.url;
					LayerImg[FindIndex(LayerImg,SameNm)].Image = base_image;
					break;
				case "Animate":
					var item = GetIAllArr(_Layer.name);
					if(_Layer.x){
						AnimPos.push({name:_Layer.name,time:_Layer.time,x:_Layer.x,click:_Layer.click});
					}
					if(_Layer.y){
						AnimPos.push({name:_Layer.name,time:_Layer.time,y:_Layer.y,click:_Layer.click});
					}
					if(_Layer.func){
						AnimPos.push({name:_Layer.name,func:_Layer.func,par:_Layer.par,time:_Layer.time,click:_Layer.click});
					}
					break;
			}
			function SetImage(_Layer){
				if(_Layer.hitbtn!=undefined){
					PlaceImage(_Layer.url,_Layer.name,_Layer.x,_Layer.y,_Layer.z,_Layer.btn,_Layer.width,_Layer.height,_Layer.hitbtn);
				}else{
					PlaceImage(_Layer.url,_Layer.name,_Layer.x,_Layer.y,_Layer.z,_Layer.btn,_Layer.width,_Layer.height);
				}
			}
			function DelLayer(_Layer){
				var Arrpar = [[LayerImg,SameNm],[ImgBtn,SameNm],[LayerTxt,SameNm]];
				ArrFunc([DelItemArr],Arrpar,[function(x){return x;}]);
			}
		}
	}
}
function GetIAllArr(itemNm){
	var func = function(x){if(x.name==itemNm){found=x;return true;}else{return false}};
	var arrVar = [[ImgBtn,func],[LayerImg,func],[LayerTxt,func]];
	var found;
	ArrFunc([FindIndex],arrVar,[function(x){if(x==undefined){return false};return true;}]);
	return found;
}
//jalankan array satu2
//arr=func,arrvar=parameter,arrCek=cekfunc
function ArrFunc(Arr,Arrvar,ArrCek){
	function loop(len,func){
		for(var i=0;i<len;i++){
			if(func(i)==true){break;}
		}
	}
	function GetBiggest(arr){
		var big = 0;
		for(var i=0;i<arr.length;i++){
			if(big<arr[i]){big=arr[i];}
		}
		return big;
	}
	function PassPar(arr,func){
		if(typeof arr!='object'){return func(arr);}
		if(arr.length>5){
			console.log("max 4 parameter");
		}else{
			return func(arr[0],arr[1],arr[2],arr[3],arr[4]);
		}
	}
	var loopcount = GetBiggest([Arr.length,Arrvar.length,ArrCek.length]);
	loop(loopcount,function(x){
		var functI = PassPar(GetArray(Arrvar,x),GetArray(Arr,x));
		return GetArray(ArrCek,x)(functI);
	});
}
//get item else get last item
function GetArray(Arr,i){
	var item = Arr[i];
	if(item!=undefined){return item;
	}else{return Arr[Arr.length-1];}
}
function insideTri(pos,cor){
	if(((pos.x>=cor.a1)&&(pos.x<cor.a2))||((pos.x<cor.a1)&&(pos.x>=cor.a2))){
		if(((pos.y>=cor.ay)&&(pos.y<cor.ty))||((pos.y<cor.ay)&&(pos.y>=cor.ty))){
			var jarX = Math.abs(cor.ay-pos.y)/Math.abs(cor.a1-pos.x);
			if(jarX<=cor.xpery){
				return 1;
			}
		}
	}
	return 0;
}
function GoTo(i){
	if(i=="next"){
		NextLayer();
	}else{
		Lyrnow=i;
	}
	NewLayer(DialogEvent[Lyrnow]);
	nclick = false;
}
function NextLayer(){
	AnimPos.forEach(function(x,i){if(x.click>0){AnimPos.splice(i,1);}});
	Lyrnow+=1;
}
function Main(){
	this.canvas = document.getElementsByClassName("vinowin")[0];
	canvas.addEventListener('mousedown', function(e) {
		var mousePos = getCursorPos(canvas, e);
		if(TimeLyr==0){
			if(nclick==false){
				NextLayer();
				NewLayer(DialogEvent[Lyrnow]);
			}
		}else{
			TimeLyr=0;
		}
		for(var i=0;i<ImgBtn.length;i++){///chance Must
			if(ImgBtn[i].x1!=undefined){
				if((mousePos.x>=ImgBtn[i].x1)&&(mousePos.x<=ImgBtn[i].x2)&&(mousePos.y>=ImgBtn[i].y1)&&(mousePos.y<=ImgBtn[i].y2)){
					eval(ImgBtn[i].action);
				}
			}else if(ImgBtn[i].a1!=undefined){
				if(insideTri(mousePos,ImgBtn[i])==1){
					eval(ImgBtn[i].action);
				}
			}
		}
	});
	this.ctx = canvas.getContext("2d");
	this.fps = 10;
	NewLayer(DialogEvent[Lyrnow]);
}
function Update(){
	
}
function LoadLayer(){//update versi framework
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	LayerImg.forEach(LoadImage);
	LayerTxt.forEach(LoadTxt);
	AnimPos.forEach(Animate);
	if(TimeLyr!=0){TimeLyr-=1;}
}
function getCursorPos(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const X = event.clientX - rect.left;
    const Y = event.clientY - rect.top;
    return {x:X,y:Y};
}

//read file this secion
function readFile(e) {
	var file = e.target.files[0];
	if (!file) {
		return;
	}
	var reader = new FileReader();
	reader.onload = function(e) {
		var contents = e.target.result;
		displayContents(contents);
	};
	reader.readAsText(file);
}
document.getElementById('file-input').addEventListener('change', readFile, false);
function displayContents(contents) {
	console.log(contents);
}
//end
function lengthVert(wordDict,o){//panjang bawah array2d
	var stop = wordDict[0][o];
	var len = 0;
	while(stop!=undefined){
		stop=wordDict[len][o];
		len+=1;
	}
	return len;
}
function FindIndex(array,func){
	for(var i=0;i<array.length;i++){
		if(func(array[i],i,array)){
			return i;
		}
	}
}
function AddInDict(word){
	var SplitWord = word.split(" ");
	var ArrayPos = [];
	SplitWord.forEach(WDExist);
	return ArrayPos;
	function WDExist(o){
		wordDict.array.some(
			function(i,indx){
				if(i.length==0){i.push(o);ArrayPos.push({x:0,y:indx});return true;};
				if((indx==0)&&(wordDict.array[wordDict.array.length-1][i.length-1]!=0)){
					wordDict.array = AddUndifine(wordDict.array);
				}
				var findzero = FindIndex(i,UbahKosong);
				if(findzero!=undefined){
					i[findzero]=o;
					ArrayPos.push({x:findzero,y:indx});
					return true;
				}
				return false;
				function UbahKosong(item){
					switch(item){
						case o:return true;
						case 0:item = o;return true;
						case undefined:item = o;return true;
						default:return false;
					}
				}
			}
		)
	}
	function AddUndifine(matrix){
		matrix = matrix.map(function(x){x.push(0);return x;});
		var newArr = [];
		matrix[0].forEach(function(x){newArr.push(0);});
		matrix.push(newArr);
		PrintMatrix(matrix);
		return matrix;
	}
}
function PrintMatrix(matrix){
	var newarray = [];
	matrix.forEach(function(x){
		var arraychild = [];
		x.forEach(function(y){arraychild.push(y);});
		newarray.push(arraychild);
	});
}
function SaveToJS(){
	function RowInWD(item){
		var wordDictStr = "";
		wordDictStr+='["';
		wordDictStr+= item.join('","');
		wordDictStr+='"]';
		return wordDictStr;
	}
	function RowinWordPos(item){
		var WordPosStr = "";
		WordPosStr+='[';
		WordPosStr+=(item.map(function(i) {return "{x:"+i.x+",y:"+i.y+"}";})).join(",");
		WordPosStr+=']';
		return WordPosStr;
	}
	console.log("wordDict.array=["+wordDict.array.map(RowInWD).join(",")+"];");
	console.log("wordPos=["+wordPos.map(RowinWordPos).join(",")+"];");
}
function DialogString(arai){//mengubah array ke string dengan wordDict
	var kata = "";
	for(var o=0;o<arai.length;o++){
		kata+=wordDict.array[arai[o].y][arai[o].x]+" ";
	}
	return kata;
}