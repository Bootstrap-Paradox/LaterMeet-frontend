import React, { useState, useLayoutEffect } from 'react';

const useDimension = () => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        function updateSize() {
            setDimensions({ width: window.innerWidth, height: window.innerHeight })
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);

    }, [])

    return dimensions;
}

export default useDimension;