// @ts-nocheck
import { scheduleUpdateOnFiber } from "./react/react";
import { PassiveEffect } from "./react/源码/react-reconciler/src/fiberFlags";
import { requestUpdateLane } from "./react/源码/react-reconciler/src/fiberLanes";
import { HookHasEffect } from "./react/源码/react-reconciler/src/hookEffectTags";
import { createUpdate, createUpdateQueue, enqueueUpdate, processUpdateQueue } from "./react/源码/react-reconciler/src/updateQueue";

function monutWorkInProcessHook() {
    return {
        next: null,
        //todo memoizedState
        // baseState: null,
        memoizedState: null,
        updateQueue: {}
    }
}
//todo mountState
function mountSetState(initialState) {
    const hoook = monutWorkInProcessHook();
    let memorizeState;

    if (initialState instanceof Function) {
        memorizeState = initialState();
    } else {
        memorizeState = initialState;
    };

    //todo 
    const queue = createUpdateQueue();
    // const update = createUpdate();
    //todo
    hook.updateQueue = queue;
    //todo dispatchSetState
    const dispatch = hook.dispatch = setStateDispatch.bind(null, currentlyRenderingFiber, queue);

    return [memorizeState, dispatch];
};

function setStateDispatch(fiber, queue, action) {
    //todo
    const update = createUpdate(action);
    enqueueUpdate(queue, update);
    scheduleUpdateOnFiber(fiber)
}

function mountState(initialState) {
    const hook = monutWorkInProcessHook();
    let memoizedState = initialState;
    if (initialState && typeof initialState === 'function') {
        memoizedState = initialState()
    }
    const queue = createUpdateQueue();
    hook.updateQueue = queue;
    hook.memoizedState = memoizedState;
    const dispatch = hook.dispatch = setStateDispatch.bind(null, currentlyrendingFinber, queue);

    return [hook.memoizedState, dispatch]
}

function setStateDispatch(action, fiber, queue) {
    const update = createUpdate(action)
    enqueueUpdate(queue, update);
    //todo 没有 queue
    scheduleUpdateOnFiber(fiber)
}

function updateState() {
    const hook = updateWorkInProcessHook();
    //todo
    // hook.memoizedState = process
    const queue = hook.updateQueue
    hook.memoizedState = processUpdateQueue(hook.baseState, queue)

    return [hook.memoizedState, hook.dispatch]
}

function mountTransition() {
    const hook = mountWorkInProcessHook();
    const [isPending, setPending] = mountState(false);
    const start = startTransition.bind(null, setPending);
    hook.memoizedState = start;
    return [isPending, start];
}

function updateTransition() {
    const hook = updateWorkInProcessHook();
    const start = hook.memoizedState;
    return [hook.isPending, start];
}

function startTransition(setPending, callback) {
    setPending(true);
    let prevTransition = config.transition;
    callback();
    setPending(false);
}

function mountState(initialState) {
    const hook = mountWorkInProcessHook();
    let memoizeState;

    //todo instanceof
    if (initialState instanceof Function) {
        memoizeState = initialState();
    } else {
        memoizeState = initialState;
    };
    hook.memoizedState = memoizeState;
    //todo hook.baseState = memoizedState;
    const queue = createUpdateQueue();
    //todo
    hook.updateQueue = queue;
    const dispatch = queue.dispatch = setStateDispatch.bind(null, queue, currentlyRendingFiber);
    return [hook.memoizedState, dispatch];
};

//todo dispatchSetState
function dispatchSetState(queue, fiber, action) {
    const lane = requestUpdateLane();
    const update = createUpdate(action, lane);
    enqueueUpdate(queue, update);
    scheduleUpdateOnFiber(fiber, lane);
}

function updateState() {
    const hook = updateWorkInProcessHook();
    const updateQueue = hook.updateQueue
    hook.memoizedState = processUpdateQueue(hook.baseState, renderLanes);

    return [hook.memoizedState, updateQueue.dispatch]
}

function mountEffect(create, deps) {
    const hook = mountWorkInProcessHook();
    const nextDeps = deps === undefined ? null : deps;
    currentlyRendingFiber.flasg |= PassiveEffect;
    hook.memoizeState = pushPassiveEffect(Passive | HookHasEffect, create, undefined, nextDeps);

    //todo

}

function updateEffect(create, deps) {
    const hook = updateWorkInProcessHook();
    const nextDeps = deps === undefined ? null : deps;
    const {
        prevDeps,
        destroy
    } = hook.memoizedState;
    if (nextDeps !== null) {
        if (Object.is(nextDeps, prevDeps)) {
            hook.memoizeState = pushPassiveEffect(Passive, create, destroy, nextDeps);
        }
    };
    currentlyRendingFiber.flasg |= PassiveEffect;
    hook.memoizeState = pushPassiveEffect(Passive | HookHasEffect, create, destroy, nextDeps);
}

function mountTransition() {
    const hook = mountWorkInProcessHook();
    const [isPending, setPending] = mountState(false);
    const start = startTransition.bind(null, setPending);
    //todo 
    // hook.memoizeState = [isPending,start]
    hook.memoizeState = start;
    return [isPending, start]
};

function updateTransition() {
    const hook = updateWorkInProcessHook();
    //todo
    const [isPending] = updateState();
    return [isPending, hook.memoizeState];
}

function startTransition(setPending, callback) {
    setPending(true);
    let prevTransition = currentBatchConfig.transition;
    currentBatchConfig.transition = 1;

    callback();
    setPending(false);
    currentBatchConfig.transition = prevTransition;

}

function mountRef(initialVal) {
    const hook = mountWorkInProcessHook();
    hook.memoizeState = {
        current: initialVal
    };
    return hook.memoizeState
}

function mountMemo(create, deps) {
    const hook = mountWorkInProcessHook();
    const nextDeps = deps === undefined ? null : deps;
    const nextValue = create();
    hook.memoizeState = [nextValue, nextDeps];
    return nextValue;
}

function updateMemo(create, deps) {
    const hook = mountWorkInProcessHook();
    const nextDeps = deps === undefined ? null : deps;
    const [prevValue, prevDeps] = hook.memoizeState;

    if (nextDeps !== null) {
        if (Object.is(nextDeps, prevDeps)) {
            hook.memoizeState = [prevValue, nextDeps];
            return;
        }
    }
    const nextValue = create();
    hook.memoizeState = [nextValue, nextDeps];
    return nextValue;
}

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




