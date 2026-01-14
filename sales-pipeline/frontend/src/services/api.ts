import { Lead } from '../types/lead';

export const fetchLeads = async (): Promise<Lead[]> => {
    try {
        console.log("Fetching leads from webhook...");
        const response = await fetch('https://n8n.losprismas.com/webhook/dashboard');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Raw webhook response:", data);

        // Handle different possible response structures
        if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data.leads)) {
            return data.leads;
        } else if (data && Array.isArray(data.data)) {
            return data.data;
        } else if (typeof data === 'object' && data !== null) {
            // Try to find any array property that looks like leads
            const values = Object.values(data);
            const potentialArray = values.find(v => Array.isArray(v));
            if (potentialArray) {
                return potentialArray as Lead[];
            }
        }

        console.warn("Unexpected data structure:", data);
        return [];
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        return [];
    }
};

export const fetchChatHistory = async (remoteJid: string): Promise<any[]> => {
    try {
        const response = await fetch('https://n8n.losprismas.com/webhook/dashboard-chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ remote_jid: remoteJid })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Failed to fetch chat history:", error);
        return [];
    }
};
