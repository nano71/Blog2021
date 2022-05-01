import Vue from "vue";
import VueRouter from "vue-router";
import article from "../components/article";
import blogList from "../components/blogList.vue";
import notFound from "../views/notfound";
import index from "../views";
import backStage from "../views/backStage";
// import About from "../views/about";
import copyRight from "../views/copyright";
import messageBoard from "@/views/messageBoard";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/1",
    },
    {
        path: "/index",
        component: () => {
            window.location = "https://personal-station.cn";
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
            alert("暂时隐藏");
        },
    },
    {
        path: "/messageBoard",
        component: index,
        children: [{
            path: "/",
            component: messageBoard
        }]
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
        component: copyRight,
    },
    {
        path: "/article",
        component: index,
        children: [
            {
                path: ":bid",
                component: article,
            },
        ],
    },
    {
        path: "/admin",
        name: "backStage",
        component: backStage,
    },
    {
        path: "/404",
        name: "notFound",
        component: notFound,
    },
    {
        path: "/:page",
        component: index,
        children: [
            {
                path: "/",
                component: blogList,
            },
        ],
    },
    {
        path: "/class/:class/:page",
        component: index,
        children: [
            {
                path: "/",
                component: blogList,
            },
        ],
    },
    {
        path: "/class/:class",
        component: index,
        children: [
            {
                path: "/",
                component: blogList,
            },
        ],
    },
    {
        path: "*", // 此处需特别注意置于最底部
        redirect: "/404",
    },
];

const router = new VueRouter({
    mode: "hash",
    // mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
