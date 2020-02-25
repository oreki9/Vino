var wordDict = {array:[[]],width:4,height:4};
var wordPos = [];

var ImgBtn = [];
var DialogEvent = [];
var LayerTxt = [];
var LayerImg = [];
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
function GetCenter(cor){
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
function GameStart(){
	Main();
	setInterval(function(){
		Update();LoadLayer();
	},fps);
}
function NewLayer(lyr){//setaip layer
	if(lyr!=undefined){
	for(var i =0;i<lyr.length;i++){
		if(lyr[i].action=="Image"){
			if(lyr[i].hitbtn!=undefined){
				PlaceImage(lyr[i].url,lyr[i].name,lyr[i].x,lyr[i].y,lyr[i].z,lyr[i].btn,lyr[i].width,lyr[i].height,lyr[i].hitbtn);
			}else{
				PlaceImage(lyr[i].url,lyr[i].name,lyr[i].x,lyr[i].y,lyr[i].z,lyr[i].btn,lyr[i].width,lyr[i].height);
			}
		}else if(lyr[i].action=="Text"){
			PlaceText(lyr[i].name,lyr[i].Text,lyr[i].height,lyr[i].x,lyr[i].y,lyr[i].z,lyr[i].speed,lyr[i].color);
		}else if(lyr[i].action=="Delete"){
			for(var o=0;o<LayerImg.length;o++){
				if(lyr[i].name==LayerImg[o].name){
					LayerImg.splice(o,1);
				}
			}
			for(var o=0;o<ImgBtn.length;o++){
				if(lyr[i].name==ImgBtn[o].name){
					ImgBtn.splice(o,1);
				}
			}
			for(var o=0;o<LayerTxt.length;o++){
				if(lyr[i].name==LayerTxt[o].name){
					LayerTxt.splice(o,1);
				}
			}
		}else if(lyr[i].action=="Wait"){
			nclick = true;
		}else if(lyr[i].action=="ReTxt"){
			for(var o=0;o<LayerTxt.length;o++){
				if(lyr[i].name==LayerTxt[o].name){
					LayerTxt[o].Text = lyr[i].Text;
				}
			}
		}else if(lyr[i].action=="ReImg"){
			for(var o=0;o<LayerImg.length;o++){
				if(lyr[i].name==LayerImg[o].name){
					LayerImg[o].Image = lyr[i].Image;
				}
			}
		}
	}}
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
		Lyrnow+=1;
	}else{
		Lyrnow=i;
	}
	NewLayer(DialogEvent[Lyrnow]);
	nclick = false;
}
function Main(){
	this.canvas = document.getElementsByClassName("vinowin")[0];
	canvas.addEventListener('mousedown', function(e) {
		var mousePos = getCursorPos(canvas, e);
		if(TimeLyr==0){
			if(nclick==false){
				Lyrnow+=1;
				NewLayer(DialogEvent[Lyrnow]);
			}
		}else{
			TimeLyr=0;
		}
		//console.log(mousePos.x+" "+mousePos.y);
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
	for(var i=0;i<LayerImg.length;i++){
		LoadImage(LayerImg[i]);
	}
	for(var i=0;i<LayerTxt.length;i++){
		LoadTxt(LayerTxt[i]);
	}
	if(TimeLyr==0){
		
	}else{
		TimeLyr-=1;
	}
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
function AddInDict(word){//menambah wordDict dari string
	var SplitWord = word.split(" ");
	var Vertical = false;
	var e=0;
	var WordList = [];
	if(wordDict.array[0].length==0){
		wordDict.array[0].push(SplitWord[0]);
		WordList.push({x:0,y:0});
		e=1;
	}
	for(;e<SplitWord.length;e++){
		var i =0;
		var o = 0;
		while(true){
			if(wordDict.array[i][o]==undefined){//bahaya bila i dan o tidak number
				break;
			}
			if(wordDict.array[i][o]==SplitWord[e]){
				WordList.push({x:i,y:o});
				break;
			}
			if(Vertical==false){
				if(wordDict.array[i][o+1]==undefined){
					if(wordDict.array[i+1]==undefined){
						if(i==o){
							wordDict.array[0][o+1] = SplitWord[e];
							WordList.push({x:0,y:o+1});
							Vertical=true;
						}else{
							if((i!=0)&&(o+1>=wordDict.array[0].length)){
								wordDict.array.push([]);
								wordDict.array[i+1][0] = SplitWord[e];
								WordList.push({x:i+1,y:0});
								Vertical=true;
							}else{
								wordDict.array[i][o+1] = SplitWord[e];
								WordList.push({x:i,y:o+1});
							}
						}
						break;
					}
					i++;
					o=0;
				}else{o++;}
			}else{
				if(wordDict.array[i+1]==undefined){
					if(wordDict.array[0][o+1]==undefined){
						if(i==o){
							wordDict.array[0].push(SplitWord[e]);
							WordList.push({x:0,y:o+1});
						}else{
							wordDict.array.push([]);
							wordDict.array[i+1][0] = SplitWord[e];
							WordList.push({x:i+1,y:0});
							Vertical=false;
						}
						break;
					}
					o++;
					i=0;
				}else{i++;}
				if(wordDict.array[i][o]==undefined){
					console.log(SplitWord[e]);
					wordDict.array[i][o] = SplitWord[e];
					WordList.push({x:i,y:o});
					break;
				}
			}
		}
	}
	return WordList;
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
		kata+=wordDict.array[arai[o].x][arai[o].y]+" ";
	}
	return kata;
}
//SplitButton([{x:15,y:200},{x:15,y:160},{x:30,y:80},{x:15,y:60},{x:20,y:20},{x:50,y:20},{x:65,y:50},{x:60,y:70},{x:50,y:80},{x:80,y:150},{x:100,y:200}]);