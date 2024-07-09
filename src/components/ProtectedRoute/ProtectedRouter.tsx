import * as React from 'react';
import { Navigate } from 'react-router-dom';

import { IProfile } from '@web/types';
import { STEPS } from '@web/store/authSlice/types';
import { IAuthProps } from '@web/store/authSlice/selectors';

const SIGN_IN_PATH = '/sign_in';

export declare type PageProps = React.PropsWithChildren<{
  className?: string;
  isAuthenticated: boolean;
  currentUser: IProfile;
  step: STEPS;
}>

type Props = {
  children: (props : PageProps) => JSX.Element;
  authProps: IAuthProps;
}

function ProtectedRoute({ authProps, children }: Props) {
  const { step } = authProps;

  if (step === STEPS.SIGNED_IN_STATUS) {
    return children(authProps);
  }

  if (step === STEPS.SIGNED_OUT_STATUS) {
    return <Navigate to={SIGN_IN_PATH} replace />;
  }

  if (step === STEPS.CODE_VERIFY_STATUS) {
    return <Navigate to={SIGN_IN_PATH} replace />;
  }

  return null;
}

export default ProtectedRoute;
