import { createApp } from "vue";
import { createPinia } from "pinia";
import { defaultConfig, plugin as formKitPlugin } from "@formkit/vue";
import App from "./App.vue";
import router from "./router/router";
import i18n from "@/i18n";
import globalPlugins from "@/plugins/globalPlugins";
import ClickOutside from "@/directives/ClickOutsideDirective.js"

import "@formkit/themes/genesis";
import "@/assets/css/index.scss";

import "./modules/common/apiConfig";
createApp(App)
  .use(createPinia())
  .use(i18n)
  .use(router)
  .use(globalPlugins)
  .use(formKitPlugin, defaultConfig)
  .directive('click-outside', ClickOutside)
  .mount("#app");
