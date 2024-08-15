// @ts-nocheck

import { scheduleUpdateOnFiber } from "./react/react";
import { HookHasEffect } from "./react/源码/react-reconciler/src/hookEffectTags";
import { createUpdateQueue, enqueueUpdate } from "./react/源码/react-reconciler/src/updateQueue";

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