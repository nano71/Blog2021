<template>
  <v-row class="white ma-4 pa-4 rounded">

    <v-btn
      elevation="0"
      dark
      color="teal">
      <v-icon small>mdi-text-box-plus</v-icon>
      &nbsp;添加
    </v-btn>
    <v-btn
      elevation="0"
      dark
      color="teal"
      class="ml-4">
      <v-icon small>mdi-pencil</v-icon>
      &nbsp;编辑
    </v-btn>
    <v-btn
      elevation="0"
      dark
      color="teal"
      class="ml-4"
      @click="del">
      <v-icon small>mdi-delete</v-icon>
      &nbsp;删除
    </v-btn>

    <!--      <v-btn dark color="teal" class="ml-4">-->
    <!--        <v-icon small>mdi-file-export</v-icon>-->
    <!--        &nbsp;导出-->
    <!--      </v-btn>-->
    <!--      <v-btn dark color="teal" class="ml-4">-->
    <!--        <v-icon small>mdi-file-import</v-icon>-->
    <!--        &nbsp;导入-->
    <!--      </v-btn>-->
    <v-spacer></v-spacer>
    <h4 class="pt-1">标题：</h4>
    <input type="text" v-model="search" class="pl-2" style="border: .5px solid">
    <h4 class="pt-1 ml-4">标签：</h4>
    <input type="text" class="pl-2" style="border: .5px solid">
    <!--    <v-btn-->
    <!--      elevation="0"-->
    <!--      dark-->
    <!--      color="teal"-->
    <!--      class="ml-4 float-right">-->
    <!--      <v-icon small>mdi-file-search</v-icon>-->
    <!--      &nbsp;查询-->
    <!--    </v-btn>-->
    <v-col cols="12">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="blog_list"
        item-key="title"
        show-select
        class="elevation-0"
        :items-per-page="15"
        :footer-props="{
          itemsPerPageOptions:[15,15],
        }"
        :search="search"
      ></v-data-table>
    </v-col>
    <div v-html="style"></div>
  </v-row>

</template>

<script>
import axios from "axios";
import Vue from "vue";

export default {
  name: "blog-back-stage-list",
  data() {
    return {
      style: `<style>
  table {
    table-layout: fixed;
  }
  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  tr>td:first-child{
  overflow: unset;
  }
  tr>th:nth-child(3){
  width: 70px;
  }
  </style>`,
      blog_length: [],
      blog_list: [],
      search: '',
      selected: [],
      selected_bid: [],
      headers: [
        {
          text: '标题',
          align: 'start',
          sortable: false,
          value: 'title',
        },
        {text: 'Bid', value: 'Bid'},
        {text: '标签', value: 'tags'},
        {text: '内容', value: 'content'},
        {text: '博客发布时间', value: 'LastTime'},
        {text: '最后一次编辑', value: 'LastTime'},

      ],
      desserts: [
        {
          title: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },],
      url: ''
    }
  },
  mounted() {
    axios.post (this.url, {
      type: 4,
      limit_page: 1
    }).then((response) => {
      // console.log(response);
      this.blog_length = Object.keys(response.data).length
      for (let i = 0; i < this.blog_length - 1; i++) {
        // this.blog_list[i] = response.data[i + 1]
        // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
        Vue.set(this.blog_list, i, response.data[i + 1])
        if (this.blog_list[i].tag != '') {
          this.blog_list[i].tags = '#' + this.blog_list[i].tag
        }
        if (this.blog_list[i].tag2 != '') {
          this.blog_list[i].tags = this.blog_list[i].tags + ' #' + this.blog_list[i].tag2
        }
        if (this.blog_list[i].tag3 != '') {
          this.blog_list[i].tags = this.blog_list[i].tags + ' #' + this.blog_list[i].tag3
        }
        // this.blog_list[i].tags = '#' + this.blog_list[i].tag + ' #' + this.blog_list[i].tag2 + ' #' + this.blog_list[i].tag3

      }
      this.max_page = Math.ceil (response.data[this.blog_length]["count(*)"] / 15)
      // console.log ('最大页数：' + this.max_page);
      // console.log ('处理后的列表:');
      // console.log (this.blog_list);
    }).catch ((error) => {
      // console.log (error)
    })
    this.tags = [this.blog_list[i].tag, this.blog_list[i].tag2, this.blog_list[i].tag3]
  },
  methods: {
    del () {
      if (this.selected) {
        axios.post (this.url, {
          type: 6,
        })
      }
    }
  },
  watch: {
    selected: function (n, o) {
      this.selected_bid = []
      n.forEach ((e) => {
        this.selected_bid.push (e.Bid)
        // console.log (this.selected_bid);
      })
    }
  }

}
</script>

<style scoped lang="less">
table {
  table-layout: fixed;

  td {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
