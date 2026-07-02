'use client';

import { Suspense } from 'react';
import CheckInSuccessContent from 'components/check-in/CheckInSuccessContent';
import CheckInSuccessFallback from 'components/check-in/CheckInSuccessFallback';

export default function CheckInSuccessPage() {
  return (
    <Suspense fallback={<CheckInSuccessFallback />}>
      <CheckInSuccessContent />
    </Suspense>
  );
}
