import { createError as createError$1, useBase, createRouter, defineEventHandler, readBody } from 'h3';
import { FetchError, $fetch } from 'ohmyfetch';
import { hasInjectionContext, getCurrentInstance, toRef } from 'vue';
import { getContext } from 'unctx';

class HttpFactory {
  constructor(fetcher) {
    this.$fetch = fetcher;
  }
  async call(method, url, payload, extras = {}) {
    return await this.$fetch(url, {
      method,
      body: payload,
      ...extras
    }).then((res) => {
      return res.data;
    }).catch((error) => {
      if (error instanceof FetchError) {
        if (error.data.meta.code === 404) {
          showError({
            statusCode: 404,
            message: error.data.meta.message,
            fatal: true
          });
        }
        if (error.data.meta.code === 403) {
          showError({
            statusCode: 403,
            statusMessage: error.data.meta.message
          });
        }
        return error.data.data;
      }
      showError({
        statusCode: 500,
        statusMessage: "Terjadi kesalahan !"
      });
    });
  }
}
const HttpFactory$1 = HttpFactory;

class AuthModule extends HttpFactory$1 {
  constructor() {
    super(...arguments);
    this.RESOURCE = "/api/v1";
  }
  async login(credentials) {
    return await this.call(
      "POST",
      `${this.RESOURCE}/sessions`,
      credentials
    );
  }
  async create(account) {
    return await this.call(
      "POST",
      `${this.RESOURCE}/users`,
      account
    );
  }
  async session(token) {
    return await this.call("GET", `${this.RESOURCE}/me`, void 0, {
      headers: {
        Authorization: token
      }
    });
  }
}
const AuthModule$1 = AuthModule;

const nuxtAppCtx = /* @__PURE__ */ getContext("nuxt-app");
function useNuxtApp() {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance = nuxtAppInstance || nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}

const useError = () => toRef(useNuxtApp().payload, "error");
const showError$1 = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    const error = useError();
    if (process.client) {
      nuxtApp.hooks.callHook("app:error", err);
    }
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};

const router = createRouter();
const fetchOptions = {
  baseURL: process.env.API_BASE_URL
};
const fetcher = $fetch.create(fetchOptions);
const authModule = new AuthModule$1(fetcher);
router.post(
  "/login",
  defineEventHandler(async (event) => {
    const payload = await readBody(event);
    try {
      return await authModule.login(payload);
    } catch (error) {
      if (error instanceof FetchError) {
        return error.data.data.errors;
      }
      showError$1({
        statusCode: 500,
        statusMessage: "Terjadi kesalahan dalam proses login, silahkan coba lagi"
      });
    }
  })
);
router.get(
  "/session",
  defineEventHandler(async (event) => {
    var _a;
    const token = (_a = event.req.headers) == null ? void 0 : _a.authorization;
    console.log(token);
    if (!token) {
      throw new Error();
    }
    try {
      const session = await authModule.session(token);
      console.log(session);
      return session;
    } catch (error) {
      showError$1({
        statusCode: 403,
        statusMessage: "Akses terbatas ! anda tidak dapat mengakses resource ini"
      });
    }
  })
);
router.post(
  "/logout",
  defineEventHandler(async () => {
    return "Anda berhasil keluar !";
  })
);
const _____ = useBase("/api/auth/", router.handler);

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
