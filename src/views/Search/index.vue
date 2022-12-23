<template>
  <div>
    <van-search
      shape="round"
      v-model="value"
      placeholder="请输入搜索关键词"
      @input="inputFn"
    />
    <div class="search_wrap" v-if="keywordSearchList.length === 0">
      <!-- 标题 -->
      <p class="hot_title">热门搜索</p>
      <!-- 热搜关键词容器 -->
      <div class="hot_name_wrap">
        <!-- 每个搜索关键词 -->
        <span
          class="hot_item"
          @click="fn(obj.first)"
          v-for="(obj, index) in hotSearchResList"
          :key="index"
          >{{ obj.first }}</span
        >
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          center
          :title="obj.name"
          :label="obj.ar[0].name + ' - ' + obj.name"
          v-for="obj in keywordSearchList"
          :key="obj.id"
        >
          <template #right-icon>
            <van-icon name="play-circle-o" />
          </template>
        </van-cell> -->

        <song-item :artists="obj.ar[0].name" :name="obj.name" :id="obj.id" v-for="obj in keywordSearchList" :key="obj.id"></song-item>
      </van-list>
    </div>
  </div>
</template>

<script>
import { hotSearchAPI, keywordSearchAPI } from '@/api'
import SongItem from '@/components/SongItem.vue'

export default {
  data() {
    return {
      value: '',                // 搜索关键词
      hotSearchResList: [],     // 热搜关键词结果数组
      keywordSearchList: [],    // 关键词搜索结果数组
      loading: false,           // 加载中(状态) - 只有false才触发
      finished: false,          // 未加载全部 (如果设置为true, 底部就不会再次执行onload, 代表全部加载完成)
      page: 1,
      timer: null
    }
  },
  components: {
    SongItem
  },
  async created() {
    const hotSearchRes = await hotSearchAPI()
    // console.log(hotSearchRes)
    this.hotSearchResList = hotSearchRes.data.result.hots
  },
  methods: {
    async getResList() {
      return await keywordSearchAPI({
        keywords: this.value.trim(),
        limit: 20,
        // offset : 偏移数量，用于分页 , 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
        offset: (this.page - 1) * 20
      })
    },
    async fn(val) {
      this.page = 1
      this.finished = false
      this.value = val
      const keywordSearchRes = await this.getResList()
      // console.log(keywordSearchRes)
      this.keywordSearchList = keywordSearchRes.data.result.songs
      this.loading = false
    },
    async inputFn() {
      this.page = 1
      //防抖:计时n秒，最后执行一次，如果再次触发，重新计时
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.finished = false
        if (this.value.length === 0) {
          this.keywordSearchList = []
          return
        }
        const keywordSearchRes = await this.getResList()
        //  如果搜索结果无数据 -- 清空列表

        if (keywordSearchRes.data.result.songs === undefined) {
          this.keywordSearchList = []
          return
        }
        this.keywordSearchList = keywordSearchRes.data.result.songs
        this.loading = false
      }, 500)
    },
    async onLoad() {
      // 触底事件(加载下一页数据)
      this.page++
      const keywordSearchRes = await this.getResList()

      console.log(keywordSearchRes)

      // 只有一页数据时候，将finished=true --显示没有更多数据

      if (keywordSearchRes.data.result.songs === undefined) {
        console.log('没有更多数据');
        this.finished = true
        this.loading = false
        return
      }
      // 解构并拼接成新的结果数组
      this.keywordSearchList = [
        ...this.keywordSearchList,
        ...keywordSearchRes.data.result.songs
      ]

      this.loading = false
    }
  }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}
van-cell {
  border-bottom: 1px solid lightgrey;
}
</style>
