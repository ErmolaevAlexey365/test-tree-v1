import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { AppWrapper, MainWrapper } from 'components/RouteWrapper';
import { ROUTES } from 'constants/routes';

const Main = lazy(() => import('pages/Main'));

const routes: RouteObject[] = [
  {
    element: <AppWrapper />,
    children: [
      {
        element: <MainWrapper />,
        children: [
          {
            path: ROUTES.BASE_PATH,
            element: <Main />,
          },
        ],
      },
    ],
  },
];

export default createBrowserRouter(routes);
