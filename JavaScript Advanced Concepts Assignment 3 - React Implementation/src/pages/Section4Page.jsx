import React from 'react';
import SyncCallbackFlow from '../components/Section4/SyncCallbackFlow';
import AsyncCallbackObservation from '../components/Section4/AsyncCallbackObservation';

function Section4Page() {
  return (
    <div>
      <h1>Section 4: Callback Functions</h1>
      <SyncCallbackFlow />
      <AsyncCallbackObservation />
    </div>
  );
}

export default Section4Page;