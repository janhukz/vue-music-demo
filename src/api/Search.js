import request from '@/utils/request'

// ES5写法
export const hotSearch = function (params) {
  return request({
    url: '/search/hot',
    params: params
  })
}

// ES6 箭头函数
// export const hotSearch = (params) =>
//   request({
//     url: '/search/hot',
//     params
//   })

export const keywordSearch = (params) =>
  request({
    url: '/cloudsearch',
    params
  })
