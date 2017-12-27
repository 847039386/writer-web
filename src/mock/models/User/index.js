import Mock from 'mockjs'

// 用户
const User = {
  "_id"           :"@word(15)",
  "name"         :"@cname",
  "follow"       :"@integer(1,10000)",
  "avatar|1"       :[
    "http://www.spiiker.com/u/useravatar/2017/0629/20170629154255808.jpg",
    "http://www.qqw21.com/article/UploadPic/2012-9/20129184657343.jpg",
    "http://up.qqjia.com/z/23/tu29364_16.jpg",
    "http://img1.3lian.com/gif/more/11/201207/b86e4524bd2d032627637c8930a749a9.jpg",
    "http://pic.qqtn.com/file/2013/2013-5/2013051515113135806.png",
    "http://www.qqw21.com/article/UploadPic/2013-12/2013122812351475531.jpg"


  ],
  "token"        :"@word(15)",
}

export { User }