import React, { useEffect, useState, ReactEventHandler } from 'react';
import { render } from 'react-dom';
import { InputDict, computeDesignSystem } from './design-system.ts';

const loadInputs = (): InputDict => {
  return fetch('/api/inputs').then(response => response.json());
};

const saveInputs = (inputs: InputDict): InputDict => {
  return fetch('/api/inputs', {
    method: 'PUT',
    body: JSON.stringify(inputs),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json());
};

const useInputs = (): [{ inputs: any, isLoading: boolean }, Function] => {
  const [inputs, setInputs]: [null | InputDict, Function] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadInputs().then((inputs: InputDict): void => {
      setInputs(inputs);
      setIsLoading(false);
    });
  }, []);

  return [{ inputs, isLoading }, setInputs];
};

const styles = {
  textarea: {
    fontSize: '14px',
    fontFamily: 'monospace',
    width: 600,
    height: 600
  }
};

const App = () => {
  const [{ inputs, isLoading }, setInputs] = useInputs();
  const [error, setError]: [null | Error, Function] = useState(null);

  const handleChange = (event: React.ChangeEvent): void => {
    const target = event.target as HTMLTextAreaElement;

    try {
      const value = JSON.parse(target.value)
      setInputs(value);
      setError(null);
    } catch (err) {
      setError(new Error('Invalid JSON.'));
    }
  };

  const handleSave = () => {
    saveInputs(inputs);
  };

  const textArea = (
    <textarea
      style={styles.textarea}
      onChange={handleChange}
      value={JSON.stringify(inputs, null, 2)}
    />
  );

  if (error) {
    return (
      <div>
        {textArea}
        <div>{(error as Error).message}</div>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  let designSystem;

  try {
    designSystem = computeDesignSystem(inputs);
  } catch (err) {
    setError(err);
    designSystem = '';
  }

  return (
    <div>   
      {textArea}
      <div>
        <button onClick={handleSave}>Save</button>
      </div>
      <pre>
        {JSON.stringify(designSystem, null, 2)}
      </pre>
    </div>
  )
};

// Inject app into DOM
const appContainer = document.createElement('div');
appContainer.id = 'react-app';
document.body.appendChild(appContainer);
render(<App />, appContainer);