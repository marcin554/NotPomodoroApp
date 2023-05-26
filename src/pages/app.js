import React from 'react';

function MyComponent() {
  const handleStoreGet = async () => {
    try {
      const value = await window.electronAPI.store.get('sessions');
      console.log(value);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStoreSet = () => {
    window.electronAPI.store.set('myKey', 'myValue');
  };

  

  return (
    <div>
      <button onClick={handleStoreGet}>Get Value</button>
      <button onClick={handleStoreSet}>Set Value</button>
    </div>
  );
}

export default MyComponent;