<script setup lang="ts" name="Login">
import { reactive } from "vue";
import { LoginParams } from "@/api/_auth/model";
import { useMessage, MessageKey } from "@/hooks/web/useMessage";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";
import config from "@/config";
import { useMenuStore } from "@/store/modules/menu";

const menuStore = useMenuStore();
const router = useRouter();
const { createMessage } = useMessage();

const loginForm = reactive<LoginParams>({
  username: "",
  password: "",
  rememberMe: false,
});
const loginRules = {
  username: [{ required: true, message: "请输入登录账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入登录密码", trigger: "blur" }],
};
let loginStatus = $ref<boolean>(false);

async function doLogin(value: LoginParams) {
  const userStore = useUserStore();
  try {
    loginStatus = true;
    createMessage.loading({
      duration: 0,
      content: "正在登录",
      key: MessageKey.LOADING_KEY,
    });
    await userStore.login(value);
    createMessage.success({
      content: "登录成功",
      key: MessageKey.LOADING_KEY,
    });
    const subMenu = menuStore.$state.subMenu;
    if (subMenu.length > 0) {
      const successPath = getSucessPath(subMenu[0]);
      router.replace(successPath);
    } else {
      router.replace("/");
    }
  } finally {
    loginStatus = false;
  }
}

function getSucessPath(subMenu: any) {
  if (subMenu.children && subMenu.children.length > 0) {
    return getSucessPath(subMenu.children[0]);
  } else {
    return subMenu.path;
  }
}
</script>

<template>
  <div class="flex h-screen p-3/25 justify-center items-center">
    <div class="login-bg"></div>
    <div class="bg animate-animated animate-fadeInLeft">
      <div class="load_look"></div>
      <div style="margin: 100px 60px; flex: 1">
        <h1
          class="text-42px font-500 font-bold text-[#103059] m-0 mt-3 -2xl:text-36px text-center"
          style="color: #0071ff"
        >
          {{ config.APP.title }}
        </h1>
        <div class="mt-16 flex flex-col -2xl:mt-11">
          <a-form
            layout="vertical"
            :model="loginForm"
            :rules="loginRules"
            @finish="doLogin"
          >
            <a-form-item name="username">
              <a-input
                v-model:value="loginForm.username"
                placeholder="请输入账号"
              />
            </a-form-item>
            <a-form-item name="password" :style="{ marginTop: '38px' }">
              <a-input-password
                v-model:value="loginForm.password"
                autocomplete="new-password"
                placeholder="请输入密码"
              />
            </a-form-item>
            <a-form-item>
              <div
                class="flex justify-between items-center text-[#a5adc7] text-18px mt-20px"
              >
                <a-checkbox v-model="loginForm.rememberMe">记住密码</a-checkbox>
                <span
                  class="cursor-pointer"
                  @click="() => createMessage.warn('敬请期待!')"
                  style="color: #0071ff"
                  >忘记密码？</span
                >
              </div>
            </a-form-item>
            <a-form-item :style="{ marginTop: '50px' }">
              <a-button
                block
                type="primary"
                :loading="loginStatus"
                html-type="submit"
                >登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.bg {
  display: flex;
  width: 1376px;
  height: 629px;
  background: #ffffff;
  box-shadow: 0px 10px 33px 0px rgba(23, 79, 141, 0.43);
  border-radius: 10px;
  padding: 20px;
  justify-content: space-between;
}

.load_look {
  width: 670px;
  height: 592px;
}

@text-color: #a5adc7;

input:-webkit-autofill {
  box-shadow: 0 0 0px 999px rgba(255, 255, 255, 1) inset !important;
}

:deep(.ant-form) {
  .ant-form-item {
    @apply mb-0;
  }

  .ant-checkbox-wrapper {
    @apply text-18px font-normal text- [ @text-color ];

    .ant-checkbox-inner {
      @apply border border-solid border- [ @text-color ] w-18px h-18px;
    }

    .ant-checkbox-checked::after {
      @apply rounded-1 / 2;
    }
  }

  label {
    @apply text-base font-semibold;
  }

  .ant-form-item-label > label {
    @apply text- [ #7289a7 ];
  }

  .login-input-style {
    @apply w-360px bg-transparent text-base text-black border-none rounded-none outline-none focus:(shadow-none)!important;
  }

  .ant-input {
    // .login-input-style();
    width: 100% !important;
  }

  .ant-input-password {
    width: 100% !important;
  }

  .ant-input-affix-wrapper {
    // .login-input-style();
    width: 100% !important;

    .ant-input {
      // .login-input-style();
    }

    &.ant-input-affix-wrapper-focused {
      box-shadow: none;
    }
  }

  .ant-btn {
    @apply h-11 text-base rounded-2l;
  }
}
</style>
