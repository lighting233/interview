import { prefetchApps } from 'qiankun';

const getEnvironment = () => {
    const location = window.location.host
    let environment = null

    if (location.indexOf('dohko.') > -1) {
        environment = 'dohko'
    } else if (location.indexOf('svip.shop') > -1) {
        environment = 'svip'
    } else if (location.indexOf('vip.shop') > -1) {
        environment = 'vip'
    } else if (location.indexOf('alpha.shop') > -1) {
        environment = 'alpha'
    } else if (location.indexOf('kr.shop') > -1) {
        environment = 'kr'
    } else if (location.indexOf('22city.shop') > -1) {
        environment = '22city'
    } else if (location.indexOf('shop') > -1) {
        environment = 'shop'
    } else if (location.indexOf('dev.salecenter') > -1) {
        environment = 'dev'
    }

    return environment
}

export const microAppEntry = {
    bc: {
        'default': '//platform-bc.hualala.com/',
        'dohko': '//dohko.platform-bc.hualala.com/',
        'dev': '//dev.salecenter.hualala.com:8999/',
    },
    gc: {
        'default': '//dohko.sc.goods.hualala.com/',
        'dohko': '//dohko.sc.goods.hualala.com/',
        'dev': '//dev.salecenter.hualala.com:8000/',
    },
}

export function parse(name) {
    if (!name || typeof name !== 'string') { throw '微应用名称必须有值，并符合规范 bizModule/microAppName, 例如 bc/approvalFlowManage' }

    const segments = name.split('/')
    if (segments.length !== 2) { throw '微应用名称需符合规范 bizModule/microAppName, 例如 bc/approvalFlowManage' }

    const bizModule = segments[0]
    const microAppName = segments[1]

    const entries = microAppEntry[bizModule]
    if (!entries) { throw `模块${bizModule},相关的微应用资源地址未配置` }

    const entry = entries[getEnvironment()]
    if (!entry) { throw `模块${bizModule}相关的微应用资源地址未配置` }

    return {
        entry,
        microAppName,
    }
}

// 以后性能优化再使用
export function prefetchMicroApps() {
    const apps = Object.keys(microAppEntry).map((bizModule, index) => {
        const name = `__prefetch_app_${index}`
        return {
            name,
            entry: parse(`${bizModule}/${name}`).entry,
        }
    })
    prefetchApps(apps)
}
