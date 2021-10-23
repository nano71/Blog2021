import Vue from "vue";
import VueRouter from "vue-router";
import BlogBodyContent from "../components/article";
import BlogBody from "../components/blogList.vue";
import NotFound from "../views/notfound";
import BlogIndex from "../views";
import BlogBackStage from "../views/backStage";
import About from "../views/about";
import CopyRight from "../views/copyright";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/page/1",
  },
  {
    path: "/index",
    component: () => {
      window.location = "https://personal-station.cn";
      // window.scrollTo(0,0);
    },
  },
  {
    path: "/resume",
    name: "resume",
    component: () => {
      window.location = "https://personal-station.cn/resume";
    },
  },
  {
    path: "/document",
    component: () => {
      alert("404 NOT FOUND");
    },
  },
  {
    path: "/about",
    component: () => {
      window.location = "https://personal-station.cn/resume_doc";
    },
    // component: About,
  },
  {
    path: "/copyright",
    component: CopyRight,
  },
  {
    path: "/content",
    component: BlogIndex,
    children: [
      {
        path: ":bid",
        component: BlogBodyContent,
      },
    ],
  },
  {
    path: "/page/:page",
    component: BlogIndex,
    children: [
      {
        path: "/",
        component: BlogBody,
      },
    ],
  },
  {
    path: "/class/:class/:page",
    component: BlogIndex,
    children: [
      {
        path: "/",
        component: BlogBody,
      },
    ],
  },
  {
    path: "/class/:class",
    component: BlogIndex,
    children: [
      {
        path: "/",
        component: BlogBody,
      },
    ],
  },
  {
    path: "/bbs",
    component: BlogBackStage,
  },
  {
    path: "/404",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
