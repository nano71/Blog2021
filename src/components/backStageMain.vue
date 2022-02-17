/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/06/12/19:00
*/
<template>
  <v-app>
    <v-navigation-drawer
      color="teal"
      expand-on-hover
      permanent
      dark
      app
      class="z-index-10"
    >
      <v-list>
        <v-list-item two-line class="px-2">
          <v-list-item-avatar tile>
            <img src="../assets/logo.png" alt="" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>#Administrator</v-list-item-title>
            <v-list-item-subtitle>掌控一切</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list nav>
        <v-list-item
          link
          class="test"
          @click="
            a($event, i);
            tabs('发表博客');
          "
        >
          <v-list-item-icon>
            <v-icon>mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>发表博客</v-list-item-title>
        </v-list-item>
        <v-list-group v-for="item in items" :key="item.title" color="white">
          <template v-slot:activator>
            <!--            父级-->
            <v-list-item-icon>
              <v-icon>mdi-{{ item.action }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <!--子-->

          <v-list-item
            v-for="(it, index) in item.items"
            :key="index"
            ref="a"
            link
            @click="
              a($event, it);
              tabs(it);
            "
          >
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icons[index] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.items[index]"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr id="hr" />
        </v-list-group>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>文档数据</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-database-clock</v-icon>
          </v-list-item-icon>
          <v-list-item-title>数据统计</v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-star</v-icon>
          </v-list-item-icon>
          <v-list-item-title>我的收藏</v-list-item-title>
        </v-list-item>

        <v-list-item link @click="$router.push({path:'/'})">
          <v-list-item-icon>
            <v-icon>mdi-location-exit</v-icon>
          </v-list-item-icon>
          <v-list-item-title>退出</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app elevation="0" color="white" hide-on-scroll>
      <v-toolbar-title class="subtitle-1">
        {{ titles[ifs] }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn right absolute elevation="0" color="teal" dark @click="input_blog">
        发布
      </v-btn>
      <!-- -->
    </v-app-bar>
    <v-main class="grey lighten-3 pl-0 pt-2 z-index-1">
      <v-content fluid>
        <blog v-if="ifs === 1" ref="blog" />
        <blog-list v-if="ifs === 2" ref="blog_list" />
        <comment-list v-if="ifs === 3" ref="comment_list" />
      </v-content>
    </v-main>
  </v-app>
</template>
<script>
import blog from "./backStageBlogEdit";
import blogList from "./backStageBlogList";
import commentList from "./backStageCommentList";

export default {
  name: "BlogBackStageMain",
  components: {
    blog,
    blogList,
    commentList
  },
  data() {
    return {
      r: "&blacktriangleright;",
      clicked: [true, true, true, true, true],
      ifs: 1,
      titles: [
        "welcome",
        "发布博客",
        "博客列表",
        "评论管理",
        "头部链接",
        "左侧链接",
        "底部链接",
      ],
      items: [
        {
          action: "blogger",
          title: "博客管理",
          icons: ["view-list", "comment-multiple"],
          items: ["博客列表", "评论管理"],
        },
        {
          action: "link",
          title: "链接管理",
          icons: [
            "format-align-top",
            "format-align-left",
            "format-align-bottom",
          ],
          items: ["头部链接", "左侧链接", "底部链接"],
        },
      ],
    };
  },
  methods: {
    tabs(i) {
      switch (i) {
        case "发表博客":
          this.ifs = 1;
          break;
        case "博客列表":
          this.ifs = 2;
          break;
        case "评论管理":
          this.ifs = 3;
          break;
        case "头部链接":
          this.ifs = 4;
          break;
        case "左侧链接":
          this.ifs = 5;
          break;
        case "底部链接":
          this.ifs = 6;
          break;
      }
    },
    a(e) {
      // console.log(this.$refs.a);
      for (let i = 0; i < document.querySelectorAll(".test").length; i++) {
        document.querySelectorAll(".test")[i].classList.remove("test");
      }
      e.currentTarget.classList.add("test");
    },
    input_blog() {
      //this.$refs.自定义ref属性的值.a(this.r);
      this.$refs.blog.input_blog();
    },
    re_input_blog() {
      this.$refs.blog.re_input_blog();
    },
  },
};
</script>

<style scoped>
* {
  transition: 0.5s;
}

hr#hr {
  background: white;
  color: white;
  border: white 1px solid;
  border-bottom: 0;
}

.test {
  background: #00bfa5;
}

.z-index-10 {
  z-index: 10;
}

.z-index-1 {
  z-index: 1;
}
</style>
