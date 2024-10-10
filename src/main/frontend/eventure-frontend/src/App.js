import {HeroComponent} from './components/HeroComponent';
import {FeaturesComponent} from "./components/FeaturesComponent";
import {EventsComponent} from "./components/EventsComponent";
import {MissionComponent} from "./components/MissionComponent";

function App() {
      return (
            <div className="App">
                <HeroComponent/>
                <FeaturesComponent/>
                <MissionComponent/>
                <EventsComponent/>
            </div>
      );
}

export default App;
