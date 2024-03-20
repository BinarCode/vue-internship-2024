import router from "@/router/router";

export function logout(): void {
  localStorage.clear();
  router.push("/login");
}
