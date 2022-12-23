// 文件名和模块名尽量统一，方便查找
import request from '@/utils/request'

// request是二次封装的axios
console.log(request)

// 首页 - 推荐歌单
export const recommendMusic = params => request({
    url:'/personalized',
    params
})

// 首页 - 推荐最新音乐
export const newMusic = params => request({
    url:'/personalized/newsong',
    params
})


// function a (params) {
//     request({
//         url:'/personalized',
//         params
//     })
// }