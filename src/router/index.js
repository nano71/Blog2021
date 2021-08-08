import Vue from "vue";
import VueRouter from "vue-router";
import BlogBodyContent from "../components/blog-body-content";
import BlogBody from "../components/blog-body.vue";
import NotFound from "../components/notfound";
import BlogIndex from "../components/blog-index";
import BlogBackStage from "../components/blog-back-stage";
import About from "../components/about";
import CopyRight from "../components/copyright";

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
      window.location = "https://personal-station.cn/blog/";
    },
  },
  {
    path: "/about",
    component: About,
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
