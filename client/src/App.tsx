import "./App.css";
import {
  useGetProgressByWeekQuery,
  usePostWeeklyProgressMutation,
} from "./services/progress";
import Spreadsheet from "./components/spreasheet";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  // WiP: C[R]UD
  const { data, error, isLoading } = useGetProgressByWeekQuery({
    week: "01",
    day: "02",
  });

  // WiP: [C]RUD
  const [addWeek] = usePostWeeklyProgressMutation();
  const postData = {
    week: "01",
    day: "01",
    data: [
      {
        week: 1,
        day: 1,
        concept: "Setting up: Markdown",
        task: "Watch the 'What is markdown?' video",
        level: "Beginner",
        confidence: 7,
        completed: true,
        instructions:
          "Update CONFIDENCE column. Change COMPLETED column to TRUE ",
      },
      {
        week: 1,
        day: 1,
        concept: "Setting up: CSV",
        task: "Complete the 'Understanding CSV Files' challenge",
        level: "Beginner",
        confidence: 8,
        completed: true,
        instructions:
          "Update CONFIDENCE column. Change COMPLETED column to TRUE ",
      },
    ],
  };
  const handleAddWeek = async () => {
    try {
      const response = await addWeek(postData).unwrap();
      console.log({ response });
    } catch (e) {
      console.error("handleAddWeek()", e);
    }
  };

  return (
    <>
      <Header />
      <button
        className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow"
        onClick={handleAddWeek}
      >
        Post week
      </button>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <p>Week: {data.week}</p>
          <p>Days: {data.days.map((day: string) => day)}</p>
          <Spreadsheet />
          {console.log({ data })}
        </>
      ) : null}
      <Footer />
    </>
  );
}

export default App;
