// 在index.js中统一导出接口供外部使用
import { recommendMusic,newMusic } from "./Home"
import { hotSearch,keywordSearch } from "./Search"
import {getSongById,getLyricById} from "./Play"

export const recommendMusicAPI = recommendMusic // 请求推荐歌单的方法导出
export const newMusicAPI = newMusic             // 最新音乐
export const hotSearchAPI = hotSearch           // 热搜关键词
export const keywordSearchAPI = keywordSearch   // 关键词搜索
export const getSongByIdAPI = getSongById       // 通过ID请求歌曲
export const getLyricByIdAPI = getLyricById     // 通过ID请求歌词