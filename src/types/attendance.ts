export type Attendance = {
  client_id: number;
  class_id: number;
  first_name: string;
  last_name: string;
  attended_at: string;
};

export type CreateManualAttendance = {
  client_id: number;
  date: string;
  time: string;
};
