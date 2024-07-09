import * as React from 'react';
import { MantineProvider, createTheme, TextInput } from '@mantine/core';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/code-highlight/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '@mdxeditor/editor/style.css';
import '@mantine/dates/styles.css';

import { useAppSelector, useAppDispatch } from '@web/store';
import { authPropsSelector } from '@web/store/authSlice/selectors';
import { authenticateAction } from '@web/store/authSlice/actions';
import ProtectedRoute from '@web/components/ProtectedRoute';
import { Auth, Dashboard, Assistants, Sources, Graphs, Messages } from '@web/pages';
import { themeSwitchSelector } from '@web/store/themeSlice/selectors/themeSwitch';
import '@web/i18n/config';

import classes from './App.module.css';

const theme = createTheme({
  fontFamily: 'Roboto, sans-serif',
  components: {
    Input: TextInput.extend({
      classNames: {
        input: classes.input
      }
    })
  }
});

type Props = React.PropsWithChildren<{
  className?: string | undefined;
}>;

function App({ className, children }: Props) {
  const isStarted = React.useRef<boolean>();
  const colorTheme = useAppSelector(themeSwitchSelector);

  const dispatch = useAppDispatch();
  const authProps = useAppSelector(authPropsSelector);

  React.useEffect(() => {
    if (isStarted.current) {
      return;
    }

    isStarted.current = true;

    const doAuthenticate = async () => {
      await dispatch(authenticateAction());
    };

    doAuthenticate();
  }, [dispatch]);

  // const contextClass = {
  //   success: "bg-blue-600",
  //   error: "#FFE3E6",
  //   info: "bg-gray-600",
  //   warning: "bg-orange-400",
  //   default: "bg-indigo-600",
  //   dark: "bg-white-600 font-gray-300",
  // };

  return (
    <MantineProvider theme={theme} forceColorScheme={colorTheme}>
      <BrowserRouter>
        <Routes>
          {!authProps.isAuthenticated && <Route path="/" element={<Navigate to="/sign_in" />} />}

          {authProps.isAuthenticated && (
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          )}

          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute authProps={authProps}>
                {(props) => <Dashboard {...props} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/assistants/*"
            element={
              <ProtectedRoute authProps={authProps}>
                {(props) => <Assistants {...props} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/sources/*"
            element={
              <ProtectedRoute authProps={authProps}>
                {(props) => <Sources {...props} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/graphs/*"
            element={
              <ProtectedRoute authProps={authProps}>
                {(props) => <Graphs {...props} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/messages/*"
            element={
              <ProtectedRoute authProps={authProps}>
                {(props) => <Messages {...props} />}
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Auth />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        toastClassName={classes.toast}
        bodyClassName={classes.tb}
        className={classes.toastContainer}
        closeButton={false}
      />
    </MantineProvider>
  );
}

export default App;
