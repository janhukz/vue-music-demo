<template>
  <div>
    <p class="title">推荐歌单</p>
    <van-row>
      <van-col span="8" gutter="6" v-for="obj in recommendMusicResList" :key="obj.id">
        <van-image width="100%" height="3rem" fit="cover" :src="obj.picUrl" />
        <p class="song_name">{{ obj.name }}</p>
      </van-col>
    </van-row>
    <p class="title">最新音乐</p>
      <!-- <van-cell :title="obj.name" :label="obj.song.artists[0].name + ' - ' + obj.name" v-for="obj in newMusicResList" :key="obj.id">
        <template #right-icon>
            <van-icon name="play-circle-o" />
        </template>
      </van-cell> -->
      <song-item :artists="obj.song.artists[0].name" :name="obj.name" :id="obj.id" v-for="obj in newMusicResList" :key="obj.id"></song-item>
  </div>
</template>

<script>
import { recommendMusicAPI,newMusicAPI } from '@/api/index'
import SongItem from '@/components/SongItem.vue'

export default {
  data() {
    return {
      recommendMusicResList: [],
      newMusicResList:[]
    }
  },
  async created() {
    const recommnedRes = await recommendMusicAPI({
      limit: 6
    })
    this.recommendMusicResList = recommnedRes.data.result
    const newMusicRes = await newMusicAPI({
        limit:20
    })
    this.newMusicResList = newMusicRes.data.result
  },
  components:{
    SongItem
  }
}
</script>

<style scoped>
/* 标题 */
.title {
  padding: 0.266667rem 0.24rem;
  margin: 0 0 0.24rem 0;
  background-color: #eee;
  color: #333;
  font-size: 15px;
}
/* 推荐歌单 - 歌名 */
.song_name {
  font-size: 0.346667rem;
  padding: 0 0.08rem;
  margin-bottom: 0.266667rem;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
}
.van-cell {
  border-bottom: 1px solid lightgrey;
}
/* .main {
  padding-bottom: 45px;
} */
</style>
