import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        //要请求的后端地址
        url: "https://nano71.com/php/blog-bk.php",
        //后台密钥
        key: "1742",
        QR: false,
        links: ["本站简介", "版权声明", "关于我", "控制台"],
        linkHrefs: ["/document", "/copyright", "/about", "/admin"],
        options: ["本站简介", "版权声明", "关于我", "控制台"],
        TagClass: ["Promise", "PHP", "Vue", "日志"],
        welcomeText: [
            "世间所有的相遇 , 都是久别重逢",
            "人生的每一次相遇 , 都是一份来之不易的缘分",
            "竹破四方遥来客 , 举杯不败古来人",
            "有朋自远方来 , 不亦乐乎",
            "相遇 , 幸之",
            "你好!",
            "别来无恙啊",
        ],
        first: 2,
        isMobile: false,
        windowWidth: window.innerWidth,
        blogListIndex: null,
    },
    mutations: {}

});
