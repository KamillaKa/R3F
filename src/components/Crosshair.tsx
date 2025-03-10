import { useState, useEffect } from 'react';

const Crosshair = () => {
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleLockChange = () => {
      setIsLocked(!!document.pointerLockElement);
    };

    document.addEventListener('pointerlockchange', handleLockChange);
    return () =>
      document.removeEventListener('pointerlockchange', handleLockChange);
  }, []);

  if (!isLocked) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '20px',
        height: '20px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          width: '100%',
          height: '2px',
          backgroundColor: 'white',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          width: '2px',
          height: '100%',
          backgroundColor: 'white',
        }}
      />
    </div>
  );
};

export default Crosshair;