/**
* Created with IntelliJ IDEA.
* @Author: Liang-Hao
* @Date: 2021/05/20/14:57
*/

<template>
  <v-app id="blog-body-content">
    <v-main class="pt-4 pa-4"
    >
      <!--      头-->
      <div class="v-heading text-h5 mb-4">
        <a class="text--accent-4 teal--text font-weight-light"> #Title: </a>
        {{ content_list['title'] }}
      </div>

      <v-alert
        border="bottom"
        prominent
        text
        color="teal"
      >
        <v-avatar
          class="mr-5 float-left"
          color="teal accent-4"
          tile
          size="48"
        ><span class="white--text headline">LH</span></v-avatar>
        <div>
          <span>创作者 : Mr.Liang</span>
          <br>
          <span>发布于 : {{ content_list['CreateTime'] }}</span>
        </div>

      </v-alert>
      <div v-html="style"></div>
      <div v-html="content_list['content']" id="v-html">
      </div>

      <div
        class="py-6">
        <v-chip
          v-for="(item,i) in tags"
          color="teal accent-4"
          class="white--text mr-3"
        >#{{ tags[i] }}
        </v-chip>
      </div>

      <v-footer padless>
        <v-col
          class="text-center grey--text"
          cols="12"
        >
          最后修改于 {{ content_list['LastTime'] }} — <strong>Vuetify</strong>
        </v-col>
      </v-footer>
      <!--      评论区-->
      <v-row
        class="mt-4">
        <v-col
          cols="9"
          sm="9"
          md="10"
          lg="10"
          xl="10"
        >
          <v-text-field
            :rules="rules"
            counter="255"
            hint="网络不相识，文明在自身"
            label="写下你的评论"
            id="test"
            v-model="comment"
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
          class="align-center justify-end d-flex">


          <v-dialog
            v-model="dialog"
            persistent
            max-width="390"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="teal"
                dark
                v-bind="attrs"
                v-on="isNull?null:on"
                @click="isNull?snackbar=true:console.log()"
              >
                {{ isMobile ? '进行评论' : '评论' }}
              </v-btn>
            </template>

            <v-card class="col-12">
              <v-card-title class="headline pa-0 mb-2">
                请悉知：
              </v-card-title>
              <v-card-text class="pa-0">
                如果进行评论请在下方输入你的邮箱地址，请放心，我会将你输入的邮箱地址进行部分加密处理
              </v-card-text>
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email"
                    :rules="[email_r.counter,email_r.email]"
                    label="E-mail"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="green darken-1"
                  text
                  @click="dialog = false"
                >
                  取消
                </v-btn>
                <v-btn
                  color="green darken-1"
                  text
                  v-on:click="submitComment"
                >
                  接受
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>


        </v-col>
      </v-row>
      <v-alert
        class="my-6"
        dense
        text
        type="info"
        v-if="!(comments.length != 0)"
      >
        暂无评论
      </v-alert>
      <div
        class="my-10"
        v-for="(item,index) in comments">
        <h3>#游客 : {{ comments[index]['Email'] }}</h3>
        <p>{{ comments[index]['comment'] }}</p>
      </div>
      <v-snackbar
        v-model="snackbar"
        timeout="2000"
        light
      >

        {{ text }}

      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "blog-body-content",
  data() {
    return {
      isMobile: false,
      isNull: true,
      dialog: false,
      snackbar: false,
      tags: [],
      text: `不能为空，多多少少写点吧QAQ`,
      comment: null,
      rules: [v => v.length <= 255 || '超出部分会被剔除！'],
      email: '',
      email_r: {
        counter: value => {
          return value.length <= 25 || '不支持超长邮箱';
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
      },
      style: '<style>.v-messages__message{\n' +
        '  margin-top: 2px;\n' +
        '}</style>',
      content_list: null,
      comments: null,
      url: 'https://personal-station.cn/php/BLOG.php',
    }
  },
  watch: {
    comment(newVal, oldVal) {
      newVal == '' ? this.isNull = true : this.isNull = false;
    }
  },
  mounted() {
    const url = this.url
    axios.all([
      //请求内容
      axios.post(url, {
          type: 1,
          bid: this.$route.params.bid,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }),
      //请求评论
      axios.post(url, {
          type: 2,
          bid: this.$route.params.bid,
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }),
    ]).then(axios.spread((reslistdata, rescomments) => {
      // 上面两个请求都完成后，才执行这个回调方法
      this.content_list = reslistdata.data[1]
      this.tags = [this.content_list.tag, this.content_list.tag2, this.content_list.tag3]
      for (let i = 0; i < this.tags.length; i++) {
        if (this.tags[i] == ''){
          this.tags.splice(i, this.tags.length-i)
        }
      }
      this.comments = rescomments.data
      // console.log('re_two', this.comments)
    })),
      this.onResize()
    window.addEventListener('resize', this.onResize, {passive: true})

  },
  beforeDestroy() {
    if (typeof window === 'undefined') return
    window.removeEventListener('resize', this.onResize, {passive: true})
  },
  methods: {
    onResize() {
      this.isMobile = window.innerWidth > 1264;
    },
    submitComment() {
      axios.post('https://personal-station.cn/php/BLOG.php',
        {
          type: 5,
          bid: this.$route.params.bid,
          email: this.email,
          content: this.comment,
        }
      ).then(res => {
        //成功
        alert(res.data)
        this.dialog = false
        this.comment = ''
        axios.post(this.url, {
            type: 2,
            bid: this.$route.params.bid,
          },
          {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          .then(res => {
            this.comments = res.data
          })
      })

    }
  }
}
</script>

<style scoped>


#v-html >>> pre {
  background: #f6f6f6 !important;
  overflow-x: auto;
}

#v-html >>> code {
  background: #f6f6f6 !important;

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
