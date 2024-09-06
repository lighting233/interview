function mountReducer(reducer,initial,init?: I => S,) {
    const hook = mountWorkInProcessHook();
    let initialState;
    //todo
    if(init !== undefined) {
        initialState = init(initial);
    }else {
        initialState = initial;
    };
    hook.memorizeState = initialState;
    hook.lastRenderReducer = reducer;
    const updateQueue = createUpdateQueue()
    const dispatch = updateQueue.dispatch = dispatchReducerState.bind(null,updateQueue,currentlyRendingFiber);

    return [hook.memorizeState,dispatch]
};

function dispatchReducerState(updateQueue, fiber, action) {
    const update = createUpdate(action);
    enqueueuUpdate(updateQueue,update);
    schduleUpdateOnFiber(fiber);
};

function updateReducer(reducer,initial,init) {
    const hook = updateWorkInProcessHook();

    let memorizeState;
    const action = update.action;
    memorizeState = reducer(hook.baseState,action);
    hook.memorizeState = memorizeState;
    hook.lastRenderReducer = reducer;
    const queuue = hook.updateQueue;
    return [hook.memorizeState,queuue.dispatch]
};