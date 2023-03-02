import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
} from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { DataFetchingJS } from './app/data-fetching-js';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FormValidationJS } from './app/form-validation-js';

import { DataFetchingTS } from './app/data-fetching-ts';
import { FormValidationTS } from './app/form-validation-ts';
import { Box } from '@mui/system';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <h1>Zod + RHF</h1>

        <div style={{ display: 'flex', columnGap: 10 }}>
          <Link to="data-fetching-js">Data Fetching JS</Link>
          <Link to="data-fetching-ts">Data Fetching TS</Link>
          <Link to="form-validation-js">Form Validation JS</Link>
          <Link to="form-validation-ts">Form Validation TS</Link>
        </div>
        <Box
          sx={{
            border: '1px solid black',
            padding: 2,
            width: 'fit-content',
          }}
        >
          <h3>Demo</h3>
          <Outlet />
        </Box>
      </Box>
    ),
    errorElement: <div>Page Not Found</div>,
    children: [
      {
        path: 'data-fetching-js',
        element: <DataFetchingJS />,
      },
      {
        path: 'data-fetching-ts',
        element: <DataFetchingTS />,
      },
      {
        path: 'form-validation-js',
        element: <FormValidationJS />,
      },
      {
        path: 'form-validation-ts',
        element: <FormValidationTS />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
