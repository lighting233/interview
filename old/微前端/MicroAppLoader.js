import React, { Component } from 'react';
import { loadMicroApp, initGlobalState } from 'qiankun';
import { parse } from './entry'

export default class MicroAppLoader extends Component {
    constructor(props) {
        super(props);
        this.root = null;
        this.qiankunActions = null;
    }

    setRoot = (ref) => {
        this.root = ref
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            const { name, props } = this.props
            const { entry, microAppName } = parse(name)
            this.qiankunActions = initGlobalState({})
            this.microApp = loadMicroApp({
                name: microAppName,
                entry,
                container: this.root,
                props: { ...props, qiankunActions: this.qiankunActions },
            }, {
                sandbox: { loose: false },
            });
        }
    }


    async componentDidUpdate() {
        if (this.microApp) {
            this.qiankunActions && this.qiankunActions.setGlobalState(this.props)
        }
    }

    componentWillUnmount() {
        this.microApp && this.microApp.unmount();
    }

    render() {
        return (
            <div
                className="micro-app-wrapper"
                ref={this.setRoot}
                style={this.props.style}
            />
        )
    }
}


class ProxySandbox {
    constructor() {
        this.running = false;
        const fakeWindow = Object.create(null);
        this.proxy = new Proxy(fakeWindow, {
            get: (target, key) => {
                return key in target ? target[key] : window[key]
            },
            set: (target, key, value) => {
                if (this.running) {
                    target[key] = value;
                }

                return true;
            }
        })
    }
    active() {
        if (!this.running) this.running = true;
    }

    inactive() {
        this.running = false;
    }
}

const sandbox1 = new ProxySandbox();
const sandbox2 = new ProxySandbox();
sandbox1.active();
sandbox2.active();
sandbox1.proxy.a = 100;
sandbox2.proxy.a = 100;
sandbox1.inactive();
sandbox2.inactive();

(function(global) {
    // 在这个IIFE（立即调用的函数表达式）内部，
    // 'global' 变量可以作为 'window' 的代理
    global.a = 'value';
  })(sandbox1.proxy);
