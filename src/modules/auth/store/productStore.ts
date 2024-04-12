import {
 ProductModel, ProductResponseModel,
} from "@/modules/common/utils/models";
import axios from "axios";
import { defineStore } from "pinia";

export const useProductStore = defineStore("product", {
  state: () => {
    return {
      products: [] as Array<ProductModel>,
    };
  },
  actions: {
    async getProducts(): Promise<ProductResponseModel> {
        const response = await axios.get('/products');
        this.products = response.products;
        console.log(this.products);
        return response;
    },
  },
});
