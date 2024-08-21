// @ts-nocheck

import { scheduleUpdateOnFiber } from "./react/react";
import { HookHasEffect } from "./react/源码/react-reconciler/src/hookEffectTags";
import { createUpdate, createUpdateQueue, enqueueUpdate, processUpdateQueue } from "./react/源码/react-reconciler/src/updateQueue";

function monutWorkInProcessHook() {
    return {
        next:null,
        //todo memoizedState
        // baseState: null,
        memoizedState:null,
        updateQueue: {}
    }
}
//todo mountState
function mountSetState (initialState) {
    const hoook = monutWorkInProcessHook();
    let memorizeState;

    if(initialState instanceof Function) {
        memorizeState = initialState();
    }else {
        memorizeState = initialState;
    };

    //todo 
    const queue = createUpdateQueue();
    // const update = createUpdate();
    //todo
    hook.updateQueue = queue;
    //todo dispatchSetState
    const dispatch = hook.dispatch = setStateDispatch.bind(null,currentlyRenderingFiber,queue);

    return [memorizeState, dispatch];
};

function setStateDispatch(fiber, queue, action) {
    //todo
    const update = createUpdate(action);
    enqueueUpdate(queue,update);
    scheduleUpdateOnFiber(fiber)
}

function mountState(initialState) {
    const hook = monutWorkInProcessHook();
    let memoizedState = initialState;
    if(initialState && typeof initialState === 'function') {
        memoizedState = initialState()
    }
    const queue = createUpdateQueue();
    hook.updateQueue = queue;
    hook.memoizedState = memoizedState;
    const dispatch = hook.dispatch = setStateDispatch.bind(null, currentlyrendingFinber,queue);

    return [hook.memoizedState,dispatch]
}

function setStateDispatch(action, fiber, queue) {
    const update = createUpdate(action)
    enqueueUpdate(queue,update);
    //todo 没有 queue
    scheduleUpdateOnFiber(fiber)
}

function updateState() {
    const hook = updateWorkInProcessHook();
    //todo
    // hook.memoizedState = process
    const queue = hook.updateQueue
    hook.memoizedState = processUpdateQueue(hook.baseState,queue)

    return [hook.memoizedState, hook.dispatch]
}