<template>
  <main>
    <div ref="preview" class="detils-body">
      <v-md-preview :text="content"> </v-md-preview>
    </div>
    <div class="navigation-content" id="permiss" ref="permiss">
      目录
      <div v-for="(item, index) in  atitles" :key="index + 'art'" @click="handleAnchorClick(item)" id="ac">
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
const permiss = ref(null);
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
      

      // 通过监听左边的位置来渲染对应列表中的位置，这里需要对应开来，再加上一个防抖
      let titles = permiss.value.querySelectorAll('#ac');
      // 这里进行滚动监听
      document.addEventListener('scroll' , () => {
        let visibleBottom = window.scrollY + document.documentElement.clientHeight;
        let visibleTop = window.scrollY;
        for(let i = 0 ; i < titles.length ; ++i){
          // 这里是将元素移动到屏幕中央时
          let centerY = titles[i].offsetTop + (titles[i].offsetHeight/2);
          // console.log(centerY);
          if(centerY > visibleTop && centerY < visibleBottom){
            titles[i].classList.add('action');
            console.log(titles[i]);
            break;
          }
        }
      })
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
.action{
  background: red;
}
</style>