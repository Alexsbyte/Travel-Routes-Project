import { RouteList } from '@/widgets';
import React from 'react';
// import SearchFilter from './SearchFilter';
// import MapComponent from './MapComponent';

export function RoutesPage(): React.JSX.Element {
  return (
    <div>
      {/* <SearchFilter /> */}
      <div style={{ display: 'flex' }}>
        <div style={{ width: '70%' }}>
          {/* <MapComponent /> */}
        </div>
        <div style={{ width: '30%' }}>
          <RouteList />
        </div>
      </div>
    </div>
  );
};

export default RoutesPage;
