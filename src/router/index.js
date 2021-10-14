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
    meta: { requiresAuth: true }
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: () => import("../views/Welcome.vue"),
    meta: { requiresAuth: false },
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
    path: "/all-your-routines-and-exercises",
    name: "AllYourR&E",
    meta: { requiresAuth: true },
    component: () => import("../views/AllYourR&E.vue"),
  },
  {
    path: "/all-favourite-routines",
    name: "FindAllFavourites",
    meta: { requiresAuth: true },
    component: () => import("../views/FindAllFavourites.vue"),
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
  {
    path: "/create-routine",
    name: "CreateRoutine",
    meta: { requiresAuth: true },
    component: () => import("../views/CreateRoutine.vue"),
  },
  {
    path: "/find-all-routines",
    name: "FindAllRoutines",
    meta: { requiresAuth: true },
    component: () => import("../views/FindAllRoutines.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (!index.getters['security/isLoggedIn'] ) {
      next({ path: "/welcome"});
    } 
    else {
      next();
    }
  } else {
    next();
  }
});


export default router;
