/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/5/20 12:25
* @Description: unset */
<template>
  <div>
    <!--suppress JSUnusedLocalSymbols -->
    <v-card
      v-for="(item, index) in blog_list"
      v-show="blog_list[index]['title'].indexOf('面试') === -1"
      :key="index"
      class="mx-auto col-10 py-0"
      max-width="768"
      elevation="0"
    >
      <v-card-text>
        <div>
          {{ blog_list[index]["CreateTime"] }}
          <span class="ml-2">ID: {{ blog_list[index]["Bid"] }}</span>
        </div>
        <p class="display-1 text--primary">
          {{ blog_list[index]["title"] }}
        </p>
        <p>{{ blog_list[index]["tag"] }}</p>
        <div class="text--primary overflow-hidden line-3">
          {{ removeHTMLTag(blog_list[index]["content"]) }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          color="teal accent-4"
          :href="'#/content/' + blog_list[index]['Bid']"
          @click="reveal = true"
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
        <v-col>
          <v-container class="max-width">
            <v-pagination
              id="pagination"
              v-model="page"
              color="teal accent-4"
              class="my-4"
              :length="max_page"
              @input="next"
            ></v-pagination>
            <div v-html="pagination_style"></div>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";

export default {
  name: "BlogBody",
  data() {
    return {
      timer_axios: null,
      throttle: true,
      isRouterAlice: true,
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
    </style>`,
    };
  },
  mounted() {
    if (this.$route.params.class) {
      this.class = this.$route.params.class;
      this.$route.params.page
        ? (this.page = parseInt(this.$route.params.page))
        : (this.page = 1);
      axios
        .post(this.$store.state.url, {
          type: 6,
          class: this.class,
          limit_page: this.page,
        })
        .then((response) => {
          this.blog_length = Object.keys(response.data).length;
          for (let i = 0; i < this.blog_length - 1; i++) {
            // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
            Vue.set(this.blog_list, i, response.data[i + 1]);
          }
          this.max_page = Math.ceil(
            response.data[this.blog_length]["count(*)"] / 6
          );
        })
        .catch((error) => {
          alert("结果为空");
          this.back();
          console.log(error);
        });
    } else if (this.$route.params.page && !this.$route.params.class) {
      this.page = parseInt(this.$route.params.page);
      axios
        .post(this.$store.state.url, {
          type: 0,
          limit_page: this.page,
        })
        .then((response) => {
          this.blog_length = Object.keys(response.data).length;
          for (let i = 0; i < this.blog_length - 1; i++) {
            // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
            Vue.set(this.blog_list, i, response.data[i + 1]);
          }
          this.max_page = Math.ceil(
            response.data[this.blog_length]["count(*)"] / 6
          );
        })
        .catch((error) => {
          alert("结果为空");
          this.back();
          console.log(error);
        });
    }
  },
  methods: {
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ |]*\n/g, "\n"); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); 去除多余空行
      str = str.replace(/&nbsp;/gi, ""); //去掉&nbsp;
      str = str.replace(/\s/g, ""); //将空格去掉
      return str;
    },
    //更新下一页
    next() {
      if (this.$route.params.class && this.$route.params.page) {
        if (this.$route.path.slice(1, 2) === "c") {
          this.$router.push({ path: `/class/${this.class}/${this.page}` });
          this.blog_list = [];
          axios
            .post(this.$store.state.url, {
              type: 6,
              class: this.class,
              limit_page: this.page,
            })
            .then((response) => {
              console.log(response);
              this.blog_length = Object.keys(response.data).length;
              for (let i = 0; i < this.blog_length - 1; i++) {
                Vue.set(this.blog_list, i, response.data[i + 1]);
              }
              this.max_page = Math.ceil(
                response.data[this.blog_length]["count(*)"] / 6
              );
            })
            .catch((error) => {
              alert(error);
              this.back();
            });
        }
      } else if (!this.$route.params.class && this.$route.params.page) {
        if (this.$route.path.slice(1, 2) === "p") {
          this.$router.push({ path: `/page/${this.page}` });
          this.blog_list = [];
          axios
            .post(this.$store.state.url, {
              type: 0,
              limit_page: this.page,
            })
            .then((response) => {
              this.blog_length = Object.keys(response.data).length;
              for (let i = 0; i < this.blog_length - 1; i++) {
                // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
                Vue.set(this.blog_list, i, response.data[i + 1]);
              }
              this.max_page = Math.ceil(
                response.data[this.blog_length]["count(*)"] / 6
              );
            })
            .catch((error) => {
              alert(error);
              this.back();
            });
        }
      }
    },
    back() {
      // noinspection JSCheckFunctionSignatures
      this.$router.back(-1);
      setTimeout(() => {
        this.$emit("back");
      }, 500);
    },
    search(i) {
      //防抖
      this.timer_axios && clearTimeout(this.timer_axios);
      this.timer_axios = setTimeout(() => {
        this.blog_list = [];
        axios
          .get(
            this.$store.state.url +
              "?search=" +
              i +
              "&type=7" +
              "&limit_page" +
              this.page
          )
          .then((response) => {
            // console.log (response.data)
            this.blog_length = Object.keys(response.data).length;
            for (let i = 0; i < this.blog_length - 1; i++) {
              Vue.set(this.blog_list, i, response.data[i + 1]);
            }
            this.max_page = Math.ceil(
              response.data[this.blog_length]["count(*)"] / 6
            );
            this.page = 1;
          })
          .catch((error) => {
            if (
              error === "TypeError: Cannot read property 'count(*)' of undefined"
            ) {
              alert("结果为空");
            }

            this.back();
          });
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.v-card-absolute {
  position: absolute;
  right: 3%;
  top: 5%;
}

.line-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  word-break: break-all;
  letter-spacing: 1px;
}
</style>
