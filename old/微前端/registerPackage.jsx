import { mountReducers } from './store'
import debug from '../helpers/debug'

function validateStringIsNotEmpty(str, msg) {
    if (typeof (str) !== 'string' || str.length === 0) {
        debug(msg)
        return false
    }
    return true
}

function containEntryCode(entryCode = 'undefined-entryCode') {
    const pkg = this.packages[this.packageName]

    return Object.hasOwnProperty.call(pkg.pages, entryCode)
}

function registeEntryCode(entryCodes, load) {
    if (Object.prototype.toString.call(entryCodes) !== '[object Object]') {
        debug('调用批量注册页面(registeEntryCode)时，参数entryCodes必须为Plain Object类型，键值均为string类型')
    }
    if (typeof (load) !== 'function') {
        debug('调用批量注册页面(registeEntryCode)时，参数load必须为函数类型，且该函数返回值是Promise对象，用来异步加载页面组件')
    }

    const pkg = this.packages[this.packageName]

    Object.keys(entryCodes).forEach((k) => {
        const entryCode = entryCodes[k]

        const r = validateStringIsNotEmpty(entryCode, '调用批量注册页面(registeEntryCode)时，参数entryCodes的格式必须是 { [string]: [string] }')

        if (r) {
            pkg.pages[entryCode] = {}
        }
    })

    pkg.load = (entryCode) => {
        return new Promise(resolve => load(resolve, entryCode)).catch((error) => {
            Promise.reject(error)
        })
    }

    return pkg.registePage
}

function registePage(entryCodes, reducers = {}) {
    if (typeof entryCodes !== 'string' && Object.prototype.toString.call(entryCodes) !== '[object Array]') {
        throw new Error('调用registePage异常: 参数entryCodes必须是 string 或 array<string> 类型')
    }
    mountReducers(reducers)

    /**
     * @param {React.Component} component
     */
    return (component) => {
        const keys = Object.keys(reducers)
        const packageName = this.packageName
        const pkg = this.packages[packageName]
        const _entryCodes = typeof entryCodes === 'string' ? [entryCodes] : entryCodes

        _entryCodes.forEach((entryCode) => {
            keys.forEach((key) => {
                if (!key.startsWith(packageName)) {
                    debug(`请将业务包：${packageName}->路由：${entryCode}->组件：${component.displayName || component.name || 'Component'}->reducer：${key}修改为${packageName}_${key}`)
                }
            })
            pkg.pages[entryCode] = {
                component,
                reducers,
            }
        })
        return component
    }
}

function emptyLoad() {
    debug(`业务包 ${this.packageName} 未调用 registeEntryCode 函数注册页面程序`)
    return Promise.resolve()
}

const packages = window.__packages__ = window.__packages__ || {}


/**
 * 注册业务包
 *
 * @export
 * @param {string} name 包名字
 * @returns 包实体
 */
export default function registePackage(name, version) {
    validateStringIsNotEmpty(name, '调用注册业务包函数(registePackage)必须提供字符串类型的包名，如：registePackage("wms")')

    if (Object.hasOwnProperty.call(packages, name) === false) {
        const context = {
            packageName: name,
            packages,
        }
        packages[name] = {
            version,
            containEntryCode: containEntryCode.bind(context),
            load: emptyLoad.bind(context),
            pages: {},
            /**
             * 批量注册页面
             * @param {string} entryCodes
             * @param {function} load
             */
            registeEntryCode: registeEntryCode.bind(context),
            /**
             * 注册页面
             *
             * @param {string} entryCode
             * @param {object<string, function>} [reducers={}]
             */
            registePage: registePage.bind(context),
        }
    }

    return packages[name]
}

/**
 * 异步加载业务包代码
 *
 * @export
 * @param {any} entryCode 页面码。如：sc2.deliveryDetail
 * @param {any} fn 回调函数，用来动态加载业务包里的页面组件代码。如：completed => import('./components').then(completed)
 */
export function loadByEntryCode(entryCode, fn = function emptyLoadCompleted() { }) {
    validateStringIsNotEmpty(entryCode, '调用异步加载业务包代码函数(loadByEntryCode)必须提供字符串类型的页面码(entryCode)，如：loadByEntryCode("sc2.deliveryDetail", () => {...})')

    if (typeof (fn) !== 'function') {
        debug('调用异步加载业务包代码函数(loadByEntryCode)必须提供回调函数，用来动态加载业务包里的页面组件代码')
    }

    const pkgNames = Object.keys(packages)
    const foundPkgName = pkgNames.find(pkgName => packages[pkgName].containEntryCode(entryCode))

    if (foundPkgName) {
        const foundPkg = packages[foundPkgName]
        foundPkg.load(entryCode).then(() => fn(foundPkg.pages[entryCode].component, true))
    } else {
        fn()
    }
}
