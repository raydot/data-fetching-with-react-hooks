// Show a list of Hacker News Articles

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State and update state set to an empty list of objects.
  const [data, setData] = useState({ hits: [] });

  // Use Axios to fetch data
  // This is a little different than it is in the tutorial.  When I did it
  // that way I got a very specific error message telling me to do it this way.
  useEffect(() => {
    // Run when the component mounts.
    async function fetchData() {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux'
      );
      console.log(result);
      setData(result.data);
    }
    fetchData();
  }, []); // add [] to only fetch data when the component mounts

  return (
    <ul>
      {data.hits.map((item) => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );
}

export default App;
