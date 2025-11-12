import { FormEvent, useState } from "react";
import { createReading } from "../api/readings";

interface Props {
  onCreated: () => void;
}

export default function ReadingForm({ onCreated }: Props) {
  const [glucoseLevel, setGlucoseLevel] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!glucoseLevel) return;

    await createReading({
      glucoseLevel: Number(glucoseLevel),
      notes,
      timestamp: new Date().toISOString(),
    });

    setGlucoseLevel("");
    setNotes("");
    onCreated();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Reading</h2>
      <label>
        Glucose Level
        <input
          type="number"
          value={glucoseLevel}
          onChange={(e) => setGlucoseLevel(e.target.value)}
          required
        />
      </label>
      <label>
        Notes
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button
        type="button"
        onClick={async () => {
          const randomLevel = 80 + Math.floor(Math.random() * 80);
          await createReading({
            glucoseLevel: randomLevel,
            timestamp: new Date().toISOString(),
            notes: "Auto-generated demo reading"
          });
          onCreated();
        }}
      >
        + Add Random Reading
      </button>
    </form>
  );
}
