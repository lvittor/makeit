import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import index from "@/store";

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
    meta: { requiresAuth: true },
    component: () => import("../views/FindRoutine.vue"),
  },
  {
    path: "/profile",
    name: "UserProfile",
    meta: { requiresAuth: true },
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/found",
    name: "Found",
    meta: { requiresAuth: true },
    component: () => import("../views/Found.vue"),
  },
  {
    path: "/notfound",
    alias: "*",
    name: "NotFound",
    component: () =>
      import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!index.getters['security/isLoggedIn']) {
      
      next({ path: "/auth/signin", query: { redirect: to.fullPath } });
    } 
    else {
      next();
    }
  } else {
    next();
  }
});


export default router;
