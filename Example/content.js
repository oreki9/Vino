wordPos = [];
wordPos.push(AddInDict("Jarum jam sudah menunjuk angka 11 dan jalan yang ramai pejalan kaki,"));
wordPos.push(AddInDict("seorang pemuda berjalan memotong arus pejalan kaki yang beramai-ramai menuju tempat tertentu"));
wordPos.push(AddInDict("tujuan sang pemuda adalah sebuah toko buku yang ada diseberang jalan"));
wordPos.push(AddInDict("Toko buku tersebut adalah toko buku terbesar dalam kota tersebut"));
wordPos.push(AddInDict("Kling-Kling, sebuah lonceng kecil yang digantung diatas pintu sebagai penanda seorang memasuki toko berbunyi"));
wordPos.push(AddInDict("suasana toko yang bernuansa jaman dulu ini adalah salah satu hal yang disukai sang pemuda"));
wordPos.push(AddInDict("Bisa dibilang sang pemuda adalah penyuka jaman dulu"));
wordPos.push(AddInDict("[ Selamat datang di toko buku BookOne ]"));
wordPos.push(AddInDict("[ Ah, Kak Dan, hari ini mau beli buku apa ya ? ]"));
wordPos.push(AddInDict(" perempuan mendekati sang pemuda yang bernama Dan "));
wordPos.push(AddInDict("[ Malam libhi, yang aku pesan sudah datang ? ]"));
wordPos.push(AddInDict("[ Ah iya, Novel Dune sudah datang lho, ini ]"));
wordPos.push(AddInDict(" perempuan yang bernama libhi menyerahkan sebuah buku tua kepada Dan"));
wordPos.push(AddInDict("[ sangat sulit menemukanya lho, bahkan WorldRecord membutuhkan waktu berjam-jam menemukanya ]"));
wordPos.push(AddInDict("[ aku juga mencarinya tapi sangat sulit menemukanya, dengan akses Level 5-ku hanya menunjukan kalau ada beberapa yang tersisa, tetapi tidak ditampilkan tempat dan pemiliknya ]"));
wordPos.push(AddInDict(" libhi dan Dan bertemu saat libhi ditugaskan pertama kalinya di toko buku ini "));
//make array to string parser
DialogEvent.push([{action:"Image",name:"bcg1",url:"Images/bgimage/BG2.png",x:0,y:0,z:0},{action:"Image",name:"bc1",url:"Images/87646o.png",x:20,y:450,z:2},{action:"Text",name:"txt1",Text:DialogString(wordPos[0]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[1]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[2]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[3]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[4]),ReAnim:true},{action:"ReImg",name:"bcg1",url:"Images/bgimage/bg 014.png"}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[5]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[6]),ReAnim:true}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[7]),height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Image",name:"img1",url:"Images/nanami.png",x:50,y:85,z:1},{action:"Text",name:"txt2",Text:"Libghi : ",height:15,x:50,y:480,z:0,speed:0,color:"white"}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[8]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[9]),ReAnim:true}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[10]),height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Image",name:"img2",url:"Images/kirigiri.png",x:400,y:60,z:1,width:636,height:539},{action:"ReTxt",name:"txt2",Text:"Dan : "}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[11]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[12]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[13]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[14]),ReAnim:true}]);
DialogEvent.push([{action:"ReTxt",name:"txt1",Text:DialogString(wordPos[15]),ReAnim:true}]);
GameStart();
