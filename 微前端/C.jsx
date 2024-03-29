import React, { Component } from 'react'
import { Alert, Spin } from 'antd';
import PropTypes from 'prop-types'

import { loadByEntryCode } from './registerPackage'

const defaultCInner = (
    <Spin style={{ marginTop: '20%' }}>
        <div></div>
    </Spin>
)
const defaultUpgrading = ({ menuName }) => {
    if (process.env.NODE_ENV !== 'production') {
        return (
            <Alert
                type="error"
                showIcon={true}
                style={{ margin: '20px' }}
                message="为什么不显示"
                description="可能在升级，或是业务包程序有问题，或是使用了错误的 vendor 脚本"
            />
        );
    }
    return (
        <div className="layoutsContainer">
            <div className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>{menuName}</h1>
                    </div>
                </div>
            </div>
            <div className="layoutsLineBlock" />
            <div style={{ textAlign: 'center', paddingTop: '150px' }}>
                <img alt="coming soon..." src="/img/upgrading.png" />
                <p style={{ margin: '15px auto', color: '#999999' }}>{`${menuName}功能升级中，请在 5 秒后刷新页面`}</p>
            </div>
        </div>
    );
};
const defaultLoadError = ({ entryCode, menuName }) => {
    if (process.env.NODE_ENV !== 'production') {
        return (
            <Alert
                type="error"
                showIcon={true}
                style={{ margin: '20px' }}
                message="页面未配置"
                description={`未找到 entryCode 对应的页面配置：${entryCode}`}
            />
        );
    }
    return (
        <div className="layoutsContainer">
            <div className="layoutsHeader">
                <div className="layoutsTool">
                    <div className="layoutsToolLeft">
                        <h1>{menuName}</h1>
                    </div>
                </div>
            </div>
            <div className="layoutsLineBlock" />
            <div style={{ textAlign: 'center', paddingTop: '150px' }}>
                <img alt="coming soon..." src="/img/coming.png" />
                <p style={{ margin: '15px auto', color: '#999999' }}>{`${menuName}功能开发中，敬请期待`}</p>
            </div>
        </div>
    );
};

/**
 * 加载各业务线代码
 */
export const loadBizScripts = () => {
    const bizScripts = window.bizScripts

    if (Object.prototype.toString.call(bizScripts) === '[object Array]' && bizScripts.length > 0) {
        let src = null

        // eslint-disable-next-line
        while (src = bizScripts.shift()) {
            const arr = src.split('/')
            const id = arr[arr.length - 1]

            if (document.getElementById(id) !== null) {
                // eslint-disable-next-line
                continue
            }

            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = src
            script.id = id
            document.body.appendChild(script)
        }
    }
}

export default class C extends Component {
    static propTypes = {
        id: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]).isRequired,
        entryCode: PropTypes.string.isRequired,
    }

    static defaultProps = {
        id: Date.now(),
    }

    state = {
        CInner: () => defaultCInner,
    }

    async componentDidMount() {
        const { entryCode } = this.props

        loadBizScripts()

        loadByEntryCode(entryCode, (CInner = defaultLoadError, loaded = false) => {
            this.setState({
                CInner: loaded ? CInner : defaultUpgrading,
            })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.id !== this.props.id || nextState.CInner !== this.state.CInner
    }

    render() {
        const { CInner } = this.state
        return <CInner {...this.props} />
    }
}
