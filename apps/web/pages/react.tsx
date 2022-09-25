import { useState } from 'react';
import { ErrorBoundaryWithLogger } from '@dz-web/police-react';

function Bomb() {
  // throw new Error('💥 CABOOM 💥')
  return <div>{arguments.x.c}</div>
}

console.log(ErrorBoundaryWithLogger, '<-- a()');
export default function ReactPage() {
  const [data, setData] = useState();
  return (
    <ErrorBoundaryWithLogger>
      <div>
        <h1>Web33</h1>

        {/* <div onClick={(d) => setData(d.a = 1)}>boom</div> */}
        <Bomb />
      </div>
    </ErrorBoundaryWithLogger>
  );
}
