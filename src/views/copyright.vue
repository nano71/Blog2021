<template>
  <v-app>
    <v-main class="white">
      <v-row class="text-center" style="margin-top: 10vh">
        <v-col>
          <h1 class="font-weight-light primary--text">
            <span>版权声明</span>
          </h1>
          <p>Thank you for your careful reading</p>

          <!--          <a href="/" class="v-btn v-btn&#45;&#45;outlined v-btn&#45;&#45;router theme&#45;&#45;light v-size&#45;&#45;default primary&#45;&#45;text">-->
          <!--            <span class="v-btn__content"> Get me out of here! </span></a>-->
        </v-col>
      </v-row>
      <v-row>
        <v-card
          class="mx-auto mb-16"
          max-width="575"
          elevation="0"
          style="background: unset"
        >
          <div class="body-1 text-wrap font-weight-light">
            <p>
              本版权与免责声明系保证本网站的正常发展、规避意外风险而设，其初衷是为了向用户提供不间断的优质服务。本站一向尊重他人的知识产权，同时也注意保护自己的知识产权。因此，建议您在接受本站服务之前，请务必仔细阅读本声明。
            </p>
            <p>
              本站部分内容来自网络，如有侵权或内容不当之处<br />请发Email至
              1742968988&commat;qq.com，我会尽快处理。
            </p>
            <p>
              本站遵守互联网的共享精神也注意保护自己的知识产权，欢迎各大媒体、博客转载本站的文章，<span
                class="font-weight-medium"
                >凡著名有【原创】字样的所有文章、文字、图片和音频、视频稿件，转载请著名出处并附带原文链接，违者本网站将追究其法律责任。</span
              >
            </p>
            <!--            <p>-->
            <!--              凡在本站发表的文章和评论，仅代表作者个人的观点和立场，其侵权或违法行为的责任由作者本人承担，本网站不承担任何法律责任。-->
            <!--            </p>-->
            <p>
              本站所刊载的文章资料、图片、图表、数据仅供参考使用，如有所刊登的广告，均为广告商的个人意见及表达方式，和本网站无任何关系，如有侵权或违法行为应由其相关广告商承担责任。
            </p>
            <p>
              凡在本站发布的所有评论，都视为发布者同意本网站免费予以使用；同时本网站认为其发布的评论有侵权、违法等行为的，有权予以修改、删除的权利，发布者不得阻止或拒绝。
            </p>
            <p>
              凡以任何方式访问本网站或直接、间接使用本网站资料者，视为自愿接受本站本项声明的约束。
            </p>
          </div>

          <div class="text-center">
            <v-btn elevation="0" outlined class="primary--text" @click="back">
              返回BLOG
            </v-btn>
          </div>
        </v-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "Copyright",
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="less">
#_content {
  p {
    color: rgba(0, 0, 0, 0.6);
  }

  .soon:hover {
    color: #00bfa5;
    cursor: pointer;
  }
}
</style>
