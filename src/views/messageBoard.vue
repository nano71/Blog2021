<template>
  <div id="messageBoard">
    <v-parallax
        dark
        src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
    >
      <v-row
          align="center"
          justify="center"
      >
        <v-col class="text-center" cols="12">
          <h1 class="display-1 font-weight-thin mb-4">留言板</h1>
          <h4 :class="{'d-inline-block':true,subheading:true,lightIndex,lightIndex2:true}">{{ title }}&nbsp;</h4>
        </v-col>
      </v-row>
    </v-parallax>
    <v-card
        id="messageList"
        class="mx-auto rounded-lg-no pa-3 pa-sm-4 pa-md-4 pb-0 pb-sm-0 pb-md-0"
        elevation="0"
    >

      <h3 class="d-flex mb-5 align-center">
        <span style="white-space: nowrap">填写以下</span>
        <span style="font-size: 14px" class="ms-2 font-weight-light">
          昵称留空默认匿名 , 邮箱地址和个人站点网址可空 , 内容必须有嗷
        </span>
      </h3>
      <div class="d-flex mb-3">
        <v-text-field
            v-model="name"
            dense
            flat
            hide-details
            solo-inverted
            color="teal"
            class="rounded-lg-no me-3"
            placeholder="昵称"
        />
        <v-text-field
            v-model="email"
            dense
            flat
            hide-details
            solo-inverted
            color="teal"
            class="rounded-lg-no me-3"
            placeholder="邮箱"
            @blur="parse('email',email)"
        />
        <v-text-field
            v-model="url"
            dense
            flat
            hide-details
            solo-inverted
            color="teal"
            class="rounded-lg-no me-3"
            placeholder="网址"
            @blur="parse('url',url)"
        />
        <div>
          <v-btn @click="commit" style="height: 100%;" dark depressed color="teal accent-4">
            提交
          </v-btn>
        </div>

      </div>
      <v-textarea
          v-model="content"
          dense
          flat
          hide-details
          solo-inverted
          color="teal"
          class="rounded-lg-no mb-3"
          placeholder="内容"
          auto-grow
      />
      <h3 class="d-flex mb-5 pt-5 align-center">
        留言区域
        <span style="font-size: 14px" class="ms-2 font-weight-light">共{{ list.length }}条</span>
      </h3>
      <div class="mb-5 messageItem" v-for="(item,index) in list" :key="'list'+index">
        <div class="d-flex justify-space-between">
          <div class="d-flex align-center left">
            <span class="teal--text text--accent-4 font-weight-bold">
            #{{ item.name || "匿名网友" }}
            </span>
            <!--            <span class="ms-3">id:{{ item.id }}</span>-->
          </div>
        </div>
        <div class="content my-3">
          {{ item.content }}
        </div>
        <div style="font-size:14px;color: #999999">
          {{ item.createTime.toString().substring(0, 16) }}
          <a :href="item.url"
             class="ms-3">{{ item.url }}</a>
        </div>
      </div>
    </v-card>
    <v-container>
      <v-row align="end" justify="center">
        <v-col>
          <v-container class="max-width">
            <v-pagination
                id="pagination"
                v-model="page"
                :length="maxPage"
                color="teal accent-4"
                class="my-4"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
        class="rounded-lg-no text-center"
        timeout="2000"
        light
        v-model="snackbar"
    >
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "messageBoard",
  data() {
    return {
      page: 1,
      maxPage: 1,
      list: [],
      name: "",
      email: "",
      url: "",
      content: "",
      welcomeTextList: [
        "This small message board !",
        "It is also a free message board."
      ],
      title: "",
      lightIndex: true,
      titleAfter: "|",
      snackbar: false,
      snackbarText: "",
      emailCheck: false,
      urlCheck: false
    }
  },
  created() {
    this.$store.state.blogListIndex = "message"
    this.request()
    this.init()
  },
  methods: {
    parse(type, value) {
      switch (type) {
        case 'email':
          if (value === "") {
            break;
          }
          if (!(/.+@.+\..+/.test(value))) {
            this.emailCheck = false
            this.snackbarText = "邮箱格式错误 , 提交后将不会被记录"
            this.snackbar = true
            break;
          }
          this.emailCheck = true
          break;
        case 'url':
          if (value === "") {
            break;
          }
          if (!(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(value))) {
            this.urlCheck = false
            this.snackbarText = "网址格式错误 , 提交后将不会被记录"
            this.snackbar = true
            break;
          }
          this.urlCheck = true
          break;
        default:
          break
      }
    },
    commit() {
      if (this.content === "") {
        this.snackbarText = "内容为空 , 请检查"
        this.snackbar = true
        return
      }
      if (this.url.indexOf("https://") === -1 || this.url.indexOf("http://") === -1) {
        this.url = "http://" + this.url
      }
      axios.post(this.$url, {
        type: 11,
        name: this.name,
        email: this.emailCheck ? this.email : "",
        url: this.urlCheck ? this.url : "",
        content: this.content,
      }).then((response) => {
        alert(response.data);
        this.clear()
        this.request()
      })
    },
    init() {
      let arr2 = this.welcomeTextList[0].split(""),
          arr = this.welcomeTextList[1].split(""),
          i = 0, type = 1, wait = 5, waitEnd = 25, arrIndex = 0, ms = 100
      this.time = setInterval(() => {
        if (arrIndex) {
          if (type && wait === 0) {
            ms = 50
            this.lightIndex = false
            this.title = this.title + arr[i]
            i++
            if (i === arr.length) {
              wait = waitEnd
              type = 0
            }
          } else if (!type && wait === 0) {
            i--
            ms = 50
            this.lightIndex = false
            this.title = this.title.substring(0, i)
            if (i < 1) {
              wait = 0
              type = 1
              arrIndex = 0
            }
          } else {
            this.lightIndex = true
            wait--
          }
        } else {
          if (type && wait === 0) {
            ms = 50
            this.lightIndex = false
            this.title = this.title + arr2[i]
            i++
            if (i === arr2.length) {
              wait = waitEnd
              type = 0
            }
          } else if (!type && wait === 0) {
            i--
            ms = 50
            this.lightIndex = false
            this.title = this.title.substring(0, i)
            if (i < 1) {
              wait = 0
              type = 1
              arrIndex = 1
            }
          } else {
            this.lightIndex = true
            wait--
          }
        }
      }, ms)
    },
    request() {
      axios.post(
          this.$url,
          {
            type: 10,
            limit_page: this.page,
          })
          .then((response) => {
            let length = Object.keys(response.data).length
            for (let i = 0; i < length - 1; i++) {
              this.$set(this.list, i, response.data[i + 1])
            }
            // console.log(response.data[length]["count(*)"]);
            this.maxPage = Math.ceil(
                response.data[length]["count(*)"] / 12
            );
          })
    },
    clear() {
      this.name = ""
      this.url = ""
      this.email = ""
      this.content = ""
    }
  }
}
</script>
<style>
.v-text-field.v-text-field--solo .v-input__control input::placeholder {
  color: rgba(0, 0, 0, .6);
}

.v-text-field.v-text-field--solo .v-input__control input {
  caret-color: #009688;
}

.v-text-field.v-text-field--solo .v-input__control textarea::placeholder {
  color: rgba(0, 0, 0, .6);
}

.v-input--is-focused textarea {
  color: white !important;
}

.v-input--is-focused textarea::placeholder, .v-input--is-focused input::placeholder {
  /*color: rgba(255, 255, 255, 0.5) !important;*/
  color: transparent !important;
}
</style>
<style scoped lang="less">
input, textarea {
  caret-color: #009688;
}

#messageList {
  min-height: 800px;
}

.messageItem {
  border-bottom: 1px solid #f1f1f1;
  padding-bottom: 20px;

  a {
    color: #999999;
    font-size: 14px;
  }

  a:hover {
    color: #666666;
  }
}

@keyframes lightIndex {
  0% {
    border-right: 2px solid white;
  }
  50% {
    border-right: 2px solid transparent;
  }
  100% {
    border-right: 2px solid white;
  }
}

.lightIndex {
  animation: steps(1, start) infinite lightIndex 1s backwards;
  transition: unset;
  border-right: 2px solid white;
}

.lightIndex2 {
  line-height: 1;
  padding-right: 2px;
  border-right: 2px solid white;
}
</style>
