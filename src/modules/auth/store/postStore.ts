import { PostModel, PostResponseModel } from "@/modules/common/utils/models";
import router from "@/router/router";
import axios from "axios";
import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => {
    return {
      posts: [] as Array<PostModel>,
    };
  },
  actions: {
    async getAllPosts(): Promise<PostResponseModel> {
      if (this.posts.length) {
        return;
      }
      const response = await axios.get("/posts");
      this.posts = response.posts;

      return response;
    },

    async deletePost(id: number): Promise<PostModel> {
      try {
        const response = await axios.delete(`/posts/${id}`);

        const deletedPost = response;
        const index = this.posts.findIndex(
          (post) => post.id === deletedPost.id
        );
        if (index === -1) {
          return;
        }

        this.posts[index] = response;

        router.push("/posts");

        return response;
      } catch (error) {
        console.error("Error deleting post", error);
        throw error;
      }
    },
    async editPost(post: PostModel): Promise<PostModel> {
      try {
        const response = await axios.put(`/posts/${post.id}`, post, {
          headers: { "Content-Type": "application/json" },
        });
        const index = this.posts.findIndex((p) => p.id === response.id);
        if (index === -1) {
          return;
        }

        this.posts[index] = post;

        return response;
      } catch (error) {
        console.error("Error updating post", error);
        throw error;
      }
    },
  },
  getters: {
    visiblePosts: (state) => {
      return state.posts.filter((post) => !post.isDeleted);
    },
  },
});
