import React, { useCallback, useState } from 'react';
import { ListLayout } from './layout/CI/listLayout/listLayout';
import { WeatherLayout } from './layout/CI/weatherLayout/weatherLayout';

import './App.css'



const App: React.FC = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const callbackFn = useCallback((_lat: number, _lng: number) => {
    setLat(_lat)
    setLng(_lng)
  }, [])
  return (
    <>
      <WeatherLayout callback={callbackFn} />
      {lat && lng && <ListLayout lat={lat} lng={lng} />}
    </>
  );
};

export default App;
