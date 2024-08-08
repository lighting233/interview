import { useEffect } from "react";
import { useReducer } from "react";

const store = {
  atomListenersMap: new WeakMap(),
  atomDependencies: new WeakMap(),
  getAtomValue(atom) {
    const getter = (a) => {
      if (a !== atom) {
        // atom 依赖 a
        // 把 atom 添加到 a 的依赖集合中
        let dependencies = this.atomDependencies.get(a);
        if (!dependencies) {
          dependencies = new Set();
          this.atomDependencies.set(a, dependencies);
        }
        if (!dependencies.has(atom)) dependencies.add(atom);
        return this.getAtomValue(a);
      } else {
        return a.value;
      }
    };
    console.log(this.atomDependencies);
    return atom.read(getter);
  },
  setAtomValue(atom, args) {
    let value = args;
    if (typeof args === "function") {
      value = args(this.getAtomValue(atom));
    }
    atom.write(value);
    this.notify(atom);
  },
  notify(atom) {
    const listeners = this.atomListenersMap.get(atom);
    if (listeners) listeners.forEach((l) => l());
    const dependencies = this.atomDependencies.get(atom);
    if (dependencies) {
      dependencies.forEach((dependency) => {
        // 还需要通知依赖自己的其他原子
        this.notify(dependency);
      });
    }
  },
  sub(atom, listener) {
    let listeners = this.atomListenersMap.get(atom);
    if (!listeners) {
      listeners = new Set();
      this.atomListenersMap.set(atom, listeners);
    }
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};







export const atom = (value) => {
  const _atom = {
    write(val) {
      this.value = val;
    },
  };

  if (typeof value === "function") {
    _atom.read = value;
  } else {
    _atom.value = value;
    _atom.read = function (getter) {
      return getter(this);
    };
  }

  return _atom;
};

const useAtomValue = (atom) => {
  const [value, rerender] = useReducer(
    () => {
      return store.getAtomValue(atom);
    },
    undefined,
    () => store.getAtomValue(atom)
  );

  useEffect(() => {
    const unsub = store.sub(atom, () => {
      rerender();
    });
    return unsub;
  }, []);

  return value;
};

const useSetAtom = (atom) => {
  return (args) => {
    store.setAtomValue(atom, args);
  };
};

export const useAtom = (atom) => {
  return [useAtomValue(atom), useSetAtom(atom)];
};


export function useSyncExternalStoreWithSelector<Snapshot, Selection>(
    subscribe: (() => void) => () => void,
    getSnapshot: () => Snapshot,
    getServerSnapshot: void | null | (() => Snapshot),
    selector: (snapshot: Snapshot) => Selection,
    isEqual?: (a: Selection, b: Selection) => boolean,
  ): Selection {
    // Use this to track the rendered snapshot.
    const instRef = useRef<
      | {
          hasValue: true,
          value: Selection,
        }
      | {
          hasValue: false,
          value: null,
        }
      | null,
    >(null);
    let inst;
    if (instRef.current === null) {
      inst = {
        hasValue: false,
        value: null,
      };
      instRef.current = inst;
    } else {
      inst = instRef.current;
    }
  
    /**
     * zustand使用的时候采用的是useStore(selector)的形式，每次re-render都会获得一个新的selector
     * 所以getSelection在re-render后都是新的，但是因为有instRef.current以及isEqual
     * 当isEqual的时候返回instRef.current缓存的值，也就是getSelection的返回值不变
     * 不会再次re-render，减少了re-render的次数
     *  */
    const [getSelection, getServerSelection] = useMemo(() => {
      // Track the memoized state using closure variables that are local to this
      // memoized instance of a getSnapshot function. Intentionally not using a
      // useRef hook, because that state would be shared across all concurrent
      // copies of the hook/component.
      let hasMemo = false;
      let memoizedSnapshot;
      let memoizedSelection: Selection;
      const memoizedSelector = (nextSnapshot: Snapshot) => {
        if (!hasMemo) {
          // The first time the hook is called, there is no memoized result.
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          const nextSelection = selector(nextSnapshot);
          if (isEqual !== undefined) {
            // Even if the selector has changed, the currently rendered selection
            // may be equal to the new selection. We should attempt to reuse the
            // current value if possible, to preserve downstream memoizations.
            if (inst.hasValue) {
              const currentSelection = inst.value;
              if (isEqual(currentSelection, nextSelection)) {
                memoizedSelection = currentSelection;
                return currentSelection;
              }
            }
          }
          memoizedSelection = nextSelection;
          return nextSelection;
        }
  
        // We may be able to reuse the previous invocation's result.
        const prevSnapshot: Snapshot = (memoizedSnapshot: any);
        const prevSelection: Selection = (memoizedSelection: any);
  
        if (is(prevSnapshot, nextSnapshot)) {
          // The snapshot is the same as last time. Reuse the previous selection.
          return prevSelection;
        }
  
        // The snapshot has changed, so we need to compute a new selection.
        const nextSelection = selector(nextSnapshot);
  
        // If a custom isEqual function is provided, use that to check if the data
        // has changed. If it hasn't, return the previous selection. That signals
        // to React that the selections are conceptually equal, and we can bail
        // out of rendering.
        if (isEqual !== undefined && isEqual(prevSelection, nextSelection)) {
          return prevSelection;
        }
  
        memoizedSnapshot = nextSnapshot;
        memoizedSelection = nextSelection;
        return nextSelection;
      };
      // Assigning this to a constant so that Flow knows it can't change.
      const maybeGetServerSnapshot =
        getServerSnapshot === undefined ? null : getServerSnapshot;
      const getSnapshotWithSelector = () => memoizedSelector(getSnapshot());
      const getServerSnapshotWithSelector =
        maybeGetServerSnapshot === null
          ? undefined
          : () => memoizedSelector(maybeGetServerSnapshot());
      return [getSnapshotWithSelector, getServerSnapshotWithSelector];
    }, [getSnapshot, getServerSnapshot, selector, isEqual]);
  
    const value = useSyncExternalStore(
      subscribe,
      getSelection,
      getServerSelection,
    );
  
    useEffect(() => {
      inst.hasValue = true;
      inst.value = value;
    }, [value]);
  
    useDebugValue(value);
    return value;
  }