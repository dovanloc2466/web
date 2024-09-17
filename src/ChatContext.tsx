import React, { createContext, useContext, useState } from 'react';



export interface Message {
    id: number;
    username: string;
    contact_value: string;
    e164_contact_value: string;
    contact_type: number;
    contact_name: string;
    message_direction: number;
    message_type: number;
    message: string;
    read: boolean;
    date: string;
    deleted: boolean;
}

export interface ClientData {
    messages: Message[];
    clientId: string;
    status: string;
    userName: string;
    myPhoneNum: string;
}


export interface ChatContextType {
    clients: ClientData[]
    setClients: React.Dispatch<React.SetStateAction<ClientData[]>>;
}

export interface Message {
    id: number;
    username: string;
    contact_value: string;
    e164_contact_value: string;
    contact_type: number;
    contact_name: string;
    message_direction: number;
    message_type: number;
    message: string;
    read: boolean;
    date: string;
    deleted: boolean;
}


const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [clients, setClients] = useState<ClientData[]>([]);

    return (
        <ChatContext.Provider value={{ clients, setClients }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }
    return context;
};
