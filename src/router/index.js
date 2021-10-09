import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/auth",
    component: () => import("@/views/Auth/Auth"),
    children: [
      {
        path: "signin",
        component: () => import("@/views/Auth/Signin"),
        name: "signin",
      },
      {
        path: "signup",
        component: () => import("@/views/Auth/Signup"),
        name: "signup",
      },
    ],
  },
  {
    path: "/find-routine",
    name: "FindRoutine",
    component: () => import("../views/FindRoutine.vue"),
  },
  {
    path: "*",
    redirect: { name: "signin" },
  },
  {
    path: "/find-all-routines",
    name: "FindAllRoutines",
    component: () => import("../views/FindAllRoutines.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
