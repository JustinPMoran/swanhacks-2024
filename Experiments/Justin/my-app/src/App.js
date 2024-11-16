import React, { useEffect } from 'react';
import 'aframe';
import 'ar.js/aframe/build/aframe-ar.js';
import 'aframe-extras';

function App() {
  useEffect(() => {
    // Any additional setup can go here
  }, []);

  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        <a-marker preset="hiro">
          <a-entity 
            gltf-model="#skeleton-model"
            scale="7 7 7"
            animation-mixer>
          </a-entity>
        </a-marker>
        <a-assets>
          <a-asset-item id="skeleton-model" src="./skellie2.0.glb"></a-asset-item>
        </a-assets>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}

export default App;