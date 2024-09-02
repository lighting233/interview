```ts
function mountReducer(
    reducer: (S, A) => S,
    initialArg: I,
    init?,
) {
    const hook = mountWorkInProgressHook();
    let initialState;
    if (init !== undefined) {
        initialState = init(initialArg);
    } else {
        initialState = initialArg;
    }
    hook.memoizedState = hook.baseState = initialState;
    const queue = {
        pending: null,
        lanes: NoLanes,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialState
    };
    hook.queue = queue;
    const dispatch: Dispatch<A> = (queue.dispatch = (dispatchReducerAction.bind(
        null,
        currentlyRenderingFiber,
        queue,
    )));
    return [hook.memoizedState, dispatch];
}

function updateReducer(
    reducer: (S, A) => S,
    initialArg: I,
    init?,
) {
    const hook = updateWorkInProgressHook();
    const queue = hook.queue;

    const current: currentHook;

    // The last rebase update that is NOT part of the base state.
    let baseQueue = current.baseQueue;

    if (baseQueue !== null) {
        // We have a queue to process.
        const first = baseQueue.next;
        let newState = current.baseState;

        let newBaseState = null;
        let update = first;
        const action = update.action;
        newState = reducer(newState, action);

        hook.memoizedState = newState;
        hook.baseState = newBaseState;
    }

    const dispatch = queue.dispatch;
    return [hook.memoizedState, dispatch];
}
```