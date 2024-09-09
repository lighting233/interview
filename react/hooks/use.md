# use

```js
function use(usable) {
	if (usable !== null && typeof usable === 'object') {
		if (typeof usable.then === 'function') {
			// 根据是否拥有then方法判断
			const thenable = usable;
			// 处理thenable
			return trackUsedThenable(thenable);
		} else if (usable.$$typeof === REACT_CONTEXT_TYPE) {
			// context
		}
	}
	throw new Error('不支持的use参数 ' + usable);
}

// 空函数
function noop() {}
// 全局变量 保存thenable
let suspendedThenable = null;

export function trackUsedThenable(thenable) {
	switch (thenable.status) {
		// 状态已变更为成功
		case 'fulfilled':
			return thenable.value;
		// 状态已变更为失败
		case 'rejected':
			throw thenable.reason;
		default:
			// 上一次已经进入过，默认空函数
			if (typeof thenable.status === 'string') {
				thenable.then(noop, noop);
			} else {
				//状态未确定，pending
				const pending = thenable;
				pending.status = 'pending';
				pending.then(
					// fulfilled
					(val) => {
						if (pending.status === 'pending') {
							const fulfilled = pending;
							fulfilled.status = 'fulfilled';
							fulfilled.value = val;
						}
					},
					// rejected
					(err) => {
						if (pending.status === 'pending') {
							const rejected = pending;
							rejected.reason = err;
							rejected.status = 'rejected';
						}
					}
				);
			}
	}
	// 保存在全局
	suspendedThenable = thenable;

	// 抛出错误
	throw SuspenseException;
}

export const SuspenseException = new Error(
	'这不是个真实的错误，而是Suspense工作的一部分。如果你捕获到这个错误，请将它继续抛出去'
);

```