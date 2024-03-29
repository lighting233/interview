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
