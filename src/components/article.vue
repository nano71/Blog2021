/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/05/20/14:57
*/

<!--suppress ALL -->

<template>
  <div id="blog-body-content">
    <div class="pa-3 pt-md-4 pa-md-4 rounded-lg-no">
      <!--      头-->
      <div class="v-heading text-h5 mb-4">
        <a class="text--accent-4 teal--text font-weight-light"> #Title: </a>
        {{ content_list["title"] }}
      </div>

      <v-alert
          border="bottom"
          prominent
          text
          color="teal"
          class="rounded-0"
          :style="!isMobile ? 'font-size:14px' : ''"
      >
        <v-avatar class="mr-2 float-left rounded" color="white" tile size="48"
        ><span class="white--text headline">😅</span></v-avatar
        >
        <div>
          <span>梁白</span>
          <br/>
          <span>{{ content_list["CreateTime"] }}</span>
        </div>
      </v-alert>
      <div v-html="style"></div>
      <div id="v-html" v-dompurify-html="content_list['content']"></div>
      <div class="py-6">
        <v-chip
            v-for="(item, index) in tags"
            :key="index"
            color="teal accent-4"
            class="white--text mr-3 rounded-0"
        >#{{ tags[index] }}
        </v-chip>
      </div>

      <v-row class="mx-0" style="background: #f6f6f6">
        <v-col class="text-center grey--text" cols="12" :style="!isMobile ? 'font-size:12px' : ''">
          最后修改于 {{ content_list["LastTime"] }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
      <!--      评论区-->
      <v-row class="mb-4">
        <v-col cols="9" sm="9" md="10" lg="10" xl="10" class="py-0">
          <v-text-field
              id="test"
              v-model="comment"
              :rules="rules"
              counter="255"
              hint="网络不相识，文明在自身"
              label="写下你的评论"
          >
          </v-text-field>
        </v-col>
        <!--        评论按钮&弹窗-->
        <v-col
            cols="3"
            sm="3"
            md="2"
            lg="2"
            xl="2"
            class="align-center justify-end d-flex py-0"
        >
          <v-dialog v-model="dialog" persistent max-width="390">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="teal"
                  dark
                  v-bind="attrs"
                  depressed
                  v-on="isNull ? null : on"
                  @click="isNull ? (snackbar = true) : ''"
              >
                {{ isMobile ? "进行评论" : "评论" }}
              </v-btn>
            </template>

            <v-card class="col-12 rounded-lg-no">
              <v-card-title class="headline pa-0 mb-2"> 请悉知：</v-card-title>
              <v-card-text class="pa-0">
                如果进行评论请在下方输入你的邮箱地址，留空默认匿名
              </v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                      v-model="email"
                      :rules="[email_r.counter, email_r.email]"
                      label="E-mail"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="dialog = false">
                  取消
                </v-btn>
                <v-btn color="green darken-1" text @click="submitComment">
                  接受
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      <v-alert
          v-if="comments.length === 0"
          class="my-0 rounded-0"
          dense
          text
          type="info"
      >
        暂无评论
      </v-alert>
      <v-row :class="comments.length!==0?'pa-3 d-block':'d-none'" :style="!isMobile ?' background: #00bfa5':''">
        <div v-for="(item, index) in comments" :key="index"
             :style="!isMobile ?'border-bottom:1px solid #fafafa60':''">
          <h3 class="letter-spacing-1">
          <span :style="
            comments[index]['Email'] === '1742968988@qq.com' && isMobile
              ? 'color:#4DB6AC;'
              :comments[index]['Email'] === '1742968988@qq.com' && !isMobile
              ?'color:#fff;'
              : !isMobile
              ?'color:#fff;':''
          ">
          {{
              comments[index]["Email"] === "1742968988@qq.com"
                  ? "#站长"
                  : comments[index]["Email"] === ""
                      ? "#匿名游客 "
                      : "#游客 : "
            }}

            <span class="subtitle-2">{{
                comments[index]["Email"] === "1742968988@qq.com"
                    ? ""
                    : comments[index]["Email"]
              }}
          </span>
            </span>
            <span class="subtitle-2 float-right" :style="!isMobile? 'color:white': 'color:#999999;'">
            {{ comments[index]["CreateTime"] }}
          </span>
          </h3>
          <p :style="!isMobile? 'color:white': 'color:#333;'">
            {{ comments[index]["comment"] }}
          </p>
        </div>
      </v-row>
      <v-snackbar
          v-model="snackbar"
          class="rounded-lg-no text-center"
          timeout="2000"
          light
      >
        {{ text }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "BlogBodyContent",
  data() {
    return {
      isMobile: false,
      isNull: true,
      dialog: false,
      snackbar: false,
      tags: [],
      text: `评论不能为空😅，请多多少少写点吧`,
      comment: null,
      rules: [
        (v) => {
          if (v) {
            return v.length <= 255 || "超出部分会被剔除！";
          } else {
            return true;
          }
        },
      ],
      email: "",
      email_r: {
        counter: (value) => {
          return value.length <= 25 || "不支持超长邮箱";
        },
        email: (value) => {
          const pattern =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (value) {
            return pattern.test(value) || "注意邮箱格式";
          } else {
            return true;
          }
        },
      },
      style: `<style>.v-messages__message{ margin-top: 2px;}</style>`,
      content_list: [],
      comments: [],
    };
  },
  watch: {
    comment(newVal) {
      newVal == "" ? (this.isNull = true) : (this.isNull = false);
    },
  },
  mounted() {
    axios
        .all([
          //请求内容
          axios.post(
              this.$store.state.url,
              {
                type: 1,
                bid: this.$route.params.bid,
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
          ),
          //请求评论
          axios.post(
              this.$store.state.url,
              {
                type: 2,
                bid: this.$route.params.bid,
              },
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8",
                },
              }
          ),
        ])
        .then(
            axios.spread((reslistdata, rescomments) => {
              // 上面两个请求都完成后，才执行这个回调方法
              this.content_list = reslistdata.data[1];
            //  console.log(reslistdata);
              this.tags = [
                this.content_list.tag,
                this.content_list.tag2,
                this.content_list.tag3,
              ];
              for (let i = 0; i < this.tags.length; i++) {
                if (this.tags[i] == "") {
                  this.tags.splice(i, this.tags.length - i);
                }
              }
              this.comments = rescomments.data;
              this.start();
            })
        );
    this.onResize();
    window.addEventListener("resize", this.onResize, {passive: true});
  },
  created() {
    this.top();
  },
  beforeDestroy() {
    if (typeof window === undefined) return;
    window.removeEventListener("resize", this.onResize, {passive: true});
  },
  methods: {
    top() {
      this.$emit("top");
      setTimeout(() => {
        this.$emit("top");
      }, 50);
      if (this.throttle) {
        this.throttle = false;
        setTimeout(() => {
          this.throttle = true;
        }, 1500);
      }
    },
    onResize() {
      this.isMobile = window.innerWidth > 1264;
    },
    submitComment() {
      axios
          .post(this.$store.state.url, {
            type: 5,
            bid: this.$route.params.bid,
            email: this.email,
            content: this.comment,
          })
          .then((res) => {
            //成功
            alert(res.data);
            this.dialog = false;
            this.comment = "";
            axios
                .post(
                    this.$store.state.url,
                    {
                      type: 2,
                      bid: this.$route.params.bid,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json;charset=UTF-8",
                      },
                    }
                )
                .then((res) => {
                  this.comments = res.data;
                });
          });
    },
    start() {
      if (this.$store.state.first === 2) {
        this.$store.state.first = 1;
        setTimeout(() => {
          this.$store.state.first = 0;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped>
#v-html >>> pre {
  background: #f6f6f6 !important;
  overflow-x: auto;
}

#v-html >>> code {
  background: #f6f6f6 !important;
}

.letter-spacing-1 {
  letter-spacing: 1px;
}

#v-html >>> a {
  color: inherit !important;
  text-decoration: none !important;
  cursor: pointer !important;
  border-bottom: 1px solid grey !important;
}

#blog-body-content >>> .v-application--wrap {
  min-height: 10vh;
}
</style>
