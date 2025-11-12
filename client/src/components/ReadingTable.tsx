import { Reading } from "../api/readings";

interface Props {
  readings: Reading[];
}

export default function ReadingTable({ readings }: Props) {
  return (
    <div>
      <h2>Recent Readings</h2>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Glucose</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {readings.map((r) => (
            <tr key={r.id ?? r.timestamp}>
              <td>{new Date(r.timestamp).toLocaleString()}</td>
              <td>{r.glucoseLevel}</td>
              <td>{r.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
