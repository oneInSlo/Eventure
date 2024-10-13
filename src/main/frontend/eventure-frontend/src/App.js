import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeroComponent } from './components/HeroComponent';
import { FeaturesComponent } from './components/FeaturesComponent';
import { EventsComponent } from './components/EventsComponent';
import { MissionComponent } from './components/MissionComponent';
import { EventDetailsPage } from './pages/EventDetailsPage';

function App() {
    return (
        <Router>
            <Routes>
                {/* homepage */}
                <Route
                    path="/"
                    element={
                        <>
                            <HeroComponent />
                            <FeaturesComponent />
                            <MissionComponent />
                            <EventsComponent />
                        </>
                    }
                />

                {/* event details page */}
                <Route path="/events/:id" element={<EventDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
