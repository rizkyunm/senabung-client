globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'node-fetch-native/polyfill';
import { Server as Server$1 } from 'node:http';
import { Server } from 'node:https';
import destr from 'destr';
import { defineEventHandler, handleCacheHeaders, createEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseStatus, setResponseHeader, getRequestHeaders, createError, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'h3';
import { createFetch as createFetch$1, Headers } from 'ofetch';
import { createCall, createFetch } from 'unenv/runtime/fetch/index';
import { createHooks } from 'hookable';
import { snakeCase } from 'scule';
import { klona } from 'klona';
import defu, { defuFn } from 'defu';
import { hash } from 'ohash';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, withLeadingSlash, withoutTrailingSlash } from 'ufo';
import { createStorage, prefixStorage } from 'unstorage';
import { toRouteMatcher, createRouter } from 'radix3';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'pathe';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "apiBase": "http://localhost:8080",
    "auth": {
      "computed": {
        "origin": "",
        "pathname": "/api/auth",
        "fullBaseUrl": "/api/auth"
      },
      "isEnabled": true,
      "session": {
        "enableRefreshPeriodically": false,
        "enableRefreshOnWindowFocus": true
      },
      "globalAppMiddleware": {
        "isEnabled": true,
        "allow404WithoutAuth": false,
        "addDefaultCallbackUrl": true
      },
      "provider": {
        "type": "local",
        "pages": {
          "login": "/masuk"
        },
        "endpoints": {
          "signIn": {
            "path": "/login",
            "method": "post"
          },
          "signOut": {
            "path": "/logout",
            "method": "post"
          },
          "signUp": {
            "path": "/register",
            "method": "post"
          },
          "getSession": {
            "path": "/session",
            "method": "get"
          }
        },
        "token": {
          "signInResponseTokenPointer": "/token",
          "type": "Bearer",
          "headerName": "Authorization",
          "maxAgeInSeconds": 15000
        },
        "sessionDataType": {
          "id": "string",
          "name": "string",
          "phone_number": "string",
          "email": "string",
          "image_url": "string"
        }
      }
    }
  }
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const _assets = {

};

function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0].replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "");
}

const assets$1 = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

const storage = createStorage({});

storage.mount('/assets', assets$1);

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          useStorage().setItem(cacheKey, entry).catch((error) => console.error("[nitro] [cache]", error));
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (opts.swr && entry.value) {
      _resolvePromise.catch(console.error);
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(key, () => fn(...args), shouldInvalidateCache);
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return key.replace(/[^\dA-Za-z]/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const key = await opts.getKey?.(event);
      if (key) {
        return escapeKey(key);
      }
      const url = event.node.req.originalUrl || event.node.req.url;
      const friendlyName = escapeKey(decodeURI(parseURL(url).pathname)).slice(
        0,
        16
      );
      const urlHash = hash(url);
      return `${friendlyName}.${urlHash}`;
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const reqProxy = cloneWithProxy(incomingEvent.node.req, { headers: {} });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler() {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: $fetch.raw,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    const path = new URL(event.node.req.url, "http://localhost").pathname;
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(path, useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.node.req.url,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    event.node.res.end(JSON.stringify(errorObject));
    return;
  }
  const isErrorPage = event.node.req.url?.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    event.node.res.end(template(errorObject));
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  event.node.res.end(await res.text());
});

const assets = {
  "/404-illustration.svg": {
    "type": "image/svg+xml",
    "etag": "\"1f32-GxcPtlEOyzyutbTnCEf/p/xb0s8\"",
    "mtime": "2023-08-13T19:31:18.250Z",
    "size": 7986,
    "path": "../public/404-illustration.svg"
  },
  "/Person-sending-money-using-phone-flat-vector-illustration.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c104e-6p8iz1eicf8igWBXF4tgshEKoTI\"",
    "mtime": "2023-08-13T19:31:18.247Z",
    "size": 1839182,
    "path": "../public/Person-sending-money-using-phone-flat-vector-illustration.jpg"
  },
  "/auth-background.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b5-NBQJCyHPUq+H+z+LRX/QVeqiK9w\"",
    "mtime": "2023-08-13T19:31:18.242Z",
    "size": 437,
    "path": "../public/auth-background.svg"
  },
  "/avatar-filled.jpg": {
    "type": "image/jpeg",
    "etag": "\"c6b-YjVc/MqQdilqZr5kjZ6fgjpn7L0\"",
    "mtime": "2023-08-13T19:31:18.242Z",
    "size": 3179,
    "path": "../public/avatar-filled.jpg"
  },
  "/avatar-filled@2x.jpg": {
    "type": "image/jpeg",
    "etag": "\"229c-P+6sZzA6Dqobf11lyGK0ipI2+iA\"",
    "mtime": "2023-08-13T19:31:18.242Z",
    "size": 8860,
    "path": "../public/avatar-filled@2x.jpg"
  },
  "/avatar.jpg": {
    "type": "image/jpeg",
    "etag": "\"4e2-A5b8e6uj5mlVbHfNUnNJIolb6pc\"",
    "mtime": "2023-08-13T19:31:18.242Z",
    "size": 1250,
    "path": "../public/avatar.jpg"
  },
  "/avatar@2x.jpg": {
    "type": "image/jpeg",
    "etag": "\"905-BQ6G8uzweBOHKxSIeAyXYqB4IB0\"",
    "mtime": "2023-08-13T19:31:18.241Z",
    "size": 2309,
    "path": "../public/avatar@2x.jpg"
  },
  "/banner.jpeg": {
    "type": "image/jpeg",
    "etag": "\"537b0-LfWR5WN7uWtfnd055WXE/So3Y8A\"",
    "mtime": "2023-08-13T19:31:18.241Z",
    "size": 341936,
    "path": "../public/banner.jpeg"
  },
  "/error.jpg": {
    "type": "image/jpeg",
    "etag": "\"24077-CgQHy6hBrIcj/+XE4AX4+KpBalU\"",
    "mtime": "2023-08-13T19:31:18.240Z",
    "size": 147575,
    "path": "../public/error.jpg"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-aTthoKc4SKofH49zxDcvj3FA2h4\"",
    "mtime": "2023-08-13T19:31:18.238Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/funded-illustration.svg": {
    "type": "image/svg+xml",
    "etag": "\"a55a-7yPLKLVaPHx1f4bphDVijquAi00\"",
    "mtime": "2023-08-13T19:31:18.238Z",
    "size": 42330,
    "path": "../public/funded-illustration.svg"
  },
  "/hero-image.png": {
    "type": "image/png",
    "etag": "\"2dc81-7WfIm1PxerG0YNIdaXJHcb/GthI\"",
    "mtime": "2023-08-13T19:31:18.237Z",
    "size": 187521,
    "path": "../public/hero-image.png"
  },
  "/hero-image@2x.png": {
    "type": "image/png",
    "etag": "\"8c91f-KFHhShDDkeb90BJwlzqzjIseJeo\"",
    "mtime": "2023-08-13T19:31:18.236Z",
    "size": 575775,
    "path": "../public/hero-image@2x.png"
  },
  "/icon-avatar-add.svg": {
    "type": "image/svg+xml",
    "etag": "\"2ec-gFYJVCZn30YNqHOm13oALjO+oVw\"",
    "mtime": "2023-08-13T19:31:18.235Z",
    "size": 748,
    "path": "../public/icon-avatar-add.svg"
  },
  "/icon-avatar-change.svg": {
    "type": "image/svg+xml",
    "etag": "\"1b8-ZllT7sBXPCk6OvCq5J3BcCmX5hI\"",
    "mtime": "2023-08-13T19:31:18.234Z",
    "size": 440,
    "path": "../public/icon-avatar-change.svg"
  },
  "/icon-checklist.svg": {
    "type": "image/svg+xml",
    "etag": "\"320-k7AjaO7gqJ2qIuRjd+4omlpvwdg\"",
    "mtime": "2023-08-13T19:31:18.234Z",
    "size": 800,
    "path": "../public/icon-checklist.svg"
  },
  "/icon-thumbnail-hover.svg": {
    "type": "image/svg+xml",
    "etag": "\"320-Ss48r4tmDERa6uXgLJKNgUUFDEA\"",
    "mtime": "2023-08-13T19:31:18.234Z",
    "size": 800,
    "path": "../public/icon-thumbnail-hover.svg"
  },
  "/icon.png": {
    "type": "image/png",
    "etag": "\"15b8e-Y2Ef0fVWMBfTn2PaPHuwQSDMLAk\"",
    "mtime": "2023-08-13T19:31:18.233Z",
    "size": 88974,
    "path": "../public/icon.png"
  },
  "/img.png": {
    "type": "image/png",
    "etag": "\"32dd-WLRTFoCdkKUWZ0uoWjmYC/WbXCI\"",
    "mtime": "2023-08-13T19:31:18.232Z",
    "size": 13021,
    "path": "../public/img.png"
  },
  "/left-arrow.svg": {
    "type": "image/svg+xml",
    "etag": "\"203-japuBVsLgFGB7OkOn6BshtXhYOA\"",
    "mtime": "2023-08-13T19:31:18.232Z",
    "size": 515,
    "path": "../public/left-arrow.svg"
  },
  "/login.png": {
    "type": "image/png",
    "etag": "\"fb19f-HDXjgffsjLJldYJCdpDM8eV62R0\"",
    "mtime": "2023-08-13T19:31:18.230Z",
    "size": 1028511,
    "path": "../public/login.png"
  },
  "/logo-footer.png": {
    "type": "image/png",
    "etag": "\"b7f0-ClNWZ5UPOl7nwcyyr2yK9zeSLsA\"",
    "mtime": "2023-08-13T19:31:18.227Z",
    "size": 47088,
    "path": "../public/logo-footer.png"
  },
  "/logo.png": {
    "type": "image/png",
    "etag": "\"bc72-mmx0oINcN7btMZtfUPKysjk3F+s\"",
    "mtime": "2023-08-13T19:31:18.226Z",
    "size": 48242,
    "path": "../public/logo.png"
  },
  "/project-slider-1.jpg": {
    "type": "image/jpeg",
    "etag": "\"4b3cf-NoKycPkZ7fiMNyCpdi+gtNyNvGo\"",
    "mtime": "2023-08-13T19:31:18.224Z",
    "size": 308175,
    "path": "../public/project-slider-1.jpg"
  },
  "/sign_in_background.png": {
    "type": "image/png",
    "etag": "\"b020d-ina1/4LU7vPgZpUEmNvuQnDv2IU\"",
    "mtime": "2023-08-13T19:31:18.222Z",
    "size": 721421,
    "path": "../public/sign_in_background.png"
  },
  "/signup.jpeg": {
    "type": "image/jpeg",
    "etag": "\"c8f0d-oKRRqsLxeN/jnCPepTTqCWJpAc0\"",
    "mtime": "2023-08-13T19:31:18.217Z",
    "size": 823053,
    "path": "../public/signup.jpeg"
  },
  "/step-1-illustration.svg": {
    "type": "image/svg+xml",
    "etag": "\"ccac-KQKrBAAfcl2MpM2BKJ3sMFp+KgQ\"",
    "mtime": "2023-08-13T19:31:18.212Z",
    "size": 52396,
    "path": "../public/step-1-illustration.svg"
  },
  "/step-2-illustration.svg": {
    "type": "image/svg+xml",
    "etag": "\"5f7d-p61FoukzyAnPnMhed8Q0TBu0ax4\"",
    "mtime": "2023-08-13T19:31:18.212Z",
    "size": 24445,
    "path": "../public/step-2-illustration.svg"
  },
  "/step-3-illustration.svg": {
    "type": "image/svg+xml",
    "etag": "\"b650-0H/Yqc1D2GJe7ZNV9gx6McJRLO0\"",
    "mtime": "2023-08-13T19:31:18.211Z",
    "size": 46672,
    "path": "../public/step-3-illustration.svg"
  },
  "/success-illustration.svg": {
    "type": "image/svg+xml",
    "etag": "\"c300-PqcjTODJ6A3RkSXhTO9pAf/Ka+8\"",
    "mtime": "2023-08-13T19:31:18.210Z",
    "size": 49920,
    "path": "../public/success-illustration.svg"
  },
  "/sw.js": {
    "type": "application/javascript",
    "etag": "\"1a3-QpKdl7A8RlLxcQUfArSTZV+OgHo\"",
    "mtime": "2023-08-13T19:31:18.208Z",
    "size": 419,
    "path": "../public/sw.js"
  },
  "/testimonial-1-icon.png": {
    "type": "image/png",
    "etag": "\"3027-57PVXkHkHiKWIbJ8GrmO81h0rRM\"",
    "mtime": "2023-08-13T19:31:18.207Z",
    "size": 12327,
    "path": "../public/testimonial-1-icon.png"
  },
  "/testimonial-2-icon.png": {
    "type": "image/png",
    "etag": "\"2df1-T1cYUS1Nyl6sm7rZAsLIlueTiMg\"",
    "mtime": "2023-08-13T19:31:18.207Z",
    "size": 11761,
    "path": "../public/testimonial-2-icon.png"
  },
  "/testimonial-3-icon.png": {
    "type": "image/png",
    "etag": "\"2e4e-ihoglrGr3QFt6A87AtL8MLoIsfY\"",
    "mtime": "2023-08-13T19:31:18.206Z",
    "size": 11854,
    "path": "../public/testimonial-3-icon.png"
  },
  "/testimonial-line.svg": {
    "type": "image/svg+xml",
    "etag": "\"277-bQDlrgHKa+HnGDD+UPpaeJRlNvE\"",
    "mtime": "2023-08-13T19:31:18.206Z",
    "size": 631,
    "path": "../public/testimonial-line.svg"
  },
  "/_nuxt/ErrorModal.ea94ea53.js": {
    "type": "application/javascript",
    "etag": "\"286-BBuvzmz9x5C0P03Kjvqqu1w0zRY\"",
    "mtime": "2023-08-13T19:31:18.205Z",
    "size": 646,
    "path": "../public/_nuxt/ErrorModal.ea94ea53.js"
  },
  "/_nuxt/ErrorModal.faac38c8.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"be-6g3gX7mKY5N/r8WfZrilORPhavI\"",
    "mtime": "2023-08-13T19:31:18.205Z",
    "size": 190,
    "path": "../public/_nuxt/ErrorModal.faac38c8.css"
  },
  "/_nuxt/Footer.29de2a28.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"3f-4sODSB2DAKujLz1WFKN12mQTsgg\"",
    "mtime": "2023-08-13T19:31:18.205Z",
    "size": 63,
    "path": "../public/_nuxt/Footer.29de2a28.css"
  },
  "/_nuxt/Footer.2e10e491.js": {
    "type": "application/javascript",
    "etag": "\"1178-VJ9yRagK2XXRHCaU1bx20rmIEUA\"",
    "mtime": "2023-08-13T19:31:18.205Z",
    "size": 4472,
    "path": "../public/_nuxt/Footer.2e10e491.js"
  },
  "/_nuxt/_slug_.0c7e5956.js": {
    "type": "application/javascript",
    "etag": "\"16d8-e8tzvcSSWWfKL5eA5QWkYMatoss\"",
    "mtime": "2023-08-13T19:31:18.205Z",
    "size": 5848,
    "path": "../public/_nuxt/_slug_.0c7e5956.js"
  },
  "/_nuxt/auth.3a4d03de.js": {
    "type": "application/javascript",
    "etag": "\"ce-Az6svsfjUf1kz5a3GNGY0W+2x+c\"",
    "mtime": "2023-08-13T19:31:18.204Z",
    "size": 206,
    "path": "../public/_nuxt/auth.3a4d03de.js"
  },
  "/_nuxt/daftar-sukses.67aa543b.js": {
    "type": "application/javascript",
    "etag": "\"3ee-bOmD2MRClAuzEspMuxr/pkhR3wo\"",
    "mtime": "2023-08-13T19:31:18.204Z",
    "size": 1006,
    "path": "../public/_nuxt/daftar-sukses.67aa543b.js"
  },
  "/_nuxt/daftar.d5ab62b2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"48-rPf6aNzlKFqrw0bSc/WDEyoW7ek\"",
    "mtime": "2023-08-13T19:31:18.204Z",
    "size": 72,
    "path": "../public/_nuxt/daftar.d5ab62b2.css"
  },
  "/_nuxt/daftar.fdef357d.js": {
    "type": "application/javascript",
    "etag": "\"160e-gfhv9ZOY6OOuazD/vhaLH9VUsVc\"",
    "mtime": "2023-08-13T19:31:18.204Z",
    "size": 5646,
    "path": "../public/_nuxt/daftar.fdef357d.js"
  },
  "/_nuxt/date.044cb15a.js": {
    "type": "application/javascript",
    "etag": "\"1cd-OpF1qq4TlGDkto5mce5sxUKYw6I\"",
    "mtime": "2023-08-13T19:31:18.204Z",
    "size": 461,
    "path": "../public/_nuxt/date.044cb15a.js"
  },
  "/_nuxt/entry.2edbd4e8.js": {
    "type": "application/javascript",
    "etag": "\"41c41-COzzbXfEY0XNI+eNTWgs1poxB4A\"",
    "mtime": "2023-08-13T19:31:18.202Z",
    "size": 269377,
    "path": "../public/_nuxt/entry.2edbd4e8.js"
  },
  "/_nuxt/entry.81424451.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"f84f-d1sKXgRPaOOYJ5VXW11UgqL0rPo\"",
    "mtime": "2023-08-13T19:31:18.201Z",
    "size": 63567,
    "path": "../public/_nuxt/entry.81424451.css"
  },
  "/_nuxt/error-component.5cb2fe9e.js": {
    "type": "application/javascript",
    "etag": "\"99c-tV2czQaseiDEgSYcTgNBCtPgRp0\"",
    "mtime": "2023-08-13T19:31:18.201Z",
    "size": 2460,
    "path": "../public/_nuxt/error-component.5cb2fe9e.js"
  },
  "/_nuxt/funded-illustration.52f8578c.js": {
    "type": "application/javascript",
    "etag": "\"6f-Amv4li5XK+Yyx/onSClaLnSG+kU\"",
    "mtime": "2023-08-13T19:31:18.200Z",
    "size": 111,
    "path": "../public/_nuxt/funded-illustration.52f8578c.js"
  },
  "/_nuxt/gagal.3da17d96.js": {
    "type": "application/javascript",
    "etag": "\"3fd-H66c1NuRJVKZsqhVLyKKezCIKTM\"",
    "mtime": "2023-08-13T19:31:18.200Z",
    "size": 1021,
    "path": "../public/_nuxt/gagal.3da17d96.js"
  },
  "/_nuxt/galang-dana.4f3573b7.js": {
    "type": "application/javascript",
    "etag": "\"427-RdWn01RIA0TuwIbjZoKPwsqQ3vU\"",
    "mtime": "2023-08-13T19:31:18.200Z",
    "size": 1063,
    "path": "../public/_nuxt/galang-dana.4f3573b7.js"
  },
  "/_nuxt/icon-avatar-add.91797494.js": {
    "type": "application/javascript",
    "etag": "\"6b-rKZ+RJwbPS6TFRQmMlM1iAm5qvA\"",
    "mtime": "2023-08-13T19:31:18.200Z",
    "size": 107,
    "path": "../public/_nuxt/icon-avatar-add.91797494.js"
  },
  "/_nuxt/index.2d5cc298.js": {
    "type": "application/javascript",
    "etag": "\"848-qAj3B8UBNbtdMjuboWODXW8z3xs\"",
    "mtime": "2023-08-13T19:31:18.199Z",
    "size": 2120,
    "path": "../public/_nuxt/index.2d5cc298.js"
  },
  "/_nuxt/index.6a213776.js": {
    "type": "application/javascript",
    "etag": "\"12fa-fkG7EcuQKkhFbeJtlDC9+u/9dSE\"",
    "mtime": "2023-08-13T19:31:18.199Z",
    "size": 4858,
    "path": "../public/_nuxt/index.6a213776.js"
  },
  "/_nuxt/masuk.276d0ce2.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"46-hjy5rjgUpFIa58EPugghHmFF6Hw\"",
    "mtime": "2023-08-13T19:31:18.199Z",
    "size": 70,
    "path": "../public/_nuxt/masuk.276d0ce2.css"
  },
  "/_nuxt/masuk.32424436.js": {
    "type": "application/javascript",
    "etag": "\"d7a-lUS7W1Z3tterwRvQ3jQDfkidhpQ\"",
    "mtime": "2023-08-13T19:31:18.198Z",
    "size": 3450,
    "path": "../public/_nuxt/masuk.32424436.js"
  },
  "/_nuxt/nuxt-link.c905d1b8.js": {
    "type": "application/javascript",
    "etag": "\"10e1-KYELgaortSvK+GEbdMlDm4esxf8\"",
    "mtime": "2023-08-13T19:31:18.197Z",
    "size": 4321,
    "path": "../public/_nuxt/nuxt-link.c905d1b8.js"
  },
  "/_nuxt/profil.2d61f91c.js": {
    "type": "application/javascript",
    "etag": "\"dea-MgitZQPTFreTs1PH/DkzCm/VVTI\"",
    "mtime": "2023-08-13T19:31:18.197Z",
    "size": 3562,
    "path": "../public/_nuxt/profil.2d61f91c.js"
  },
  "/_nuxt/success.0421bc38.js": {
    "type": "application/javascript",
    "etag": "\"cc-0dJPWh77X30KvF6Vy96f3WFLXqM\"",
    "mtime": "2023-08-13T19:31:18.196Z",
    "size": 204,
    "path": "../public/_nuxt/success.0421bc38.js"
  },
  "/_nuxt/sukses.628d0961.js": {
    "type": "application/javascript",
    "etag": "\"555-2K+15OdVX+VFxEnmqE/VyphflVI\"",
    "mtime": "2023-08-13T19:31:18.196Z",
    "size": 1365,
    "path": "../public/_nuxt/sukses.628d0961.js"
  },
  "/_nuxt/tentang-kami.58542a96.js": {
    "type": "application/javascript",
    "etag": "\"947-pjJYpufFgZGu6VmAHvMs2JEfk6o\"",
    "mtime": "2023-08-13T19:31:18.195Z",
    "size": 2375,
    "path": "../public/_nuxt/tentang-kami.58542a96.js"
  },
  "/_nuxt/transaksi.412b13b2.js": {
    "type": "application/javascript",
    "etag": "\"9a4-xq18swpg1Kgurs0rgMh/Qcs7JvI\"",
    "mtime": "2023-08-13T19:31:18.195Z",
    "size": 2468,
    "path": "../public/_nuxt/transaksi.412b13b2.js"
  },
  "/_nuxt/unfinish.4960d8d2.js": {
    "type": "application/javascript",
    "etag": "\"411-vxfYNqfItF+8uce/4OYsuu41UDQ\"",
    "mtime": "2023-08-13T19:31:18.195Z",
    "size": 1041,
    "path": "../public/_nuxt/unfinish.4960d8d2.js"
  },
  "/_nuxt/unggah.21309438.js": {
    "type": "application/javascript",
    "etag": "\"9b3-1kOV4wlRI8CsntJV88U6RRLgYi8\"",
    "mtime": "2023-08-13T19:31:18.195Z",
    "size": 2483,
    "path": "../public/_nuxt/unggah.21309438.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.node.req.method && !METHODS.has(event.node.req.method)) {
    return;
  }
  let id = decodeURIComponent(
    withLeadingSlash(
      withoutTrailingSlash(parseURL(event.node.req.url).pathname)
    )
  );
  let asset;
  const encodingHeader = String(
    event.node.req.headers["accept-encoding"] || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    event.node.res.setHeader("Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      event.node.res.removeHeader("cache-control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = event.node.req.headers["if-none-match"] === asset.etag;
  if (ifNotMatch) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  const ifModifiedSinceH = event.node.req.headers["if-modified-since"];
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    event.node.res.statusCode = 304;
    event.node.res.end();
    return;
  }
  if (asset.type && !event.node.res.getHeader("Content-Type")) {
    event.node.res.setHeader("Content-Type", asset.type);
  }
  if (asset.etag && !event.node.res.getHeader("ETag")) {
    event.node.res.setHeader("ETag", asset.etag);
  }
  if (asset.mtime && !event.node.res.getHeader("Last-Modified")) {
    event.node.res.setHeader("Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !event.node.res.getHeader("Content-Encoding")) {
    event.node.res.setHeader("Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !event.node.res.getHeader("Content-Length")) {
    event.node.res.setHeader("Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_7uLl63 = () => import('../_..._.mjs');
const _lazy_4myqGp = () => import('../handlers/renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/api/auth/**', handler: _lazy_7uLl63, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_4myqGp, lazy: true, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_4myqGp, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const h3App = createApp({
    debug: destr(false),
    onError: errorHandler
  });
  const router = createRouter$1();
  h3App.use(createRouteRulesHandler());
  const localCall = createCall(toNodeListener(h3App));
  const localFetch = createFetch(localCall, globalThis.fetch);
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || {};
      const envContext = event.node.req.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: $fetch });
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch
  };
  for (const plugin of plugins) {
    plugin(app);
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const s = server.listen(port, host, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const i = s.address();
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${i.family === "IPv6" ? `[${i.address}]` : i.address}:${i.port}${baseURL}`;
  console.log(`Listening ${url}`);
});
{
  process.on(
    "unhandledRejection",
    (err) => console.error("[nitro] [dev] [unhandledRejection] " + err)
  );
  process.on(
    "uncaughtException",
    (err) => console.error("[nitro] [dev] [uncaughtException] " + err)
  );
}
const nodeServer = {};

export { useRuntimeConfig as a, getRouteRules as g, nodeServer as n, useNitroApp as u };
//# sourceMappingURL=node-server.mjs.map
