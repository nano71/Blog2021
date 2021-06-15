<template>


  <v-row class="white ma-4 pa-4 rounded">
    <v-col cols1="6">
      <v-col cols="12">
        <v-text-field
          label="博客标题"
          autofocus
          value="Test"
          v-model="title"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-combobox
          v-model="select"
          :items="items"
          label="博客标签"
          multiple
          chips
        ></v-combobox>
      </v-col>
    </v-col>
    <v-col cols="6">
      <v-col cols="6">
        <v-text-field
          label="博客URL"
          autofocus
          value="Test"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <div class="black06 scale-075">若不编辑，则默认当前时间</div>
        <v-btn
          color="primary"
          dark
          @click.stop="date_dialog = true"
        >
          自定义发表日期
        </v-btn>
      </v-col>

      <v-dialog
        v-model="date_dialog"
        max-width="600"
      >
        <v-card class="pa-4">
          <v-date-picker
            full-width
            v-model="picker"
            landscape
            color="teal"
          ></v-date-picker>
          <v-card-actions class="mt-4">
            <v-btn
              text
              color="blue accent-4"
              @click="date_dialog = false"
            >
              取消
            </v-btn>
            <v-btn
              text
              color="blue accent-4"
              @click="date_dialog = false;time_dialog=true"
            >
              继续
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog
        v-model="time_dialog"
        max-width="600"
      >
        <v-card class="pa-4">
          <v-time-picker
            full-width
            v-model="time_picker"
            color="teal"
            use-seconds
            scrollable
            format="24hr"
          >

          </v-time-picker>
          <v-card-actions class="mt-4">
            <v-btn
              text
              color="blue accent-4"
              @click="time_dialog = false"
            >
              返回日期选择
            </v-btn>
            <v-btn
              text
              color="blue accent-4"
              @click="time_dialog = false"
            >
              确定
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-col>

    <v-col cols="12" class="h-75">
      <div class="black06 scale-075">仅支持Markdown格式</div>
      <mavon-editor v-model="context" :toolbars="toolbars" @keydown="" class="elevation-0 fill-height border"/>
    </v-col>

  </v-row>

</template>

<script>

import axios from "axios";

export default {
  name: "blog-back-stage-blog",
  methods: {
    a: function (r) {
      console.log(r);
    },
    input_blog: function () {
      axios.post('https://personal-station.cn/php/BLOG.php', {
          type: 3,
          title:this.title,
          time: this.picker + ' ' + this.time_picker,
          content: this.context,
          url: 'test',
          tag1: this.select[0],
          tag2: this.select[1],
          tag3: this.select[2],
          last_time:this.picker + ' ' + this.time_picker
        },
        {
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        })
    }
  },
  mounted() {
    var date = new Date()
    var hour = date.getHours() // 获取小时
    var minute = date.getMinutes() // 获取分钟
    var second = date.getSeconds() // 获取秒
    if (second < 10) {
      second = '0' + second
    }
    this.time_picker = hour + ':' + minute + ':' + second
    // console.log(this.picker+' '+ this.time_picker)
  },
  data() {
    {
      return {
        title:'test',
        date_dialog: false,
        time_dialog: false,
        //日期选择器
        picker: new Date().toISOString().substr(0, 10),
        time_picker: '',
        context: ' ',//输入的数据
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          strikethrough: true, // 中划线
          mark: true, // 标记
          superscript: true, // 上角标
          subscript: true, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: true, // 左对齐
          aligncenter: true, // 居中
          alignright: true, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        select: ['Test'],
        items: [
          'Javascript',
          'Ajax',
          'js',
          'Vue',
          'Vuetify',
          'Element',
          '歪门邪道',
          'Test'
        ],
      }
    }
  }
}
</script>

<style scoped>
.border {
  border: 1px solid rgba(176, 176, 176, 0.08) !important;
}

.h-75 {
  height: 75vh;
}

.black06 {
  color: #00000099;
}

.scale-075 {
  font-size: .75rem !important;
}


</style>
