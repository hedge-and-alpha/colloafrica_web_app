// Define the structure for the notification data
export interface SwapRequestNotificationData {
  swap_request_id: string;
  message: string;
  title: string;
}

// Define the main interface for the notification
export interface INotificationData {
  id: string;
  type: string;
  notifiable_type: string;
  notifiable_id: number;
  data: SwapRequestNotificationData;
  read_at: string | null;
}
