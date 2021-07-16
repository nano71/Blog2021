/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/5/20 12:25
* @Description:  unset
*/
<template>
  <div id="app">

    <!--所有vuetify组件都位于v-app-->
    <v-app>

      <!--应用栏-->
      <v-app-bar
        color="white"
        flat
        app
        v-if="isMobile"
      >
        <!--内容居中和水平填充-->
        <v-container class="py-0 fill-height">
          <!--头像-->
          <v-avatar
            class="point"
            @click="to_blog"
            color="teal accent-4"
            tile
            size="50"
          ><span class="white--text headline">LH</span>
          </v-avatar>
          <span class="text-h4 font-weight-thin  ml-3 mr-3">|</span>
          <span class="mr-10 text-h5 text-uppercase point" @click="to_blog">
            Blog
         </span>
          <!--v-btn用作浮动动作按钮-->
          <v-btn
            v-for="(item,link) in links"
            text
            :href="links_href[link]"
          >
            {{ links[link] }}
          </v-btn>
          <!--间隔组件-->
          <v-spacer></v-spacer>
          <!--v-responsive 组件可用于将任何部分固定到特定的宽高比。-->
          <v-responsive max-width="260">
            <!--文本框-->
            <v-text-field
              dense
              flat
              hide-details
              rounded
              solo-inverted
            ></v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>

      <v-app-bar
        color="white"
        flat
        app
        v-if="!isMobile"
        :width="windowWidth"
      >
        <span v-html="v_toolbar"></span>
        <v-toolbar-title @click="to_blog" class="point">BLO<span class="teal--text">G</span><small>vue</small>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn color="black" plain icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn plain color="black" icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>


        <v-menu
          left
          bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="black"
              icon
              plain
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <div
            style="width: 25px;height: 25px; transform: rotate(45deg); background: #00BFA5;position:absolute;z-index: 6; right: 11px;top: 38px">

          </div>
          <v-list
            class="mt-12"
            color="teal accent-4">
            <v-list-item
              v-for="n in options"
              :key="n"
              @click="() => {}"
            >
              <v-list-item-title class="white--text">{{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>

      <v-main class="grey lighten-3">
        <v-container>
          <v-row class="justify-center">
            <v-col class="col-sm-4 .d-none .d-sm-flex col-md-3 col-lg-2 text-center" min-width="128">
              <v-sheet rounded="lg">
                <v-list color="transparent">
                  <v-list-item-title
                    class="mt-3 mb-3 Body-2 font-weight-light"
                    style="color: #666666">
                    技术分类
                  </v-list-item-title>
                  <v-list-item
                    v-for="(item,index) in Tag_class"
                    link
                  >
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-medium text-uppercase">
                        {{ Tag_class[index] }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>

              <v-sheet rounded="lg" class="mt-6">
                <v-list color="transparent">
                  <v-list-item-title
                    class="mt-3 mb-3 Body-2 font-weight-light"
                    style="color: #666666">
                    歪门邪道
                  </v-list-item-title>
                  <v-list-item
                    class="font-weight-medium text-uppercase"
                    v-for="n in 5"
                    :key="n"
                    link
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        List Item {{ n }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider class="my-2"></v-divider>

                  <v-list-item
                    link
                    color="grey lighten-4"
                    @click="top"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        你的提议
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col
              class="col-sm-8 col-12 col-md-9 col-lg-8 col-xl-5"
            >
              <v-sheet
                class="pt-4 mb-16"
                min-height="10vh"
                rounded="lg"
              >
                <router-view></router-view>
                <!--  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <blog-footer @top="top"/>
    </v-app>
  </div>
</template>
<script>
import BlogFooter from './blog-footer'
import BlogBody from './blog-body'

export default {
  components: {
    'blog-footer': BlogFooter,
    'blog-body': BlogBody
  },
  // 箭头函数 (x) => x+6 相当于 function (x) { return x+6 } //
  data () {
    return {
      overlay: false,
      isMobile: false,
      links: [
        '本站简介',
        '版权声明',
        '关于我',
        '控制台'
      ],
      links_href: [
        '#/document',
        '#/copyright',
        '#/about',
        '#/bbs'
      ],
      c_btn: 'teal accent-4',
      options: [
        '本站简介',
        '版权声明',
        '关于我',
        '控制台'
      ],
      v_toolbar: "<style>.v-menu__content{box-shadow:none !important;}</style>",
      windowWidth: null,
      Tag_class: [
        'Html',
        'Css',
        'JS脚本',
        'JQuery',
        'Vue.js',
      ],
      op: {
        duration: 500,
        offset: 500,
        easing: 'easeInOutCubic',
      }
    }
  },
  beforeDestroy () {
    if (typeof window === 'undefined') return
    window.removeEventListener ('resize', this.onResize, {passive: true})
  },

  mounted () {
    this.onResize ()
    window.addEventListener ('resize', this.onResize, {passive: true})
  },

  methods: {
    top () {
      this.$vuetify.goTo (400, this.op)
    },
    to_blog () {
      this.$router.push ({path: '/'})
    },
    onResize () {
      this.isMobile = window.innerWidth > 1264;
      this.windowWidth = window.innerWidth
    }
  }
}

</script>
<style scoped lang="less">

.point {
  cursor: pointer;
}

.small-shadow {
  ul {
    li {
      button {
        box-shadow: none !important;
      }
    }
  }
}

</style>
