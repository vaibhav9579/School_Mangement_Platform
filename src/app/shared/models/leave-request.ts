export interface LeaveRequest {
  request_id: number;
  user_id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  status: string;
}