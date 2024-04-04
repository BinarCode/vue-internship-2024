import {
  CommentsResponseModel,
  PostCommentsModel,
  PostModel,
  PostResponseModel,
} from "@/modules/common/utils/models";
import router from "@/router/router";
import axios from "axios";
import { defineStore } from "pinia";

export const usePostStore = defineStore("post", {
  state: () => {
    return {
      posts: [] as Array<PostModel>,
      comments: {} as PostCommentsModel,
      totalComments: 0 as Number,
      limitPosts: 0 as Number,
      totalPosts: 0 as Number,
    };
  },
  actions: {
    async deletePost(post: PostModel): Promise<PostModel> {
      try {
        if (post.isCreated) {
          const index = this.posts.findIndex((p) => p.id === post.id);
          this.posts[index].isDeleted = true;
          router.push("/posts");

          return;
        }
        const response = await axios.delete(`/posts/${post.id}`);

        const index = this.posts.findIndex((post) => post.id === response.id);
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
        if (post.isCreated) {
          const index = this.posts.findIndex((p) => p.id === post.id);
          post.editedKey = post.editedKey ? post.editedKey + 1 : 1
          this.posts[index] = post;
          return;
        }
        const response = await axios.put(`/posts/${post.id}`, post);
        const index = this.posts.findIndex((p) => p.id === response.id);
        if (index === -1) {
          return;
        }

        post.editedKey = post.editedKey ? post.editedKey + 1 : 1
        this.posts[index] = post;
        
        return response;
      } catch (error) {
        console.error("Error updating post", error);
        throw error;
      }
    },
    async getComments(post: PostModel): Promise<CommentsResponseModel> {
      if (post.isCreated) {
        this.comments.data = [];
        this.totalComments = 0;
        return;
      }
      try {
        if (post.id === this.comments.postId) {
          return;
        }
        this.comments.data = [];
        this.totalComments = 0;
        const response = await axios.get(`/posts/${post.id}/comments`);
        this.comments.data = response.comments;
        this.totalComments = response.total;

        return response;
      } catch (error) {
        console.error("Error fetching comments", error);
        throw error;
      }
    },
    async addPost(userId: number, post: PostModel): Promise<PostModel> {
      try {
        const response = await axios.post("/posts/add", { ...post, userId });
        response.isCreated = true;
        this.posts.unshift(response);
        return response;
      } catch (error) {
        console.error("Error adding post", error);
        throw error;
      }
    },
    async addReaction(post: PostModel): Promise<void> {
      try {
        if (post.isCreated) {
          const reactions = post.reactions + 1;
          const index = this.posts.findIndex((p) => p.id === post.id);
          this.posts[index].reactions = reactions;
          this.posts[index].reactedByMe = true;
          return;
        }

        const reactions = post.reactions + 1;
        await this.editPost({
          ...post,
          reactions,
        });
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts[index].reactedByMe = true;
      } catch (error) {
        console.error("Error adding reaction", error);
        throw error;
      }
    },
    async removeReaction(post: PostModel): Promise<void> {
      try {
        if (post.isCreated) {
          const reactions = post.reactions - 1;
          const index = this.posts.findIndex((p) => p.id === post.id);
          this.posts[index].reactions = reactions;
          this.posts[index].reactedByMe = false;
          return;
        }

        const reactions = post.reactions - 1;
        await this.editPost({
          ...post,
          reactions,
        });
        const index = this.posts.findIndex((p) => p.id === post.id);
        this.posts[index].reactedByMe = false;
      } catch (error) {
        console.error("Error removing reaction", error);
        throw error;
      }
    },
    async handleReactions(post: PostModel): Promise<void> {
      if (!post.reactedByMe) {
        await this.addReaction(post);
        return;
      }
      await this.removeReaction(post);
    },
    async getPostsByPagination(
      page: number,
      limit: number
    ): Promise<PostResponseModel> {
      const skip = limit * (page - 1);
      const response = await axios.get(`/posts`, {
        params: {
          skip,
        },
      });
      this.posts = response.posts;
      this.limitPosts = response.limit;
      this.totalPosts = response.total;

      return response;
    },
  },
  getters: {
    visiblePosts: (state) => {
      return state.posts.filter((post) => !post.isDeleted);
    },
  },
});
