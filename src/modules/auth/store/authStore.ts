import { LoginModel, LoginResponse } from "@/modules/common/utils/models";
import axios from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      isLoggedIn: false as boolean,
    };
  },
  actions: {
    setLoggedIn(isLoggedIn: boolean): void {
      this.isLoggedIn = isLoggedIn;
    },
    setToken(token: string): void {
      localStorage.setItem("token", JSON.stringify(token));
    },
    getToken(): string | null {
      return localStorage.getItem("token");
    },
    async login(data: LoginModel): Promise<LoginResponse> {
      const response = await axios.post("/auth/login", data);
      return response;
    },
    logout(): void {
      localStorage.removeItem("token");
      localStorage.removeItem("image");
    },
  },
});
