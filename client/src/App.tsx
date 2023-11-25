import "./App.css";
import { useGetProgressByWeekQuery } from './services/progress'
import Spreadsheet from "./components/spreasheet";

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
          <p>Days: { data.days.map( (day:string) => day ) }</p>
          <Spreadsheet />
        { console.log({data}) }
        </>
      ) : null}
    </>
  );
}

export default App;
