wordPos = [];
<<<<<<< HEAD
wordPos.push(AddInDict("Jarum jam sudah menunjuk angka 11 dan jalan yang ramai pejalan kaki,"));
wordPos.push(AddInDict("seorang pemuda berjalan memotong arus pejalan kaki yang beramai-ramai menuju tempat tertentu"));
wordPos.push(AddInDict("tujuan sang pemuda adalah sebuah toko buku yang ada diseberang jalan"));
wordPos.push(AddInDict("Toko buku tersebut adalah toko buku terbesar dalam kota tersebut"));
wordPos.push(AddInDict("Kling-Kling, sebuah lonceng kecil yang digantung diatas pintu sebagai penanda seorang memasuki toko berbunyi"));
wordPos.push(AddInDict("suasana toko yang bernuansa jaman dulu ini adalah salah satu hal yang disukai sang pemuda"));
wordPos.push(AddInDict("Bisa dibilang sang pemuda adalah penyuka jaman dulu"));
wordPos.push(AddInDict("[ Selamat datang di toko buku BookOne ]"));
wordPos.push(AddInDict("[ Ah, Kak Dan, hari ini mau beli buku apa ya ? ]"));
wordPos.push(AddInDict(" perempuan mendekati sang pemuda yang bernama dan "));
wordPos.push(AddInDict("[ Malam libhi, yang aku pesan sudah datang ? ]"));
wordPos.push(AddInDict("[ Ah iya, Novel Dune sudah datang lho, ini ]"));
wordPos.push(AddInDict(" perempuan yang bernama libhi menyerahkan sebuah buku tua kepada Dan"));
wordPos.push(AddInDict("[ sangat sulit menemukanya lho, bahkan WorldRecord membutuhkan waktu berjam-jam menemukanya ]"));
wordPos.push(AddInDict("[ aku juga mencarinya tapi sangat sulit menemukanya, dengan akses Level 5-ku hanya menunjukan kalau ada beberapa yang tersisa, tetapi tidak ditampilkan tempat dan pemiliknya ]"));
wordPos.push(AddInDict(" libhi dan Dan bertemu saat libhi ditugaskan pertama kalinya di toko buku ini"));
//make array to string parser
DialogEvent.push([{action:"Image",name:"bcg1",url:"Images/bgimage/BG3.png",x:0,y:0,z:0},{action:"Image",name:"bc1",url:"Images/87646o.png",x:20,y:450,z:2},{action:"Text",name:"txt1",Text:DialogString(wordPos[0]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[1]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[2]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
=======
wordPos.push(AddInDict("selamat datang di dunia saya, perkenalkan saya pencipta dunia ini"));
wordPos.push(AddInDict("saya ingin kamu menjalani dua cerita dan memilih jalan sesuai pilihanmu"));
wordPos.push(AddInDict("jangan khawatir, kamu bebas dalam duniaku, kamu bisa berhenti kapan saja, berlaku apa saja saya tidak akan memaksamu"));
wordPos.push(AddInDict("saya tak mempunyai tujuan, kamu yang datang kepada saya"));
wordPos.push(AddInDict("sampai bertemu kembali"));
wordPos.push(AddInDict("HAHAHAHAHAHAHAHA!!!"));
wordPos.push(AddInDict("KRING KRING KRING!!!!!"));
wordPos.push(AddInDict("( hngg... berisik, ngantuk ... jam berapa ini ... jam 8.. JAM 8!! berangkat kerja!!!)"));
//make array to string parser
DialogEvent.push([{action:"Image",name:"bcg1",url:"Images/bgimage/BG3.png",x:0,y:0,z:0},{action:"Image",name:"img1",url:"Images/nanami.png",x:50,y:85,z:1},{action:"Image",name:"bc1",url:"Images/87646o.png",x:20,y:450,z:2},{action:"Text",name:"txt1",Text:DialogString(wordPos[0]),height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Text",name:"txt2",Text:"Nanami : ",height:15,x:50,y:480,z:0,speed:0,color:"white"}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[1]),height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Animate",name:"txt1",time:60,x:150,click:1}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[2]),height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Animate",name:"func1",func:function(x){console.log(x[0]);x[0]-=1;},par:[4],time:40,click:1}]);
>>>>>>> 1b85b2aebae1002c21d1314e69aa7c9eb2231a5c
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[3]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[4]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[5]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
DialogEvent.push([{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:DialogString(wordPos[6]),height:15,x:50,y:500,z:0,speed:10,color:"white"}]);
GameStart();
