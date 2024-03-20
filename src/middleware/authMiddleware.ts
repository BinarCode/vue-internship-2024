import { useAuthStore } from "@/modules/auth/store/authStore";
import { Router } from "vue-router";

export function authMiddleware(router: Router) {
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
}
