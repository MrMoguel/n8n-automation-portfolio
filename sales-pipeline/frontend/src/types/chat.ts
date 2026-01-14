export interface ChatMessage {
    id: string;
    remote_jid: string;
    role: 'ai' | 'user';
    content: string;
    message_id: string;
    sender_name?: string;
    created_at: string;
    raw_data?: any;
    processed_for_analytics?: boolean;
}
