'use client';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistor, { store, RootState } from '../redux/store';

function AuthCookieSync() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      document.cookie = `accessToken=${accessToken}; path=/; max-age=604800; SameSite=Lax`;
    } else {
      document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  }, [accessToken]);

  return null;
}

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthCookieSync />
        {children}
      </PersistGate>
    </Provider>
  );
}
