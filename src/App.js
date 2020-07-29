// Show a list of Hacker News Articles

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  // State and update state set to an empty list of objects.
  const [data, setData] = useState({ hits: [] });

  // Use Axios to fetch data
  // This is a little different than it is in the tutorial.  When I did it
  // that way I got a very specific error message telling me to do it
  // this way.  See "ERRORMSG.md" for details.
  // useEffect(() => {
  //   // Run when the component mounts.
  //   async function fetchData() {
  //     const result = await axios(
  //
  //     );
  //     //console.log(result);
  //     setData(result.data);
  //   }
  //   fetchData();
  // }, []); // add [] to only fetch data when the component mounts

  /**
   * [] is important.  It's where to put data that needs to be watched
   * by useEffect.  Here's it's empty, so the effect runs once.  But there
   * might be specific variables to watch that can be included here.
   */

  // The modification suggested by Wieruch:
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://hn.algolia.com/api/v1/search?query=redux'
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  // use hits from the useState hook to render the data:
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
