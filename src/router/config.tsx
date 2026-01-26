import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const NotFound = lazy(() => import("../pages/NotFound"));
const Home = lazy(() => import("../pages/home/page"));
const Settings = lazy(() => import("../pages/settings/page"));
const OverviewPage = lazy(() => import("../pages/overview/page"));
const UploadPage = lazy(() => import("../pages/upload/page"));
const DataQueryPage = lazy(() => import("../pages/data-query/page"));
const ToolsPage = lazy(() => import("../pages/tools/page"));
const LoginPage = lazy(() => import("../pages/login/page"));

const Loading = () => (
  <div className="flex items-center justify-center h-screen w-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

const lazyLoad = (Component: React.ComponentType<any>) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: lazyLoad(Home),
  },
  {
    path: "/overview",
    element: lazyLoad(OverviewPage),
  },
  {
    path: "/upload",
    element: lazyLoad(UploadPage),
  },
  {
    path: "/data-query",
    element: lazyLoad(DataQueryPage),
  },
  {
    path: "/tools",
    element: lazyLoad(ToolsPage),
  },
  {
    path: "/login",
    element: lazyLoad(LoginPage),
  },
  {
    path: "/settings",
    element: lazyLoad(Settings),
  },
  {
    path: "*",
    element: lazyLoad(NotFound),
  },
];

export default routes;
