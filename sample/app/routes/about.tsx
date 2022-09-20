import { useState } from 'react';

const About = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>The about page</h1>
      <p>You clicked {count} times</p>
      <button className="btn btn-sm" onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export default About;
