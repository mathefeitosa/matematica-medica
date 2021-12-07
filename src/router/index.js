import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/drogas",
    name: "Drogas",
    component: () => import("../views/Drogas.vue"),
  },
  {
    path: "/about",
    name: "Sobre",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/pediatria",
    name: "Pediatria",
    component: () => import("../views/Pediatria.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
