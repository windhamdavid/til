import React, { useEffect, useRef } from 'react';
import abcjs from 'abcjs';

export default function ABCNotation({ 
  notation, 
  responsive = true,
  width = 600, 
  options = {} 
}) {
  const divRef = useRef(null);

  useEffect(() => {
    if (divRef.current && notation) {
      // Clear previous rendering
      divRef.current.innerHTML = '';
      
      // Render ABC notation
      abcjs.renderAbc(divRef.current, notation, {
        responsive: responsive ? 'resize' : undefined,
        add_classes: true,
        staffwidth: responsive ? undefined : width,
        ...options
      });
    }
  }, [notation, responsive, width, options]);

  return <div ref={divRef} className="abcjs-container" />;
}