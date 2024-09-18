# keep-alive
[keep alive in react is offscreen](https://juejin.cn/post/7268667384440389672)
[React 的 KeepAlive 探索](https://juejin.cn/post/7374337202652626985?searchId=2024091713462152984F769EC6E0AF5D7F#heading-2)

## 1. Style暴力隐藏法
- 如果依赖外部状态的话，即便隐藏，也需要 diff
```js
const StyleKeepAlive: React.FC<any> = ({children, showComponentName}) => {
    return (
        <>
            {React.Children.map(children, (child) => (
                <div
                    style={{
                        display: child.props.name === showComponentName ? "block" : "none",
                    }}
                >
                    {child}
                </div>
            ))}
        </>
    );
}

// 使用
<StyleKeepAlive showComponentName={counterName}>
      <Counter name="A" />
      <Counter name="B" />
</StyleKeepAlive>

```

## suspense

```js
import { useRef, Suspense } from 'react';

function Repeater(props) => {
  // props
  const { mode, children } = props;
  // refs
  const resolveRef = useRef();
  // destroy promise
  if (resolveRef.current) {
    resolveRef.current();
    resolveRef.current = void 0;
  }
  if (mode === 'hidden') {
    throw new Promise((resolve) => (resolveRef.current = resolve));
  }
  return <>{children}</>;
};


function Offscreen(props) {
    // props
    const { mode, children } = props;
    
    return (
        <Suspense>
            <Repeater mode={mode}>{children}</Repeater>
        </Suspense>
    )
}
```

## offScreen

```shell
pnpm add react@experimental react-dom@experimental
```
```js
import { unstable_Activity as Offscreen } from "react";

<Offscreen mode={counterName === "A" ? "visible" : "hidden"}>
    <Counter name="A" />
</Offscreen>
<Offscreen mode={counterName === "B" ? "visible" : "hidden"}>
    <Counter name="B" />
</Offscreen>
```