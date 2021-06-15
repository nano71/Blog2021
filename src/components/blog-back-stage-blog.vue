<template>


  <v-row class="white ma-4 pa-4 rounded">
    <v-col cols="6">
      <v-text-field
        label="博客标题"
        autofocus
        value="Test"
      ></v-text-field>
    </v-col>
    <v-col offset="1"></v-col>
    <v-col cols="6">
      <v-combobox
        v-model="select"
        :items="items"
        label="博客标签"
        multiple
        chips
      ></v-combobox>
    </v-col>
    <v-col cols="12" class="h-75">
      <div class="black06 scale-075">仅支持Markdown格式</div>
      <mavon-editor v-model="context" :toolbars="toolbars" @keydown="" class="elevation-0 fill-height border"/>
    </v-col>

  </v-row>
</template>

<script>

export default {
  name: "blog-back-stage-blog",
  data() {
    {
      return {
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
