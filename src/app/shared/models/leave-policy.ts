export interface LeavePolicy {
  policy_id: number;
  role_id: number;
  role_name?: string;
  leave_type: string;
  allowed_days: number;
}