// Let's move all of this stuff into a function

import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

function CustomDataFetchHookGeneric() {
  const [query, setQuery] = useState('redux');
  const [
    { data, isLoading, isError },
    doFetch,
  ] = useDataApi(`https://hn.algolia.com/api/v1/search?query=redux`, {
    hits: [],
  });

  return (
    <Fragment>
      <form
        onSubmit={(event) => {
          doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);

          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {/**
       * The error state is reset every time the hook runs again.
       * That's useful because after  failed request the user may want to try
       * it again which should reset the error.
       */}
      {isError && <div>Something went wrong!</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default CustomDataFetchHookGeneric;

const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios(url);

        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return [{ data, isLoading, isError }, setUrl];
};
