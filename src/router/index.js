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
    path: "/profile",
    name: "UserProfile",
    component: () => import("../views/UserProfile.vue"),
  },
  {
    path: "/profile-edit",
    name: "UserProfileEdit",
    component: () => import("../views/UserProfileEdit.vue"),
  },
  {
    path: "*",
    redirect: { name: "signin" },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
