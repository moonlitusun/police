import { logger } from './index.entry';

const App = () => {
  return (
    <div className="text-3xl font-bold">
      <button onClick={() => logger.infoImmediately({ reqParams: { a: 1, b: 2 }, res: { c: 3, d: 4 } })}>test</button>
    </div>
  );
};

export default App;
