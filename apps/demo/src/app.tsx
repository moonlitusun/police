import { logger } from './logger';

const App = () => {
  const log = (label: string) => {
    logger.info({ reqParams: { a: 1, b: 2 }, res: { c: 3, d: 4 }, label, timestamp: new Date().toISOString() });
  };

  return (
    <div className="text-3xl font-bold">
      <button type="button" onClick={() => log('test')} className="m-2 rounded-md bg-blue-500 p-2 text-white">
        test
      </button>
      <button type="button" onClick={() => log('test1')} className="m-2 rounded-md bg-blue-500 p-2 text-white">
        test1
      </button>
      <button type="button" onClick={() => log('test2')} className="rounded-md bg-blue-500 p-2 text-white">
        test2
      </button>
    </div>
  );
};

export default App;
