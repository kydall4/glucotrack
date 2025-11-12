import { useEffect, useState } from "react";
import { getReadings, Reading } from "./api/readings";
import ReadingForm from "./components/ReadingForm";
import ReadingTable from "./components/ReadingTable";
import TrendChart from "./components/TrendChart";
import "./App.css";

function App() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(false);

  const loadReadings = async () => {
    setLoading(true);
    try {
      const data = await getReadings();
      setReadings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReadings();
  }, []);

  return (
    <div className="app">
      <header>
        <h1>GlucoTrack</h1>
        <p>Simple glucose tracking demo for Tandem Diabetes Care</p>
      </header>

      <main>
        <div className="grid-layout">
          {/* Left Column */}
          <div className="card table-card">
            
            <ReadingTable readings={readings} />
          </div>

          {/* Right Column */}
          <div className="right-cards">
            <div className="card">
              
              <TrendChart readings={readings} />
            </div>
            <div className="card">
              <ReadingForm onCreated={loadReadings} />
            </div>
          </div>
        </div>

        {loading && <p className="loading">Loading...</p>}
      </main>
    </div>
  );
}

export default App;
