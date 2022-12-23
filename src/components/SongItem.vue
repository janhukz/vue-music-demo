<template>
  <div>
    <van-cell center :title="name" :label="artists + ' - ' + name" :key="id">
      <template #right-icon>
        <van-icon name="play-circle-o" @click="playFn" />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    artists: {
      type: String
    },
    name: {
      type: String
    },
    id: {
      type: Number
    }
  },
  methods: {
    playFn() {
        this.$router.push({
            path:'/play',
            query:{
                id:this.id
            }
        })
    }
  }
}
</script>

<style></style>
