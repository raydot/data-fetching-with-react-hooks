This error was returned on the original structure of my useEffect() block, which looked like this:

```
  useEffect(async () => {
    const result = await axios(
      'https://hn.algolia.com/api/v1/search?query=redux',
    );

    setData(result.data);
  });
```

The error message read:

"Effect callbacks are synchronous to prevent race conditions. Put the async function inside:

```
useEffect(() => {
    async function fetchData() {
        // You can await here
        const response = await MyAPI.getData(someId);
        // ...
    }
    fetchData();
}, [someId]); // Or [] if effect doesn't need props or state
```

Learn more about data fetching with Hooks: [https://fb.me/react-hooks-data-fetching](https://fb.me/react-hooks-data-fetching) react-hooks/exhaustive-deps"
