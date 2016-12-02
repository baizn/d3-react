let _ = require('lodash')

var mockData = {
  album_offset: 0,
  albums: [
  {
  artists: [],
  available: true,
  company: "",
  cover: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/06/13/71027299.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  id: 2460885,
  name: "同舟之情",
  num_tracks: 1,
  release_date: "2013-05-02",
  type: "EP/单曲"
  },
  {
  artists: [
  {
  id: 50001233,
  name: "张学友",
  portrait: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/18/26/70861058.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  valid: true
  }
  ],
  available: true,
  company: "",
  cover: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/04/19/71471155.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  id: 2575433,
  name: "醒着做梦",
  num_tracks: 0,
  release_date: "2014-12-23",
  type: "专辑"
  },
  {
  artists: [
  {
  id: 50001233,
  name: "张学友",
  portrait: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/18/26/70861058.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  valid: true
  }
  ],
  available: true,
  company: "",
  cover: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/29/05/71251328.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  id: 2547979,
  name: "童真年代",
  num_tracks: 1,
  release_date: "2014-06-26",
  type: "EP/单曲"
  },
  {
  artists: [
  {
  id: 50001233,
  name: "张学友",
  portrait: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/18/26/70861058.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  valid: true
  }
  ],
  available: true,
  company: "",
  cover: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/23/11/71151905.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  id: 2465736,
  name: "张学友1/2世纪演唱会",
  num_tracks: 3,
  release_date: "2013-07-19",
  type: "现场"
  },
  {
  artists: [
  {
  id: 50001233,
  name: "张学友",
  portrait: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/18/26/70861058.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  valid: true
  }
  ],
  available: true,
  company: "",
  cover: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/26/32/71203802.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  id: 2409247,
  name: "定风波",
  num_tracks: 0,
  release_date: "2012-11-23",
  type: "EP/单曲"
  }
  ],
  artist_offset: 0,
  artists: [
  {
  id: 50001233,
  name: "张学友",
  num_albums: 82,
  num_tracks: 371,
  portrait: "http://pic.cdn.duomi.com/imageproxy2/dimgm/scaleImage?url=http://img.kxting.cn//p1/18/26/70861058.jpg&w=150&h=150&s=100&c=0&o=0&m=",
  valid: true
  }
  ],
  dm_error: 0,
  error_msg: "操作成功",
  recommend: 1,
  total_albums: 92,
  total_artists: 1,
  total_tracks: 481,
  track_offset: 0,
  tracks: [
  {
  album: {
  cover: "/p1/09/19/70829305.jpg",
  id: 2101726,
  name: "吻别"
  },
  artists: [
  {
  id: 50001233,
  name: "张学友",
  num_albums: 82,
  num_tracks: 371,
  portrait: "/p1/18/26/70861058.jpg",
  valid: true
  }
  ],
  availability: "1110",
  dlyric: "",
  id: 11065236,
  medias: [
  {
  bitrate: 320,
  p2purl: "8D2F73947091B50BC305000000AF59CA5A00000064.mp3"
  }
  ],
  mv: 0,
  slyric: "",
  title: "一路上有你",
  isdown: "1",
  isplay: "1"
  }
  ]
}

export const items = mockData.albums//_.range(1, 10).map((i)=> item(i))

export function getUser (id) {
  return {
    id,
    name: `user name is - ${id}`
  }
}
export function getItem (id) {
  var obj = {}
  for(var i = 0, len = mockData.albums.length; i < len; i++) {
    let item = mockData.albums[i]
    if(item.id == id) {
      obj = item
    }
  }
  return obj
}

export function getPieData() {
  return {
      width: 600,
      height: 600,
      showTips: true,
      showInnerText: true,
      decimalPlaces: 1,
      showOuterText: true,
      dragRedraw: true,
      innerTextStyle: {
        color: 'white',
        fontSize: '15px'
      },
      outerStyle: {
        line: {
          color: 'red',
          width: 2
        },
        text: {
          color: 'white',
          fontSize: '15px'
        }
      },
      //tipsClassName: '',
      innerRadius: 0,
      outerRadius: 150,
      colors: ['red', 'green'],
      data: [
            {
                value: 123,
                name: 'AAA'
            },
            {
                value: 12,
                name: 'BBB'
            },
            {
                value: 80,
                name: 'CCC'
            }
        ]
    }
}

export function getTickBarData() {
  return  [
        {
            name: '团伙A',
            value: 300
        },{
            name: '团伙B',
            value: 200
        },{
            name: '团伙C',
            value: 100
        },{
            name: '团伙D',
            value: 50
        },{
            name: '团伙E',
            value: 40
        },{
            name: '团伙E',
            value: 60
        }
    ]
}