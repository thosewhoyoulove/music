// 格式化后的每部分歌词
type LyricItem = {
    min: string, 
    sec: string, 
    mill: string, 
    lrc: string, 
    time: number,
    pre: number
}

type Artist = {
  name: string,
  id: number
}

// 音乐信息
type CurrentMusic = {
  id: number,
  name: string,
  ar: Artist[],
  al: {
    picUrl: string
  }
}

// 每个歌单的信息
type PlayList = {
  id: number,
  playCount: number,
  name: string,
  picUrl: string
}