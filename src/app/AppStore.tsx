'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux-store';

// eslint-disable-next-line import/prefer-default-export
export function AppStore({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
