import { useState, useEffect } from 'react';
import './App.css';

const fetchColors = async () => {
  try {
    const response = await fetch('http://localhost:3001/api/colors');
    const json = await response.json();

    return json.colors;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function App() {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    const runEffect = async () => {
      const colors = await fetchColors();

      setColors(colors);
    };

    runEffect();
  }, []);

  return (
    <div
      className={'colored_box_container'}
    >
      {
        colors.map(({ color, id }) => {
          return (
            <div
              key={id}
              className={'colored_box'}
              style={{
                backgroundColor: color,
              }}
              onClick={() => {
                const filteredColors = colors.filter(({ id: curId }) => {
                  return id !== curId;
                });

                setColors(filteredColors);
              }}
            >
              {color}
            </div>
          );
        })
      }
    </div>
  );
}

export default App;
