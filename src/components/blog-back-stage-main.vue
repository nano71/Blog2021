/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/06/12/19:00
*/
<template>
  <v-app>
    <v-navigation-drawer
      color="teal"
      expand-on-hover
      permanent
      dark
      app
    >
      <v-list>
        <v-list-item
          two-line
          class="px-2">
          <v-list-item-avatar tile>
            <img src="../assets/logo.png" alt="">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>#Administrator</v-list-item-title>
            <v-list-item-subtitle>掌控一切</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

      </v-list>
      <v-divider></v-divider>
      <v-list
        nav
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-note-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>发表博客</v-list-item-title>
        </v-list-item>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          color="white"
        >
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
            ref="a"
            v-for="(it,i) in item.items"
            link
            @click="a($event,i)"
          >
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icons[i] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.items[i]"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <hr id="hr">
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
          <v-list-item-title>收藏</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      elevation="0"
      color="white"
    >
      <!-- -->
    </v-app-bar>
    <v-main
    class="grey lighten-3 pl-0 pt-2">
      <v-content fluid>
        <blog>
        </blog>
      </v-content>
    </v-main>
  </v-app>
</template>
<script>
import blog from './blog-back-stage-blog'

export default {
  name: "BlogBackStageMain",
  data() {
    return {
      r: '&blacktriangleright;',
      clicked: [true, true, true, true, true],
      items: [
        {
          action: 'blogger',
          title: '博客管理',
          icons: [
            'view-list',
            'comment-multiple'
          ],
          items: [
            '博客列表',
            '评论管理'
          ],
        },
        {
          action: 'link',
          title: '链接管理',
          icons: [
            'format-align-top',
            'format-align-left',
            'format-align-bottom'
          ],
          items: [
            '头部链接',
            '左侧链接',
            '底部链接'
          ]
        },
      ],
    }
  },
  components: {
    blog,
  },
  methods: {
    a: function (e, i) {
      console.log(this.$refs.a);
      for (let i = 0; i < e.currentTarget.parentNode.children.length; i++) {
        e.currentTarget.parentNode.children[i].classList.remove("test")
      }
      e.currentTarget.classList.add("test");
    }
  }
}
</script>

<style scoped>
* {
  transition: .5s;
}

hr#hr {
  background: white;
  color: white;
  border: white 1px solid;
  border-bottom: 0;
}
.test{
  background: #00BFA5;
}

</style>
