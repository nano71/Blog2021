/** * Created with IntelliJ IDEA. * @Author: Liang-Hao * @Date: 2021/5/20 12:25
* @Description: unset */
<template>
  <div>
    <span v-html="$store.state.first <= 1 ? startStyle : ''"></span>
    <span v-html="$store.state.first > 0 ? startStyle2 : ''"></span>
    <div
      v-if="$store.state.first > 0"
      :class="$store.state.first === 1 ? 'end' : ''"
      style="
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        z-index: 999999;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        animation-fill-mode: both;
      "
    >
      <div
        v-if="$store.state.first > 1"
        style="
          display: none;
          transform: scale(1.5);
          box-shadow: 0 0 1px black;
          margin-bottom: 2rem;
          position: relative;
        "
      >
        <div
          style="
            background-color: #00bfa5;
            padding: 1rem 1rem 0;
            color: #00bfa5;
            font-size: 2rem;
          "
        >
          NANO71
        </div>
        <div
          style="
            background-color: #fff;
            padding: 0 1rem 1rem;
            color: #fff;
            font-size: 2rem;
          "
        >
          NANO71
        </div>
        <div
          style="
            color: #fff;
            position: absolute;
            line-height: 0.75;
            top: calc(50% - 31px);
            font-size: 2.5rem;
            z-index: 99;
            text-align: center;
            width: 100%;
            letter-spacing: 10px;
            text-indent: 10px;
          "
        >
          BLOG<br />
          <span style="color: #00bfa5; letter-spacing: -6px">NANO71</span>
        </div>
      </div>
      <div
        v-else
        :style="`
        ${$store.state.windowWidth > 450 && 'font-size: 2rem;'}
          max-width: 90vw;
          text-align: center;
          font-weight: lighter;
        `"
      >
        {{ txt[Math.floor(Math.random() * txt.length)] }}
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      first: 2,
      txt: [
        "世间所有的相遇 , 都是久别重逢",
        "人生的每一次相遇 , 都是一份来之不易的缘分",
        "竹破四方遥来客 , 举杯不败古来人",
        "有朋自远方来 , 不亦乐乎",
        "相遇 , 幸之",
        "你好!",
        "别来无恙啊",
      ],
      startStyle: `
<style>#app{
transition: 3s ease-in-out;
background-color: #eeeeee;
}</style>`,
      startStyle2: `
<style>::selection {
background: unset !important;
color: unset;
}
::-webkit-scrollbar{
width: 0;
}</style>`,
    };
  },
  computed: {},
  watch: {},
  beforeCreate() {
    console.log("beforeCreated");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    this.$store.state.blogListIndex = this.$route.params.class || null;
    if (sessionStorage.getItem("$store.state.first")) {
      this.$store.state.first = 1;
      this.txt = [""];
      setTimeout(() => {
        this.$store.state.first = 0;
      }, 2000);
    } else {
      sessionStorage.setItem("$store.state.first", "1");
    }
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  beforeUpdate() {
    console.log("beforeUpdated");
  },
  updated() {
    console.log("updated");
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  destroyed() {
    console.log("destroyed");
  },
  methods: {},
};
</script>
