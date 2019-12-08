import * as React from "react";

export default () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount(x => x + 1)}>
        Increment
      </button>
    </>
  );
};
