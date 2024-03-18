import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import { useAuthStore } from "@/modules/auth/store/authStore";

const routes = setupLayouts(generatedRoutes);

// const routes = [
//   {
//     path: "/",
//     name: "Home",
//     meta: { requiresAuth: true },
//     component: Home,
//   },
//   {
//     path: "/products",
//     name: "Products",
//     meta: { requiresAuth: true },
//     component: Products,
//   },
//   {
//     path: "/posts",
//     name: "Posts",
//     meta: { requiresAuth: true },
//     component: Posts,
//   },
//   {
//     path: "/login",
//     name: "Login",
//     component: login,
//     meta: { hideNavbar: true },
//   },
//   { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
// ];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to) => {
    if (to) {
      return { selector: to.hash };
    }

    return { left: 0, top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const hasRoute = router.hasRoute(to.name as string);

  if (!hasRoute) {
    return next({
      name: "NotFound",
    });
  }

  const toAuthLayout = to.meta.layout === "authLayout";
  const requiresAuth = Object.hasOwn(to.meta, "requiresAuth")
    ? to.meta.requiresAuth
    : !toAuthLayout;
  const hasToken = authStore.getToken();

  if (requiresAuth && !hasToken) {
    return next({ name: "Login" });
  }

  next();
});

export default router;
