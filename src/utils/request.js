 //  基于axios对网络请求进行二次封装，避免网络请求散落在各个逻辑页面中

import axios from "axios"

axios.defaults.baseURL = "http://localhost:3000"

export default axios // 默认导出