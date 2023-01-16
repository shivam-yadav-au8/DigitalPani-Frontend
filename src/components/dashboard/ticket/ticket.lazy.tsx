import React, { lazy, Suspense } from 'react';

const LazyTicket = lazy(() => import('./Ticket'));

const Ticket = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTicket {...props} />
  </Suspense>
);

export default Ticket;
