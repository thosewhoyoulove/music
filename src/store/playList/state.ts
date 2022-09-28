/*
 * @Description: 
 * @Author: 曹俊
 * @Date: 2022-09-24 20:05:34
 * @LastEditors: 曹俊
 * @LastEditTime: 2022-09-28 15:28:39
 */
export type Artist = {
    id: number,
    name: string
}

export type Play = {
    al: {
        id: number,
        name: string,
        pic: number,
        picUrl: string,
        pic_str: string,
    },
    name: string,
    id: number,
    ar: Artist[]
}

export type LyricList = {
    lyric: string,
    version: number
}

export type State = {
    playList: Play[],
    playListIndex: number,//播放歌曲的默认下标为0
    isShow: boolean,//暂停,false为播放
    isDetailShow: boolean,//歌曲详情页的展示，false为隐藏
    isFooterShow:boolean,//底部组件是否展示
    duration: number,//歌曲的总时间
    currentTime: number,//歌曲现在的时间
    lyricList: LyricList,//歌词
    audioTime: number,
    shouldUpdate: boolean,//是否更新歌词评论数
    shouldNext:boolean//检测歌曲是否能播放
}

export const generateState: () => State = () => ({
        playList: [{
            al: {
                id: 73326637,
                name: "中国新说唱 第10期",
                pic: 109951163551410660,
                picUrl: "https://p2.music.126.net/D-mpVLLwMrA-hPu0QPYUNQ==/109951163551410648.jpg",
                pic_str: "109951163551410648"
            },
            name: "飘向北方 (Live)",
            id: 1308818967,//歌曲id
            ar: [{ id: 12514278, name: '那吾克热-NW' }, { id: 13058503, name: '尤长靖' }]
        }],
        playListIndex: 0,//播放歌曲的默认下标为0
        isShow: true,//暂停,false为播放
        isDetailShow: false,//歌曲详情页的展示，false为隐藏
        isFooterShow: true,//底部组件是否展示
        duration: 0,//歌曲的总时间
        currentTime: 0,//歌曲现在的时间
        audioTime: 0,
        lyricList: {
            lyric: '',
            version: 0
        },//歌词
        shouldUpdate: false,//是否更新歌词评论数
        shouldNext:false
    })