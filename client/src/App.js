import NavBar from "./components/NavBar";
import Startups from "./screens/startupScreen";


function App() {

  return (
      <div className="application">
        <div className="app-wrapper">
          <NavBar />
          <Startups />
        </div>
      </div>
  );
}

export default App;
