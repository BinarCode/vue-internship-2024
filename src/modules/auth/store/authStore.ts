import { LoginModel, LoginResponse } from "@/modules/common/utils/models";
import axios, { HeadersDefaults } from "axios";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      profile: {} as LoginResponse,
    };
  },
  actions: {
    setToken(token: string): void {
      localStorage.setItem("token", token);
    },
    getToken(): string | null {
      return localStorage.getItem("token");
    },
    async login(data: LoginModel): Promise<LoginResponse> {
      this.profile = await axios.post("/auth/login", data);
      this.setToken(this.profile.token);

      return this.profile;
    },
    logout(): void {
      localStorage.clear();
    },
    async getUser(): Promise<LoginResponse> {
      this.profile = await axios.get("/auth/me", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      return this.profile;
    },
  },
});
