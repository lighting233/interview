# router
## 1．单页面跟多页面的区别
- 多页面实际上就是多个html，通过`window.location`互相跳转。
    **缺点**：每个页面跳转都要刷新，重新加载资源，性能会比较慢
    **好处**：SEO友好，适合C端项目，隔离性好，每一个页面是一个独立的项目（每个项目可以由单独的团队负责）
- 单页面一个 html，通过 js 控制
    **缺点**：不利于 SEO
    **好处**：适合B端项目，代码复用性好，不用刷新页面体验好

## 2.BrowserRouter (99%)
需要后台做一些配置：
  - `baidu.com`默认返回 `baidu.com/index.html`
  - 和`baidu.com/app`资源路径不是一样的
  - 做单页应用的时候，不管访问哪个 `path`，服务器只返回 `index.html`(服务端做两种服务，一种接口服务`baidu.com/api/getuser`,另一种不带api 的都返回 index.html)

```js
function Dashboard() {
const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={() => navigate("/pro/123", { state: { key: "value" } })}>跳转并传递 state </button>
      <button>
        <Link to='/tasks'>通过标签跳转</Link>
      </button>
      {/* This element will render either <DashboardMessages> when the URL is
          "/messages", <DashboardTasks> at "/tasks", or null if it is "/"
      */}
      //占位符
      <Outlet />
    </div>
  );
}
function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  let location = useLocation();
  let [searchParams, setSearchParams] = useSearchParams();//获取?后边的name=xxx
  console.log(location.state)
  // ...
}

function App() {
  return (
    <BrowserRouter basename="/app">
      <Routes>
        <Route path="/" element={<Dashboard />}>
            <Route path="/messages" element={<DashboardMessages />}/>
            <Route path="/tasks" element={<DashboardTasks />} />
             <Route path="/pro/:userId" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```
## 3. HashRouter
了解即可，非必要不要使用这种方式。
**缺陷：**
1. 很丑
2. 后期要改造服务端渲染很不方便

## 4.MemoryRouter
内存型路由
**应用场景：**单测，因为 node 环境没有 `window.history`

## 5.StaticRouter
服务端渲染路由

## 6.数据路由
- 过去的流程是串行：初始化 -> 路由切换、页面加载 -> 分包（异步 js 包） -> 生命周期挂载、拉取后端数据 -> 页面展示
- 数据路由： 初始化 -> 路由切换、页面加载 **并行** 分包 **并行** 生命周期挂载、拉取后端数据 -> 页面展示
- 传统的单页应用会有瀑布流问题，react 页面自顶向下渲染，如果主路由页面被阻塞 2s，子页面进入后通过副作用拉去数据需要 2s，则一共被阻塞 4s，才能看见拉取回的数据
**缺点：**将数据耦合到UI中，增加了项目的耦合性，维护成本升高
**优点：**带来了直观的性能提升
```js
export function Albums() {
  const albums = useLoaderData();
  // ...
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="contact" element={<Contact />} />
      <Route
        path="dashboard"
        element={<Dashboard />}
        loader={({ request }) =>
          fetch("/api/dashboard.json", {
            signal: request.signal,
          })
        }
      />
      <Route element={<AuthLayout />}>
        <Route
          path="login"
          element={<Login />}
          loader={redirectIfUser}
        />
        <Route path="logout" action={logoutUser} />
        <Route path="albums" 
          loader={async (params) => { const res = await axios.get('/user'); return res;}}
          lazy={async () => {
            const data =  await import('./project')
            const Project = data.default;
            return {
              element: <Project/>
            }
          }}
        />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider
    router={router}
    fallbackElement={<BigSpinner />}
  />
```
## 7.更改路由的方式
1. a标签
2. location.hash、location.href
3. 浏览器前进后退按键或者history.back、history.go、history.forward
4. history.pushState、history.replaceState（H5 history 新特性）

### hash的特点
1. hash的改变，不会访问服务器，不会刷新页面（hash 值是网页的标志位，HTTP 请求不包含锚部分，不会发送给服务器，对后端无影响）
2. hash的改变，会触发`hashchange`监听事件
3. hash的改变，会改变浏览器的历史记录.这也是为什么当`hash`的改变(`hash`的改变会记录在`window.hisotry`中)，不仅仅可以出触发`hashchange`事件，还会触发`popstate`事件（监听history对象变化的事件）

**注意事项：**
1. 如果改变的hash值与当前的hash值一致时，`hashchang`不会改变，但是`popstate`事件会执行（location.href更改时，执行，但是location.hash更改时，不会执行，两者执行时，都不会创建一条新的历史记录）。
2. 哪怕新的hash值和当前的hash值相同时，history.pushState方法会创建一条新的历史记录

### history
1. **popstate事件**
- `history.pushState()` 和 `history.replaceState()` 不会触发 `popstate` 事件。 `popstate` 事件仅在浏览器执行**主动导航**时触发，例如用户点击浏览器的**后退或前进按钮**，或通过 `history.back()、history.forward()、history.go()` 方法触发导航时触发。
通过 `a` 标签或者 `window.location` 进行页面跳转时，都会触发 `window.onload` 事件，页面完成渲染。点击浏览器的后退键或前进键，根据浏览器的不同机制，也会重新加载（Chrome 浏览器），或保留之前的页面（Safari 浏览器）。
- `history.pushState()` 和 `history.replaceState()` 是 `HTML5 History API` 中的两个方法，用于在浏览器历史记录中添加或修改记录，并更新地址栏的 URL，而不会触发页面刷新

**注意事项：**
- 仅仅调用`pushState()`方法或`replaceState()`方法 ，并不会触发该事件;
- 只有用户点击浏览器倒退按钮和前进按钮，或者使用 JavaScript 调用`History.back()`、`History.forward()`、`History.go()`方法时才会触发；
- 单纯的a标签不会触发；
- 另外，上面浏览器回退和前进事件只针对同一个文档，如果浏览历史的切换，导致加载不同的文档，该事件也不会触发。页面第一次加载的时候，浏览器不会触发popstate事件。使用的时候，可以为popstate事件指定回调函数，回调函数的参数是一个 event 事件对象，它的 state 属性指向当前的 state 对象；

1. **hashchange事件**
每当hash值发生变化时，就会触发`hashchange`事件，hash值的变化也会触发`popstate`事件

## 8.如何实现前端路由
实现前端路由，需要解决两个核心问题
1. 如何改变 URL 却不引起页面刷新？
2. 如何监测 URL 变化？

```ts
export function RouterProvider({
  fallbackElement,
  router,
  future,
}: RouterProviderProps): React.ReactElement {
  let [state, setStateImpl] = React.useState(router.state);
  let { v7_startTransition } = future || {};

  let setState = React.useCallback<RouterSubscriber>(
    (newState: RouterState) => {
      if (v7_startTransition && startTransitionImpl) {
        startTransitionImpl(() => setStateImpl(newState));
      } else {
        setStateImpl(newState);
      }
    },
    [setStateImpl, v7_startTransition]
  );

  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  React.useLayoutEffect(() => router.subscribe(setState), [router, setState]);

  return (
    <>
      <DataRouterContext.Provider value={dataRouterContext}>
        <DataRouterStateContext.Provider value={state}>
          <Router
            basename={basename}
            location={state.location}
            navigationType={state.historyAction}
            navigator={navigator}
            future={{
              v7_relativeSplatPath: router.future.v7_relativeSplatPath,
            }}
          >
            {state.initialized || router.future.v7_partialHydration ? (
              <DataRoutes
                routes={router.routes}
                future={router.future}
                state={state}
              />
            ) : (
              fallbackElement
            )}
          </Router>
        </DataRouterStateContext.Provider>
      </DataRouterContext.Provider>
      {null}
    </>
  );
}


export function Routes({
  children,
  location,
}: RoutesProps): React.ReactElement | null {
  return useRoutes(createRoutesFromChildren(children), location);
}

export function useRoutes(
  routes: RouteObject[],
  locationArg?: Partial<Location> | string
): React.ReactElement | null {
  return useRoutesImpl(routes, locationArg);
}

// Internal implementation with accept optional param for RouterProvider usage
export function useRoutesImpl(
  routes: RouteObject[],
  locationArg?: Partial<Location> | string,
  dataRouterState?: RemixRouter["state"],
  future?: RemixRouter["future"]
): React.ReactElement | null {

  let { matches: parentMatches } = React.useContext(RouteContext);


  let renderedMatches = _renderMatches(
    matches &&
      matches.map((match) =>
        Object.assign({}, match, {
          params: Object.assign({}, parentParams, match.params),
          pathname: joinPaths([
            parentPathnameBase,
            // Re-encode pathnames that were decoded inside matchRoutes
            navigator.encodeLocation
              ? navigator.encodeLocation(match.pathname).pathname
              : match.pathname,
          ]),
          pathnameBase:
            match.pathnameBase === "/"
              ? parentPathnameBase
              : joinPaths([
                  parentPathnameBase,
                  // Re-encode pathnames that were decoded inside matchRoutes
                  navigator.encodeLocation
                    ? navigator.encodeLocation(match.pathnameBase).pathname
                    : match.pathnameBase,
                ]),
        })
      ),
    parentMatches,
    dataRouterState,
    future
  );

  // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.
  if (locationArg && renderedMatches) {
    return (
      <LocationContext.Provider
        value={{
          location: {
            pathname: "/",
            search: "",
            hash: "",
            state: null,
            key: "default",
            ...location,
          },
          navigationType: NavigationType.Pop,
        }}
      >
        {renderedMatches}
      </LocationContext.Provider>
    );
  }

  return renderedMatches;
}


function initialize() {

    unlistenHistory = init.history.listen(
      ({ action: historyAction, location, delta }) => {
       
        return startNavigation(historyAction, location);
      }
    );

    return router;
  }
```

### 流程
1. 点击 `Link` 或者 `useNavigate`的 `nagivate` 方法，底层都是调用 `router` 的 `nagivate` 方法
2. `matchRoutes`把`routes`扁平化
3. 调用`matchRouteBranch`匹配路由得到`matches`数组
4. 接着调用 `history` 的 `pushState` 或者 `replaceState` 修改 `history`
5. 执行`updateState`通知`RouterProvider`的`subscribe`
6. 执行`setState` 来重新渲染
7. 重新渲染的时候通过`renderMatches` 把当前 `matches` 的组件渲染出来
8. 初始化的时候会执行`history.listen`，进行一次`startNavigation`，并挂载这个 `listener`
9. 使用前进后退按钮时，监听到 `popstate` 事件，再次执行`listener`

[图解 history api 和 React Router 实现原理](https://juejin.cn/post/7265614642168037416?searchId=20240917160145417D96FFE2B980BD44E4)
[这一次彻底弄懂 React Router 实现原理](https://juejin.cn/post/7340586221189677110?searchId=20240917160145417D96FFE2B980BD44E4)
[知乎](https://zhuanlan.zhihu.com/p/609800112)