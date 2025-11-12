import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE ?? "http://localhost:5000";

export interface Reading {
  id?: number;
  timestamp: string;
  glucoseLevel: number;
  notes?: string;
}

export async function getReadings(): Promise<Reading[]> {
  const res = await axios.get(`${API_BASE}/api/readings`);
  return res.data;
}

export async function createReading(reading: Omit<Reading, "id">) {
  const res = await axios.post(`${API_BASE}/api/readings`, reading);
  return res.data;
}
