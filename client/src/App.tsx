import "./App.css";
import { useGetProgressByWeekQuery } from './services/progress'

function App() {

  const { data, error, isLoading } = useGetProgressByWeekQuery({
    week:'01',
    day: '02'
  });

  return (
    <>
      <h1>KipTrak Client</h1>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <p>Week: { data.week }</p>
          {/* @ts-expect-error: come on! */}
          <p>Days: { data.days.map( (day) => day ) }</p>
        { console.log(data.data) }
        </>
      ) : null}
    </>
  );
}

export default App;
