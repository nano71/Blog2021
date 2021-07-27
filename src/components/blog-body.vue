/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/5/20 12:25
* @Description:  unset
*/
<template>
  <div>
    <v-card
      v-for="(item,index) in blog_list"
      class="mx-auto col-10 py-0"
      max-width="768"
      elevation="0"
    >
      <v-card-text>
        <v-img
          class="float-right  d-sm-none d-md-flex d-none v-card-absolute"
          lazy-src="https://picsum.photos/id/11/10/6"
          :aspect-ratio="7/6"
          width="285"
          src="https://picsum.photos/id/11/500/300"
        ></v-img>
        <div>{{ blog_list[index]['CreateTime'] }}</div>
        <p class="display-1 text--primary">
          {{ blog_list[index]['title'] }}
        </p>
        <p>{{ blog_list[index]['tag'] }}</p>
        <div
          style="max-height: 75px "
          class="text--primary col-lg-7 col-xl-7 col-md-6 col-sm-12 col-12 overflow-hidden">
          {{ removeHTMLTag (blog_list[index]['content']) }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          @click="reveal = true"
          :href="'#/content/'+blog_list[index]['Bid']"
        >
          <!--          :href="blog_list[index].url"-->
          Learn More
        </v-btn>
      </v-card-actions>

      <v-divider class="my-6"></v-divider>
    </v-card>
    <!--分页-->
    <v-container>
      <v-row align="end" justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              id="pagination"
              color="teal accent-4"
              v-model="page"
              class="my-4"
              :length="max_page"
              @input="next"
            ></v-pagination>
            <span v-html="pagination_style"></span>
          </v-container>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>
<script>

import axios from "axios";
import Vue from "vue";
import notfound from "@/components/notfound";

export default {
  name: 'blog-body',
  data () {
    return {
      page: 5,
      class: null,
      max_page: 1,
      blog_length: 0,
      blog_list: {},
      pagination_style: `<style>
      #pagination .v-pagination__navigation ,#pagination .v-pagination__item--active , #pagination .v-pagination__item{
              box-shadow: unset !important;
              background-color: #f0f0f0 ;
      }
    </style>`
    }
  },
  mounted () {
    if (this.$route.params.class) {
      this.class = this.$route.params.class
      axios.post ('https://personal-station.cn/php/BLOG.php', {
        type: 6,
        class: this.class
      }).then ((response) => {
        // console.log (response);
        this.blog_length = Object.keys (response.data).length
        for (let i = 0; i < this.blog_length - 1; i++) {
          // this.blog_list[i] = response.data[i + 1]
          // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
          Vue.set (this.blog_list, i, response.data[i + 1])
        }
        this.max_page = Math.ceil (response.data[this.blog_length]["count(*)"] / 6)
        // console.log ('最大页数：' + this.max_page);
        // console.log ('处理后的列表:');
        // console.log (this.blog_list);
      }).catch ((error) => {
        // alert (error)
        alert ("结果为空")
        window.location.href = "/"
      })
    } else {
      parseInt (this.$route.params.page)
      this.page = parseInt (this.$route.params.page)
      // console.log ('当前页数：' + this.page)
      axios.post ('https://personal-station.cn/php/BLOG.php', {
        type: 0,
        limit_page: this.page,
      }).then ((response) => {
        this.blog_length = Object.keys (response.data).length
        for (let i = 0; i < this.blog_length - 1; i++) {
          // this.blog_list[i] = response.data[i + 1]
          // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
          Vue.set (this.blog_list, i, response.data[i + 1])
        }
        this.max_page = Math.ceil (response.data[this.blog_length]["count(*)"] / 6)
        // console.log ('最大页数：' + this.max_page);
        // console.log ('处理后的列表:');
        // console.log (this.blog_list);
      }).catch ((error) => {
        // alert (error)
        alert ("结果为空")
        window.location.href = "/"
      })
    }

  },
  methods: {
    removeHTMLTag (str) {
      str = str.replace (/<\/?[^>]*>/g, ''); //去除HTML tag
      str = str.replace (/[ | ]*\n/g, '\n'); //去除行尾空白
//str = str.replace(/\n[\s| | ]*\r/g,'\n'); 去除多余空行
      str = str.replace (/&nbsp;/ig, ''); //去掉&nbsp;
      str = str.replace (/\s/g, ''); //将空格去掉
      return str;
    },
    //更新下一页
    next: function () {
      this.$router.push ({path: `/page/${this.page}`})
      this.blog_list = []
      axios.post ('https://personal-station.cn/php/BLOG.php', {
          type: 0,
          limit_page: this.page,
        }).then ((response) => {
        // console.log(response.data)
        this.blog_length = Object.keys (response.data).length
        for (let i = 0; i < this.blog_length - 1; i++) {
          // this.blog_list[i] = response.data[i + 1]
          // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
          Vue.set (this.blog_list, i, response.data[i + 1])
        }
        this.max_page = Math.ceil (response.data[this.blog_length]["count(*)"] / 6)
        // console.log ('最大页数：' + this.max_page);
        // console.log ('处理后的列表:');
      }).catch ((error) => {
        alert (error)
      })
    }
  }
}
</script>

<style scoped lang="less">

.v-card-absolute {
  position: absolute;
  right: 3%;
  top: 5%;
}

</style>
