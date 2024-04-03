export interface IPacket {
    id: string;
    name: string;
    user_creator: string;
    description?: string;
    status: boolean;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
}