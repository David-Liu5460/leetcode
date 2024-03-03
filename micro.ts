/*
  1.1.8版本起，应用的切换不再修改window.location.hash
  activityFunction中不再使用window.location.hash来判断应用是否需要render，而改为使用一个隐形hash：window.location['__invisibleHash__']
  以下注释中提到的hash皆指window.location['__invisibleHash__']
*/
import * as singleSpa from "single-spa";
// @ts-ignore
// import * as singleSpa from './src/single-spa';
import log from "./log";
import { loadStyle, loadScript } from "./load.helper";
import {
  ERROR_TYPE,
  throwError,
  checkParamKeys,
  safetyStringify,
} from "./error.helper";
import { CustomProps, App, AppInfo, RedirectOpt } from "./types";

const customPropsMap = {};
const customPropsOrigin = {};
const appInfoMap = {};
const { track } = (window["IcbuIM"] && window["IcbuIM"].IMBaaSSDK) || {};

function appHandler(app: App, appName: string) {
  const { bootstrap, mount, unmount } = app;

  return {
    async bootstrap(props: CustomProps) {
      if (typeof bootstrap === "function") {
        /*
          bootstrap时应用还未被挂载到页面，single-spa将应用状态置为SKIP_BECAUSE_BROKEN也没有关系
          但为了统一处理错误信息，这里也先于single-spa内部捕获了错误
        */
        try {
          bootstrap(props);
        } catch (e) {
          track &&
            track.error(ERROR_TYPE.BOOTSTRAP_ERROR, {
              uid: window["aliId"],
              appName,
              props: safetyStringify(props),
              errMsg: safetyStringify(e),
            });
          throwError(
            ERROR_TYPE.BOOTSTRAP_ERROR,
            `An error happened when execute ${appName}'s 'bootstrap': ${e}`,
            appName
          );
        }
      }
    },
    async mount(props: CustomProps) {
      if (typeof mount === "function") {
        // 先于single-spa内部捕获错误，为了跳过将应用状态置为SKIP_BECAUSE_BROKEN这一步
        try {
          mount(props);
          // 挂载成功打点
          log(`SPA_HELPER_microAppLoadSuccess&appName=${appName}`);
        } catch (e) {
          track &&
            track.error(ERROR_TYPE.MOUNT_ERROR, {
              uid: window["aliId"],
              appName,
              props: safetyStringify(props),
              errMsg: safetyStringify(e),
            });
          throwError(
            ERROR_TYPE.MOUNT_ERROR,
            `An error happened when execute ${appName}'s 'mount': ${e}`,
            appName
          );
        }
      } else {
        throwError(
          ERROR_TYPE.MOUNT_ERROR,
          `The ${appName}'s 'mount' needs to be a function, but get ${typeof mount}`,
          appName
        );
      }
    },
    async unmount(props: CustomProps) {
      if (typeof unmount === "function") {
        // 先于single-spa内部捕获错误，为了跳过将应用状态置为SKIP_BECAUSE_BROKEN这一步
        try {
          unmount(props);
          // 卸载成功打点
          log(`SPA_HELPER_microAppUnloadSuccess&appName=${appName}`);
        } catch (e) {
          track &&
            track.error(ERROR_TYPE.UNMOUNT_ERROR, {
              uid: window["aliId"],
              appName,
              props: safetyStringify(props),
              errMsg: safetyStringify(e),
            });
          throwError(
            ERROR_TYPE.UNMOUNT_ERROR,
            `An error happened when execute ${appName}'s 'unmount': ${e}`,
            appName
          );
        }
      } else {
        throwError(
          ERROR_TYPE.UNMOUNT_ERROR,
          `The ${appName}'s 'unmount' needs to be a function, but get ${typeof unmount}`,
          appName
        );
      }
    },
  };
}

function activityFunc(appName: string) {
  /*
    展示判定逻辑，假如__invisibleHash__中包含app1
    1. 若app1未展示，则展示，否则变为不展示；
    2. 与app1同组的app，展示状态置为false；
    3. 与app1异组的app，保持原有展示状态；
  */
  return function (location: Location) {
    const currentHash = window.location["__invisibleHash__"];
    const currentAppNames = Array.isArray(currentHash)
      ? currentHash
      : [currentHash];
    const app = appInfoMap[appName];

    // 判断应用可激活状态，过滤非redirectTo方法触发的active检查
    if (!app.activable) {
      return app.active;
    }

    // 遍历currentAppNames，判断该app是否该显示
    for (let i = 0; i < currentAppNames.length; i++) {
      // 跳过为空的情况
      if (!currentAppNames[i]) {
        continue;
      }
      const currentApp = appInfoMap[currentAppNames[i]];
      if (appName === currentAppNames[i]) {
        // 转换应用的显示状态，未展示的将展示，已展示的将关闭
        app.active = !app.active;
        // app.active = true;
        break;
      } else if (app.group === currentApp.group) {
        // 同组的情况，互斥显示
        app.active = false;
        break;
      }
      // 其余情况为不同组，无需处理显示展示状态
    }
    // active check结束，将activable重置为false
    app.activable = false;
    return app.active;
  };
}

function setAllAppActivable() {
  for (const key in appInfoMap) {
    appInfoMap[key].activable = true;
  }
}

function loadConfig(appInfo: AppInfo) {
  if (typeof appInfo !== "object" || appInfo === null) {
    throwError(
      ERROR_TYPE.CONFIG_ERROR,
      `An app config needs to be an object, but get ${
        appInfo === null ? "null" : typeof appInfo
      }`
    );
  }

  const { appName, resources, customProps } = appInfo;

  customProps && checkParamKeys(appName, customProps);

  if (typeof appName !== "string") {
    throwError(
      ERROR_TYPE.CONFIG_ERROR,
      `The 'appName' of an app needs to be an object, but get ${typeof appName}`,
      appName
    );
  }
  if (!Array.isArray(resources)) {
    throwError(
      ERROR_TYPE.CONFIG_ERROR,
      `The 'resources' of ${appName} needs to be an Array, but get ${typeof resources}`,
      appName
    );
  }

  // 复制一份customProps
  customPropsMap[appName] = { ...(customProps || {}) };
  // 保留原始customProps
  customPropsOrigin[appName] = customProps || {};
  // @ts-ignore
  singleSpa.registerApplication(
    appName,
    () => {
      // loadFunction 需要返回一个promise，故初始值赋一个resolve的promise
      // @ts-ignore
      let app = Promise.resolve(
        appHandler(
          { bootstrap: () => "", mount: () => "", unmount: () => "" },
          appName
        )
      );
      resources.forEach((node) => {
        const { type, url } = node;

        if (typeof type !== "string") {
          throwError(
            ERROR_TYPE.CONFIG_ERROR,
            `The type of resource needs to be a string, but get ${typeof type} in ${appName}`,
            appName
          );
        }
        if (typeof url !== "string") {
          throwError(
            ERROR_TYPE.CONFIG_ERROR,
            `The url of resource needs to be a string, but get ${typeof url} in ${appName}`,
            appName
          );
        }

        switch (type) {
          case "appURL":
          case "js":
            if (type === "appURL") {
              // @ts-ignore
              app = loadScript(url).then((appResult: App) => {
                return appHandler(appResult, appName);
              });
            } else {
              loadScript(url);
            }
            break;
          case "css":
            loadStyle(url);
            break;
          default:
            throwError(
              ERROR_TYPE.CONFIG_ERROR,
              `The type of resource needs to be one of 'appURL', 'js' and 'css, but get '${type}' in ${appName}`,
              appName
            );
            break;
        }
      });
      return app;
    },
    activityFunc(appName),
    customPropsMap[appName]
  );
}

export function loadConfigs(appInfoList: AppInfo[]) {
  if (!Array.isArray(appInfoList)) {
    throwError(
      ERROR_TYPE.CONFIG_ERROR,
      `The configs of apps need to be an Array, but get ${typeof appInfoList}`
    );
  }
  /*
    构建appInfoMap
    构建一个形如
    {
      app1: { group: 0, active: false },  // 组号 和 显示状态 app有分组的概念
      app2: { group: 0, active: false },
      app3: { group: 1, active: false },
      ...
    }
    的map
    其中key为appName，value为一个对象
    包含了组号、显示状态(初始都为false)信息
  */
  for (let i = 0; i < appInfoList.length; i++) {
    const appInfos = appInfoList[i];
    if (Array.isArray(appInfos)) {
      for (let j = 0; j < appInfos.length; j++) {
        const appInfo = appInfos[j];
        appInfoMap[appInfo.appName] = { group: i, active: false };
        loadConfig(appInfo);
      }
    } else {
      appInfoMap[appInfos.appName] = { group: i, active: false };
      loadConfig(appInfos);
    }
  }
  singleSpa.start();
  singleSpa.addErrorHandler(function (e: Error) {
    /*
      在生命周期中抛出的错误，错误信息会带有single-spa添加的错误信息
      为了信息简要，所以截去single-spa添加的错误信息
      仅保留@alife/spa-helper自己的错误信息
    */
    const errIndex = e.message.indexOf("==== SPA");
    e.message = e.message.slice(errIndex);
    /*
      如果不将错误异步抛出，会阻塞single-spa内部一些后续状态更新
      从而导致single-spa无法正常加载其他正常的应用
    */
    setTimeout(() => {
      throw e;
    });
  });
}

export function redirectTo(opt: RedirectOpt) {
  if (typeof opt !== "object" || opt === null) {
    throwError(
      ERROR_TYPE.REDIRECT_ERROR,
      `A redirect option needs to be an object, but get ${
        opt === null ? "null" : typeof opt
      }`
    );
  }

  const { appName, params, blank } = opt;

  params && checkParamKeys(appName, params);

  const paramsType = typeof params;
  if (paramsType !== "object" && paramsType !== "undefined") {
    throwError(
      ERROR_TYPE.CONFIG_ERROR,
      `The 'params' of redirect option needs to be a object, but get ${paramsType}`,
      appName
    );
  }

  const blankType = typeof blank;
  if (blankType !== "boolean" && blankType !== "undefined") {
    throwError(
      ERROR_TYPE.CONFIG_ERROR,
      `The 'blankType' of redirect option needs to be a boolean, but get ${blankType}`,
      appName
    );
  }

  // 更新参数
  const names = Array.isArray(appName) ? appName : [appName];
  names.forEach((node: string) => {
    if (typeof node !== "string") {
      throwError(
        ERROR_TYPE.REDIRECT_ERROR,
        `The 'appName' of redirect option needs to be a string, but get ${typeof node}`,
        node
      );
    }
    if (node) {
      const newCustomProps = { ...customPropsOrigin[node], ...(params || {}) };
      /*
        删除上一次展示子应用时传入，但本次展示没有传入的参数
        避免上一次的参数被本次误用
      */
      for (const key in customPropsMap[node]) {
        if (!(key in newCustomProps)) {
          delete customPropsMap[node][key];
        }
      }
      /*
        customPropsMap[node]不存在，则说明应用未被注册过
        此时跳过更新参数
      */
      if (customPropsMap[node]) {
        Object.assign(customPropsMap[node], newCustomProps);
      }
    }
  });
  // @ts-ignore 为了在仅有参数变动时，强制触发组件更新
  if (
    !Array.isArray(appName) &&
    (window.location["__invisibleHash__"] === appName ||
      appInfoMap[appName].active)
  ) {
    // 假如有2个应用A,B，互相独立，且A可能同时激活多个
    // 当A激活过后，B又激活，接着要激活第二个A，
    // 此时需要先将__invisibleHash__先置为A，走参数变动的逻辑，否则A将无法渲染
    // @ts-ignore
    if (appInfoMap[appName].active) {
      window.location["__invisibleHash__"] = appName;
    }
    // 将全部应用置为可激活
    setAllAppActivable();
    // 调用replaceState仅仅为了触发single-spa调用activityFunction
    history.replaceState({}, "", window.location.href);
  }

  setTimeout(() => {
    // 使用history.replaceState的原因是为了不让页面reload，直接修改window.location.search会引起页面reload
    window.location["__invisibleHash__"] = appName;
    // 将全部应用置为可激活
    setAllAppActivable();
    history[blank ? "pushState" : "replaceState"]({}, "", window.location.href);
  }, 0);
}

export function unloadApp(appName: string) {
  const mountedApps = singleSpa.getMountedApps();
  if (mountedApps.indexOf(appName) !== -1) {
    singleSpa.unloadApplication(appName, { waitForUnmount: true });
  }
}

export function getParamsFromQueryString() {
  console.error(
    '==== The function "getParamsFromQueryString" has been deprecated. Please remove it! ===='
  );
  return {};
}

export function getCurrentHash() {
  return window.location["__invisibleHash__"];
}

export function getCurrentAppNames() {
  const names = [];
  for (const key in appInfoMap) {
    if (appInfoMap[key].active) {
      names.push(key);
    }
  }
  return names;
}

// 每次加载时，清空hash，保证是初始状态
(function initUrl() {
  window.location["__invisibleHash__"] = "";
})();
