/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/5/20 12:25
* @Description: unset */
<template>
  <div id="app">
    <!--所有vuetify组件都位于v-app-->
    <v-app>
      <!--应用栏-->
      <v-app-bar v-if="isMobile" color="white" flat app>
        <!--内容居中和水平填充-->
        <v-container class="pa-0 fill-height col-9">
          <!--头像-->
          <v-avatar
              class="point"
              color="teal accent-4"
              tile
              height="50"
              width="auto"
              @click="toBlog"
          >
            <span class="white--text headline mx-3">N</span>
          </v-avatar>
          <span class="text-h4 font-weight-thin ml-3 mr-3">|</span>
          <span class="mr-10 text-h5 text-uppercase point" @click="toBlog">
            Blog
          </span>
          <!--v-btn用作浮动动作按钮-->
          <v-btn
              v-for="(item, index) in $store.state.links"
              :key="index"
              text
              @click="$router.push({ path: $store.state.links_href[index] })"
          >
            {{ item }}
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
                solo-inverted
                color="teal"
                class="rounded-lg-no"
                @keyup="searchKeyup"
                @change="search = null"
            >
              <template v-slot:label> Click here to search all...</template>
            </v-text-field>
          </v-responsive>
        </v-container>
      </v-app-bar>

      <v-app-bar
          v-if="!isMobile"
          id="mobileBar"
          color="white"
          flat
          app
          :width="windowWidth"
      >
        <v-toolbar-title class="point font-weight-light" @click="toBlog"
        >NANO71<span class="text-caption">BLO<span class="info--text font-weight-bold">G</span></span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-responsive max-width="260" class="d-none d-sm-block" >
          <!--文本框-->
          <v-text-field
              v-model="search"
              dense
              flat
              class="rounded-0"
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

        <v-menu left bottom rounded="0">
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
                v-for="(item, index) in $store.state.options"
                :key="index"
                @click="$router.push({ path: $store.state.links_href[index] })"
            >
              <v-list-item-title class="white--text"
              >{{ item }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="white--text"
              >留言板
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title class="white--text"
              >友情链接
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <div
          v-if="!isMobile"
          id="mobileMore"
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
                v-for="(item, index) in $store.state.Tag_class"
                :key="index"
                class="float-left"
                link
                @click="_class(item)"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-medium text-uppercase">
                  {{ item }}
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
      >
        <v-container class="col-md-9">
          <v-row class="justify-center">
            <v-col class="pa-0 pa-sm-2 pa-md-3 col-12 col-sm-9 col-lg-10">
              <v-sheet min-height="10vh" class="rounded-lg-no">
                <router-view
                    v-if="isRouterAlice"
                    ref="child"
                    @back="reload"
                    @top="top"
                ></router-view>
                <!-- 内容  -->
              </v-sheet>
            </v-col>
            <v-col
                id="indexRight"
                ref="QRH"
                class="
                col-3 col-lg-2
                d-none d-sm-block
                text-center
                pa-sm-2 pa-md-3
                pl-0 pl-sm-0 pl-md-0
                relative
              "
                min-width="128"
                style="min-height: 800px"
            >
              <div
                  class="sticky"
                  :style="`${
                  $store.state.windowWidth > 960 ? 'top: 76px;' : 'top: 64px;'
                } z-index: 4`"
              >
                <v-sheet>
                  <v-list color="transparent">
                    <div
                        class="
                        py-2
                        pl-3
                        my-1
                        mt-lg-2
                        text-left
                        font-weight-bold
                        border-right border-4 border-tel
                      "
                    >
                      技术分类
                    </div>
                    <v-list-item
                        v-for="(item, index) in $store.state.Tag_class"
                        :key="index"
                        link
                        class="fs-14 text-uppercase justify-space-between"
                        @click="_class(item)"
                    >
                      <div class="d-flex justify-space-between w-100">
                        <span
                            :class="
                            item === $store.state.blogListIndex &&
                            'font-weight-black teal--text accent-4'
                          "
                        >
                          {{ item }}
                        </span>
                        <v-icon
                            v-if="item === $store.state.blogListIndex"
                            color="#00bfa5"
                            size="16"
                        >mdi-chevron-left
                        </v-icon
                        >
                      </div>
                    </v-list-item>
                    <v-list-item link class="fs-14" @click="_all">
                      <div class="d-flex justify-space-between w-100">
                        <span
                            :class="
                            !$store.state.blogListIndex &&
                            'font-weight-black teal--text accent-4'
                          "
                        >
                          全部
                        </span>
                        <v-icon
                            v-if="!$store.state.blogListIndex"
                            color="#00bfa5"
                            size="16"
                        >mdi-chevron-left
                        </v-icon
                        >
                      </div>
                    </v-list-item>
                  </v-list>
                </v-sheet>
                <div :class="windowWidth < 1024 && 'd-none'">
                  <div
                      class="
                      d-block
                      pa-2
                      mt-md-3 mt-sm-2
                      white
                      rounded-lg-no rounded-b-0
                    "
                  >
                    <div
                        :class="`${QR === 'qq' ? 'state-1' : 'state-2'} QRBox`"
                    >
                      <img src="https://personal-station.cn/QQ_QR.png" alt=""/>
                      <img src="https://personal-station.cn/WX_QR.png" alt=""/>
                    </div>
                  </div>
                  <div class="d-flex justify-space-between">
                    <v-btn
                        class="rounded-lg-no rounded-r-0 rounded-t-0 flex-grow-1"
                        elevation="0"
                        :color="QR === 'qq' ? 'white' : ''"
                        @click="QR = 'qq'"
                    >QQ
                    </v-btn>
                    <v-btn
                        elevation="0"
                        class="rounded-lg-no rounded-l-0 rounded-t-0 flex-grow-1"
                        :color="QR === 'wx' ? 'white' : ''"
                        @click="QR = 'wx'"
                    >WX
                    </v-btn>
                  </div>
                </div>
                <v-list-item
                    class="mt-md-3 mt-sm-2 rounded-lg-no fs-14 white"
                    link
                    @click="$router.push({ path: '/document' })"
                >
                  <div class="w-100 d-flex justify-space-between">
                    <span>留言板</span>
                    <v-icon color="#00bfa5" size="16">mdi-chevron-right</v-icon>
                  </div>
                </v-list-item>
                <v-list-item
                    class="rounded-lg-no mt-md-3 mt-sm-2 fs-14 white"
                    link
                    @click="$router.push({ path: '/document' })"
                >
                  <div class="w-100 d-flex justify-space-between">
                    <span>友情链接</span>
                    <v-icon color="#00bfa5" size="16">mdi-chevron-right</v-icon>
                  </div>
                </v-list-item>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <blog-footer :window-width="windowWidth" @top="top"/>
    </v-app>
  </div>
</template>
<script>
import BlogFooter from "../components/footer";

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
      QR: "qq",
      mobile_search_show: false,
      mobile_bar_height: 56,
      search: null,
      isRouterAlice: true,
      overlay: false,
      isMobile: false,
      windowWidth: null,
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
    window.removeEventListener("resize", this.onResize, {passive: true});
  },

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize, {passive: true});
  },
  methods: {
    reload() {
      this.isRouterAlice = false;
      this.$nextTick(() => {
        this.isRouterAlice = true;
        this.top();
      });
    },
    top() {
      this.$vuetify.goTo(0, this.op);
    },
    toBlog() {
      this.$router.push({path: "/"});
    },
    onResize() {
      this.isMobile = window.innerWidth > 1264;
      this.windowWidth = window.innerWidth;
      this.$store.state.windowWidth = window.innerWidth;
      this.windowWidth > 600 ? (this.mobile_search_show = false) : "";
    },
    _class(i) {
      if (
          this.$route.path !== `/class/${i}` &&
          this.$route.path !== `/class/${i}/1`
      ) {
        this.$router.push({path: `/class/${i}/1`});
        this.$store.state.blogListIndex = i;
        this.reload();
      }
    },
    _all() {
      if (this.$route.path !== `/1`) {
        this.$router.push({path: `/1`});
        this.$store.state.blogListIndex = null;
        this.top();
        this.reload();
      }
    },
    searchKeyup() {
      // console.log (this.search);
      // console.log(this.$route.path.slice(1, 2));
      if (
          this.$route.path.slice(1, 2) < 0 &&
          this.$route.path.slice(1, 2) !== "c"
      )
        this.$router.push({path: `/1`});
      console.log(this.$refs.child);
      this.$refs.child.search(this.search);
    },
  },
};
</script>
<style scoped lang="less">
#mobileMore {
  position: fixed;
  top: 56px;
  height: 0;
  width: 100vw;
  z-index: 8;
  background-color: white;
  transition: 0.2s;
  box-shadow: rgba(239, 239, 239, 0.43) 0 9px 9px;
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
.v-input{
  border-radius: 0 !important;
}
</style>
