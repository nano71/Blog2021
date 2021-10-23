<template>
  <v-app>
    <v-main>
      <v-row class="text-center" style="margin-top: 10vh">
        <v-col>
          <h1 class="font-weight-light primary--text">
            <span>你好，陌生人</span>
          </h1>
          <p>Thank you for your visit my website</p>

          <!--          <a href="/" class="v-btn v-btn--outlined v-btn--router theme--light v-size--default primary--text">-->
          <!--            <span class="v-btn__content"> Get me out of here! </span></a>-->
        </v-col>
      </v-row>
      <v-row>
        <v-card class="mx-auto mb-16" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">线性名片</div>
              <v-list-item-title class="headline mb-1">梁 皓</v-list-item-title>
              <v-list-item-subtitle>计算机行业-前端</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80" color="grey">
              <img src="https://personal-station.cn/ftp/touxiang.jpg" alt="" />
            </v-list-item-avatar>
          </v-list-item>
          <v-divider></v-divider>
          <div id="_content" class="ml-4 mt-4">
            <h4 class="my-4">教育经历</h4>
            <p class="ml-4 font-weight-medium text-subtitle-2">
              桂林理工大学 专科 大三
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    ref="#/"
                    v-bind="attrs"
                    class="text-decoration-underline soon"
                    v-on="on"
                  >
                    正实习
                  </span>
                </template>
                <span>联系信息在下方 &bigtriangledown;</span>
              </v-tooltip>
              <span class="float-right mr-4">2019.09~2022.06</span>
              <br />
              <!--              成绩排名：-->
              <!--              <v-tooltip top>-->
              <!--                <template v-slot:activator="{ on, attrs }">-->
              <!--                  <span-->
              <!--                    v-bind="attrs"-->
              <!--                    v-on="on"-->
              <!--                    class="text-decoration-underline soon"-->
              <!--                    ref="#/"-->
              <!--                  >-->
              <!--                    没某些人厉害-->
              <!--                  </span>-->
              <!--                </template>-->
              <!--                <span>"绩"不如人；班上一堆都啥也不会，作业都是买的 <br>考试作弊有一套，这些人成绩都能排前10，可笑！</span>-->
              <!--              </v-tooltip>-->
            </p>
            <h4 class="my-4">专业技能</h4>
            <p
              class="
                ml-4
                font-weight-medium
                text-subtitle-2 text-capitalize text-wrap
              "
            >
              编程语言: JavaScript, HTML+CSS, PHP
              <br />
              框架和库: Vue.js, Bootstrap, JQuery
              <br />
              辅助技能: Photoshop, UI界面原型图绘制
            </p>

            <h4 class="my-4">社交关注</h4>
            <p class="ml-4 font-weight-medium text-subtitle-2 text-wrap">
              腾讯QQ：
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    ref="#/"
                    v-bind="attrs"
                    class="text-decoration-underline soon"
                    v-on="on"
                  >
                    1742968988
                  </span>
                </template>
                <span><img src="" alt="" /></span>
              </v-tooltip>
              <br />
              腾讯VX：
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <span
                    ref="#/"
                    v-bind="attrs"
                    class="text-decoration-underline soon"
                    v-on="on"
                  >
                    qq1742968988
                  </span>
                </template>
                <span><img src="" alt="" /></span>
              </v-tooltip>
              <br />
              百度贴吧：<a
                href="https://tieba.baidu.com/home/main?un=%E7%84%A1%E6%89%80%E8%AC%82%E7%9A%84%E6%AD%BB&id=tb.1.5bfaf0b5.DqMxFPwF1hSOPSk7hZeBGg?t=1618145565&fr=index"
                >点击访问</a
              ><br />
              联系电话：+86 1352094472 <br />
              电子邮箱：1742968988@qq.com \ qq1742968988@outlook.com
            </p>
          </div>

          <div class="text-center my-6">
            <a
              href="#/"
              class="
                v-btn v-btn--outlined v-btn--router
                theme--light
                v-size--default
                primary--text
              "
            >
              <span class="v-btn__content"> 返回BLOG </span></a
            >
          </div>
        </v-card>
      </v-row>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "About",
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
