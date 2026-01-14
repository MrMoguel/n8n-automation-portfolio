export interface Lead {
  remote_jid: string;
  last_known_name: string;
  current_status: 'New' | 'Qualifying' | 'Converted' | 'Lost' | string;
  lead_score: number;
  temperature: 'Hot' | 'Warm' | 'Cold';
  summary_text: string;
  buying_intent: string;
  suggested_action: string;
  estimated_deal_value: number;
  churn_risk: 'High' | 'Medium' | 'Low';
  last_interaction_at: string;
  sentiment_score: number;
  topics_mentioned: string[] | null;
  // New fields for Captation Dashboard
  capture_status?: 'Prospect' | 'Lead_Qualified' | 'Meeting_Booked' | 'Lost';
  meeting_scheduled?: boolean;
  estimated_contract_value?: number;
  email_captured?: boolean;
  meeting_proposed?: boolean;
  presentation_sent?: boolean;
  followup_confirmed?: boolean;
  recommended_next_step?: string;
  emotional_trajectory?: 'Improving' | 'Stable' | 'Declining';
  contact_channels?: ('email' | 'phone' | 'whatsapp')[];
}
