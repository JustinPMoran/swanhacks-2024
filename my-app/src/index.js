import React, { useEffect } from 'react';
import 'aframe';
import 'ar.js';
import 'aframe-extras';

function App() {
  useEffect(() => {
    // Load scripts dynamically
    const aframeScript = document.createElement('script');
    aframeScript.src = 'https://aframe.io/releases/1.6.0/aframe.min.js';
    document.head.appendChild(aframeScript);

    const arjsScript = document.createElement('script');
    arjsScript.src = 'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js';
    document.head.appendChild(arjsScript);

    const extrasScript = document.createElement('script');
    extrasScript.src = 'https://cdn.jsdelivr.net/gh/donmccurdy/aframe-extras@v6.1.1/dist/aframe-extras.min.js';
    document.head.appendChild(extrasScript);

    // Clean up function
    return () => {
      document.head.removeChild(aframeScript);
      document.head.removeChild(arjsScript);
      document.head.removeChild(extrasScript);
    };
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
          <a-asset-item id="skeleton-model" src="skellie2.0.glb"></a-asset-item>
        </a-assets>
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
}

export default App;