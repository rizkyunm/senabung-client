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
      var _a, _b, _c, _d, _e;
      if (error instanceof FetchError) {
        if (((_a = error.data) == null ? void 0 : _a.meta.code) === 404) {
          showError({
            statusCode: 404,
            message: (_b = error.data) == null ? void 0 : _b.meta.message,
            fatal: true
          });
        }
        if (((_c = error.data) == null ? void 0 : _c.meta.code) === 403) {
          showError({
            statusCode: 403,
            statusMessage: (_d = error.data) == null ? void 0 : _d.meta.message
          });
        }
        return (_e = error.data) == null ? void 0 : _e.data;
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
  async checkEmailAvailability(email) {
    console.log(email);
    return await this.call(
      "POST",
      `${this.RESOURCE}/email_checkers`,
      { email }
    );
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
    if (!token) {
      throw new Error();
    }
    try {
      const session = await authModule.session(token);
      return session;
    } catch (error) {
      console.log(error);
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
