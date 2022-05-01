<template>
  <v-row class="white ma-4 pa-4 rounded">
    <v-btn elevation="0" dark color="teal" class="ml-4" @click="del">
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
    <h4 class="pt-1">Blog-Id：</h4>
    <input
        v-model="search"
        type="text"
        class="pl-2"
        style="border: .5px solid"
    />
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
          :items="commentList"
          item-key="id"
          show-select
          class="elevation-0"
          :items-per-page="15"
          :footer-props="{
          itemsPerPageOptions: [15, 20, 25, 100],
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
  name: "backStageCommentList",
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
  tr>th:nth-child(2){
  width: 100px;
  }  tr>th:nth-child(3){
  width: 100px;
  }tr>th:nth-child(4){
  width: 200px;
  }
  </style>`,
      commentLength: [],
      commentList: [],
      search: "",
      selected: [],
      selectedId: [],
      headers: [
        {text: "id", value: "id"},
        {text: "Bid", value: "Bid"},
        {text: "用户", value: "Email"},
        {text: "内容", value: "comment"},
        {text: "评论发布时间", value: "CreateTime"},
      ],
      desserts: [
        {
          title: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1%",
        },
      ],
    };
  },
  watch: {
    selected(n) {
      this.selectedId = [];
      n.forEach((e) => {
        this.selectedId.push(e["id"]);
        // console.log (this.selected_bid);
      });
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    del() {
      if (this.selected) {
      //  console.log(this.selected[0]["Bid"])
        axios.post(this.$store.state.url, {
          type: 9,
          bid: this.selected[0]["Bid"]
        }).then((res) => {
          alert(res.data);
          this.init()
        })
      }
    },
    init() {
      axios
          .post(this.$store.state.url, {
            type: 7,
            limit_page: 1,
          })
          .then((response) => {
            // console.log(response);
            this.commentLength = Object.keys(response.data).length;
            for (let i = 0; i < this.commentLength - 1; i++) {
              // this.blog_list[i] = response.data[i + 1]
              // Vue 不能检测以下数组的变动，也就是说改变数组不会触发重新渲染
              Vue.set(this.commentList, i, response.data[i + 1]);
            }
            this.max_page = Math.ceil(
                response.data[this.commentLength]["count(*)"] / 15
            );
            // console.log(response.data[this.blog_length]["count(*)"]);
            // console.log ('最大页数：' + this.max_page);
            // console.log ('处理后的列表:');
            // console.log (this.blog_list);
          });
      // .catch((error) => {
      //   // console.log (error)
      // });
    }
  },
};
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
