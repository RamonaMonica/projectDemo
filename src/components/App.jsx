import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router';
import { useMediaQuery } from 'react-responsive';

// import PublicRoute from 'guards/PublicRoute';
import { refreshUserThunk } from '../redux/auth/userThunks';
import { selectUserToken } from '../redux/auth/selectors';

import LoginPage from 'pages/LoginPage/LoginPage';
// import RegistrationPage from 'pages/RegistrationPage/RegistrationPage';

export const App = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (!token) return;
    dispatch(refreshUserThunk());
  }, [dispatch, token]);

  return (
    <>
      <Routes>
        <Route
          path="login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <RegistrationPage />
            </PublicRoute>
          }
        />
        {/* Acesta este un exemplu pentru redirecționare, dacă dorești */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
      {/* Înlocuit cu orice altă componentă specifică pentru autentificare dacă este necesar */}
      {/* <Notification /> */}
      {/* {isLoading && <Loader />} */}
    </>
  );
};
