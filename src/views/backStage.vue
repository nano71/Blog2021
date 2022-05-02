/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/05/21/20:03
*/
<!--suppress ALL -->
<template>
  <v-app v-if="!MainShow">
    <v-main class="white">
      <v-parallax
          id="v-parallax"
          :style="Key ? 'background: #41B883' : 'background:red'"
      >
        <v-row align="center" justify="center">
          <v-col class="text-center" cols="12">
            <h1 class="display-1 font-weight-thin mb-4">Vue & Vuetify</h1>
            <h4 class="subheading">全局控制台</h4>
          </v-col>
        </v-row>
      </v-parallax>
      <v-row class="justify-center">
        <v-col class="mt-16" cols="10" sm="8" md="6" lg="4" xl="3">
          <v-form
              id="back_stage_from"
              ref="form"
              v-model="valid"
              :lazy-validation="lazy"
          >
            <!--            <v-text-field-->
            <!--              v-model="name"-->
            <!--              :counter="4"-->
            <!--              :rules="nameRules"-->
            <!--              label="离线密钥"-->
            <!--              required-->
            <!--            ></v-text-field>-->

            <v-text-field
                v-model="OnlineKey"
                :rules="OnlineKeyRes"
                label="在线密钥"
                required
                autofocus
                :error="!Key"
            ></v-text-field>

            <v-checkbox
                v-model="checkbox"
                :rules="[(v) => !!v || '你必须同意才能继续!']"
                label="数据无价，谨慎修改"
                required
            ></v-checkbox>

            <v-btn color="info" class="float-right elevation-0" @click="next">
              DEMO
            </v-btn>
            <v-btn
                color="error"
                class="float-right mr-4 elevation-0"
                @click="reset"
            >
              重置
            </v-btn>
            <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 float-right elevation-0"
                @click="validate"
            >
              验证
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
      <div v-html="style"></div>
    </v-main>
  </v-app>
  <blog-back-stage-main v-else></blog-back-stage-main>
</template>
<script>
import BlogBackStageMain from "../components/backStageMain";
import axios from "axios";

export default {
  //comments 和 components 区别很重要！
  components: {
    BlogBackStageMain,
  },
  icons: {
    // 'mdi' || 'mdiSvg' || 'md' || 'fa' || 'fa4' || 'faSvg'
    iconfont: "mdiSvg",
  },
  data() {
    return {
      style: `
<style>.v-messages__message{
margin-top: 2px;
}
::selection {
  background: unset !important;
  color: unset;
}
::-webkit-scrollbar{
width: 0;
}</style>`,
      // name: '',
      // nameRules: [
      //   v => !!v || '离线密钥是必须的',
      //   v => (v && v.length <= 4) || '长度超出',
      // ],
      OnlineKey: "",
      OnlineKeyRes: [
        (v) => {
          if (v) {
            return v.length <= 8 || "格式错误";
          }
          return true;
        },
      ],
      valid: true,
      lazy: false,
      checkbox: false,
      MainShow: false,
      Key: true,
      // email: "",
      // emailRules: [
      //   (v) => !!v || "E-mail is required",
      //   (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      // ],
    };
  },
  mounted() {
    // console.log(window.innerHeight);
  },
  methods: {
    validate() {
      if (
          this.$refs.form.validate()
      ) {
        let key = parseInt(this.OnlineKey)
        axios.post(this.$url, {
          type: 12,
          key
        }).then(response => {
          console.log(response);
          if (response.data === "success") {
            this.MainShow = true;
          }
        }).catch(reason => {
          this.Key = false;
          this.reset();
          setTimeout(() => {
            this.Key = true;
          }, 3000);
        })
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    next() {
      this.$router.push({path: `/bbs/demo`});
    },
  },
};
</script>

<style scoped lang="less">
#v-parallax {
  transition: 0.5s;
}
</style>
