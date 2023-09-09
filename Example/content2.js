//Chapter 1
_ImageList = ["Images/bgimage/BG2.png","Images/87646o.png","Images/bgimage/bg 014.png","Images/nanami.png","Images/kirigiri.png"];
_audioList = ["bgm.mp3"]
_wordPos = [
    AddInDict("Jarum jam sudah menunjuk angka 11 dan jalan yang ramai pejalan kaki,"),
    AddInDict("seorang pemuda berjalan memotong arus pejalan kaki yang beramai-ramai menuju tempat tertentu"),
    AddInDict("tujuan sang pemuda adalah sebuah toko buku yang ada diseberang jalan"),
    AddInDict("Toko buku tersebut adalah toko buku terbesar dalam kota tersebut"),
    AddInDict("Kling-Kling, sebuah lonceng kecil yang digantung diatas pintu sebagai penanda seorang memasuki toko berbunyi"),
    AddInDict("suasana toko yang bernuansa jaman dulu ini adalah salah satu hal yang disukai sang pemuda"),
    AddInDict("Bisa dibilang sang pemuda adalah penyuka jaman dulu"),
    AddInDict("[ Selamat datang di toko buku BookOne ]"),
    AddInDict("[ Ah, Kak Dan, hari ini mau beli buku apa ya ? ]"),
    AddInDict(" perempuan mendekati sang pemuda yang bernama Dan "),
    AddInDict("[ Malam libhi, yang aku pesan sudah datang ? ]"),
    AddInDict("[ Ah iya, Novel Dune sudah datang lho, ini ]"),
    AddInDict(" perempuan yang bernama libhi menyerahkan sebuah buku tua kepada Dan"),
    AddInDict("[ sangat sulit menemukanya lho, bahkan WorldRecord membutuhkan waktu berjam-jam menemukanya ]"),
    AddInDict("[ aku juga mencarinya tapi sangat sulit menemukanya, dengan akses Level 5-ku hanya menunjukan kalau ada beberapa yang tersisa, tetapi tidak ditampilkan tempat dan pemiliknya ]"),
    AddInDict(" libhi dan Dan bertemu saat libhi ditugaskan pertama kalinya di toko buku ini ")
];

//make array to string parser
_DialogEvent = [
    [{action:"Audio", id: "1", control: "Play", url: 0},{action:"Image",name:"bcg1",url:0,x:0,y:0,z:0},{action:"Image",name:"bc1",url:1,x:20,y:450,z:2},{action:"Text",name:"txt1",Text:0,height:15,x:50,y:500,z:0,speed:10,color:"white"}],
    [{action:"ReTxt",name:"txt1",Text:1,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:2,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:3,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:4,ReAnim:true},{action:"ReImg",name:"bcg1",url:2}],
    [{action:"ReTxt",name:"txt1",Text:5,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:6,ReAnim:true}],
    [{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:7,height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Image",name:"img1",url:3,x:50,y:85,z:1},{action:"Text",name:"txt2",Text:"Libghi : ",height:15,x:50,y:480,z:0,speed:0,color:"white"}],
    [{action:"Audio", id: "1", control: "Stop", url: 0},{action:"ReTxt",name:"txt1",Text:8,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:9,ReAnim:true}],
    [{action:"Delete",name:"txt1"},{action:"Text",name:"txt1",Text:10,height:15,x:50,y:500,z:0,speed:10,color:"white"},{action:"Image",name:"img2",url:4,x:400,y:60,z:1,width:636,height:539},{action:"ReTxt",name:"txt2",Text:"Dan : "}],
    [{action:"ReTxt",name:"txt1",Text:11,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:12,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:13,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:14,ReAnim:true}],
    [{action:"ReTxt",name:"txt1",Text:15,ReAnim:true}]
]
SetChapter(
    "0",
    _ImageList,
    _audioList,
    _wordPos,
    _DialogEvent
)
GameStart(ImageList);
// TODO: Add Load audio
// TODO: load each chapter
// TODO: compress download chapter byte
// TODO: test load is one by one or all in one
// TODO: make algorithm to check when is loading
// TODO: make ui to edit/make novel game
// TODO: make example with novel in https://lorenovels.com/chapter-1-i-remember-now/#google_vignette