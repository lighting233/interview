# router
## 1．单页面跟多页面的区别
- 多页面实际上就是多个html，通过window.location互相跳转。
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
      <button onClick={() => navigate("/pro/123", { state: { key: "value" } })}>
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
过去的流程是串行：初始化 -> 路由切换、页面加载 -> 分包 -> 生命周期挂载、拉取后端数据 -> 页面展示
数据路由： 初始化 -> 路由切换、页面加载 **并行** 分包 **并行** 生命周期挂载、拉取后端数据 -> 页面展示
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
        <Route path="albums" loader={async (params) => { const res = await axios.get('/user') return res;}}/>
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