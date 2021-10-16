/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/5/20 12:25
* @Description: unset */
<template>
  <div id="app">
    <!--所有vuetify组件都位于v-app-->
    <v-app>
      <!--应用栏-->
      <v-app-bar v-if="isMobile" color="white" flat app>
        <!--内容居中和水平填充-->
        <v-container class="py-0 fill-height">
          <!--头像-->
          <v-avatar
            class="point"
            color="teal accent-4"
            tile
            size="50"
            @click="to_blog"
          >
            <span class="white--text headline">LH</span>
          </v-avatar>
          <span class="text-h4 font-weight-thin ml-3 mr-3">|</span>
          <span class="mr-10 text-h5 text-uppercase point" @click="to_blog">
            Blog
          </span>
          <!--v-btn用作浮动动作按钮-->
          <v-btn
            v-for="(item, index) in links"
            :key="index"
            :href="links_href[index]"
            text
          >
            {{ links[index] }}
          </v-btn>
          <!--间隔组件-->
          <v-spacer></v-spacer>
          <!--v-responsive 组件可用于将任何部分固定到特定的宽高比。-->
          <v-responsive max-width="260">
            <!--文本框-->
            <v-text-field
              id="search"
              v-model="search"
              dense
              flat
              hide-details
              rounded
              solo-inverted
              color="teal"
              @keyup="searchKeyup"
              @change="search = null"
            >
              <template v-slot:label> Click here to search all...</template>
            </v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>

      <v-app-bar v-if="!isMobile" color="white" flat app :width="windowWidth">
        <div v-html="style"></div>
        <v-toolbar-title class="point" @click="to_blog"
          >BLO
          <span class="teal--text">G</span>
          <small>vue</small>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-responsive max-width="260" class="d-none d-sm-block">
          <!--文本框-->
          <v-text-field
            id="search"
            v-model="search"
            dense
            flat
            hide-details
            rounded
            solo-inverted
            color="teal"
            @keyup="searchKeyup"
            @change="search = null"
          >
            <template v-slot:label> Click here to search all...</template>
          </v-text-field>
        </v-responsive>

        <v-btn
          v-if="windowWidth < 600"
          plain
          color="black"
          icon
          @click="mobile_search_show = !mobile_search_show"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="black" icon plain v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <div
            style="
              width: 25px;
              height: 25px;
              transform: rotate(45deg);
              background: #00bfa5;
              position: absolute;
              z-index: 0;
              right: 11px;
              top: 38px;
            "
          ></div>
          <v-list class="mt-12" color="teal accent-4">
            <v-list-item
              v-for="(item, index) in options"
              :key="index"
              :href="links_href[index]"
            >
              <v-list-item-title class="white--text"
                >{{ options[index] }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <div
        v-if="!isMobile"
        id="mobile_more"
        class="overflow-hidden d-sm-none"
        :style="
          !isMobile && mobile_search_show && windowWidth < 550
            ? 'height:166px'
            : !isMobile && mobile_search_show && windowWidth > 600
            ? 'height:0'
            : !isMobile && mobile_search_show && windowWidth > 550
            ? 'height:108px'
            : ''
        "
      >
        <v-row class="px-4">
          <v-col cols="12">
            <v-responsive class="d-sm-none">
              <!--文本框-->
              <v-text-field
                id="search"
                v-model="search"
                dense
                flat
                hide-details
                rounded
                solo-inverted
                color="teal"
                @keyup="searchKeyup"
                @change="search = null"
              >
                <template v-slot:label> Click here to search all...</template>
              </v-text-field>
            </v-responsive>
          </v-col>
          <v-col
            class="pt-0 overflow-x-auto float-left justify-center"
            cols="12"
          >
            <v-list-item
              v-for="(item, index) in Tag_class"
              :key="index"
              class="float-left"
              link
              @click="_class(Tag_class[index])"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium text-uppercase">
                  {{ Tag_class[index] }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="float-left"
              link
              color="grey lighten-4"
              @click="_all"
            >
              <v-list-item-content>
                <v-list-item-title> 浏览全部</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </div>
      <v-main
        :style="
          !isMobile && mobile_search_show && windowWidth < 550
            ? 'margin-top:166px'
            : !isMobile && mobile_search_show && windowWidth > 550
            ? 'margin-top:108px'
            : windowWidth > 600
            ? 'margin-top:unset'
            : ''
        "
        class="grey lighten-3"
      >
        <v-container>
          <v-row class="justify-center">
            <v-col
              class="
                col-sm-4
                d-none d-sm-block
                col-md-3 col-lg-2
                text-center
                pr-0
              "
              min-width="128"
            >
              <v-sheet rounded="lg" class="sticky">
                <v-list color="transparent">
                  <v-list-item-title
                    class="mt-3 mb-3 Body-2 font-weight-light"
                    style="color: #666666"
                  >
                    技术分类
                  </v-list-item-title>
                  <v-list-item
                    v-for="(item, index) in Tag_class"
                    :key="index"
                    link
                    @click="_class(Tag_class[index])"
                  >
                    <v-list-item-content>
                      <v-list-item-title
                        class="font-weight-medium text-uppercase"
                      >
                        {{ Tag_class[index] }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="my-0"></v-divider>
                  <v-list-item link color="grey lighten-4" @click="_all">
                    <v-list-item-content>
                      <v-list-item-title> 全部</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>

              <v-sheet rounded="lg" class="mt-3">
                <v-list color="transparent">
                  <v-list-item-title
                    class="mt-3 mb-3 Body-2 font-weight-light"
                    style="color: #666666"
                  >
                    即将上线 歪门邪道
                  </v-list-item-title>
                  <v-list-item
                    v-for="n in 5"
                    :key="n"
                    class="font-weight-medium text-uppercase"
                    link
                  >
                    <v-list-item-content>
                      <v-list-item-title> 即将上线 {{ n }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider class="my-2"></v-divider>

                  <v-list-item link color="grey lighten-4">
                    <v-list-item-content>
                      <v-list-item-title> 即将上线 你的提议</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-sheet>
            </v-col>

            <v-col class="col-sm-8 col-12 col-md-9 col-lg-8 col-xl-7">
              <v-sheet class="py-4" min-height="10vh" rounded="lg">
                <router-view
                  v-if="isRouterAlice"
                  ref="child"
                  @back="reload"
                ></router-view>
                <!-- 内容  -->
              </v-sheet>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <blog-footer :window-width="windowWidth" @top="top" />
    </v-app>
  </div>
</template>
<script>
import BlogFooter from "./blog-footer";

export default {
  components: {
    "blog-footer": BlogFooter,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      mobile_search_show: false,
      mobile_bar_height: 56,
      search: null,
      isRouterAlice: true,
      overlay: false,
      isMobile: false,
      links: ["本站简介", "版权声明", "关于我", "控制台"],
      links_href: ["#/document", "#/copyright", "#/about", "#/bbs"],
      c_btn: "teal accent-4",
      options: ["本站简介", "版权声明", "关于我", "控制台"],
      style: "<style>.v-menu__content{box-shadow:none !important;}</style>",
      windowWidth: null,
      Tag_class: ["HTML&CSS", "JavaScript", "PHP", "Vue", "日志"],
      op: {
        duration: 200,
        offset: 500,
        easing: "linear",
      },
    };
  },
  beforeDestroy() {
    if (typeof window === undefined) return;
    // noinspection JSCheckFunctionSignatures
    window.removeEventListener("resize", this.onResize, { passive: true });
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    reload() {
      this.isRouterAlice = false;
      this.$nextTick(() => {
        this.isRouterAlice = true;
      });
    },
    top() {
      this.$vuetify.goTo(0, this.op);
    },
    to_blog() {
      this.$router.push({ path: "/" });
    },
    onResize() {
      this.isMobile = window.innerWidth > 1264;
      this.windowWidth = window.innerWidth;
      this.windowWidth > 600 ? (this.mobile_search_show = false) : "";
    },
    _class(i) {
      if (
        this.$route.path !== `/class/${i}` ||
        this.$route.path !== `/class/${i}/1`
      ) {
        this.$router.push({ path: `/class/${i}/1` });
        this.reload();
      }
    },
    _all() {
      this.$router.push({ path: `/page/1` });
      this.reload();
    },
    searchKeyup() {
      // console.log (this.search);
      console.log(this.$route.path.slice(1, 2));
      if (
        this.$route.path.slice(1, 2) !== "p" ||
        this.$route.path.slice(1, 2) !== "c"
      ) {
        this.$router.push({ path: `/page/1` });
      }
      // noinspection JSUnresolvedFunction
      this.$refs.child.search(this.search);
    },
  },
};
</script>
<style scoped lang="less">
#mobile_more {
  position: fixed;
  top: 56px;
  height: 0;
  width: 100vw;
  z-index: 8;
  background-color: white;
  transition: 0.2s;
}

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

.sticky {
  position: sticky;
}
</style>
