<template>
  <main>
    <div ref="preview" class="detils-body">
      <v-md-preview :text="content"> </v-md-preview>
    </div>
    <div class="navigation-content" id="permiss">
      目录
      <div v-for="(item, index) in  atitles" :key="index + 'art'" @click="handleAnchorClick(item)">
        {{ item.title }}
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { inject, ref, nextTick } from 'vue'

let content = ref('')
const atitles = ref([])
const preview = ref(null);
const $axios = inject('$axios');

$axios.get('').then(res => {
  content.value = res.data;
  getTitle();
})

// 获取标题生成列表
const getTitle = () => {
  nextTick(() => {
    const anchors = preview.value.querySelectorAll('h1,h2,h3,h4,h5,h6');
    const titles = Array.from(anchors).filter(title => !!title.innerText.trim());

    atitles.value = titles.map(el => ({
      title: el.innerText,
    }));
    const hTags = Array.from(new Set(titles.map(title => title.tagName))).sort();
    atitles.value = titles.map(el => ({
      title: el.innerText,
      lineIndex: el.getAttribute('data-v-md-line'),
      indent: hTags.indexOf(el.tagName)
    }));
    console.log(titles);
    
    nextTick(()=>{
      // 挂载样式

    })
  })
}
const handleAnchorClick = (item) => {
  const { lineIndex } = item;
  const heading = preview.value.querySelector(`[data-v-md-line="${lineIndex}"]`);
  console.log(heading);
  // 跳转
  heading.scrollIntoView({behavior: "smooth", inline: "nearest"});
  // 样式变更
}
</script>

<style scoped>
.detils-body{
  width: 80%;
  float: left;
}
.navigation-content{
  width: 20%;
  float: left;
  position:fixed;
  right:0px;
}
</style>