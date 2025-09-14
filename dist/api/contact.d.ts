interface ContactData {
    nom: string;
    email: string;
    telephone?: string;
    message: string;
    pneuId?: number | null;
}
interface VercelRequest {
    method: string;
    body: ContactData;
}
interface VercelResponse {
    status: (code: number) => VercelResponse;
    json: (data: any) => void;
    setHeader: (name: string, value: string) => void;
    end: () => void;
}
export default function handler(req: VercelRequest, res: VercelResponse): Promise<void>;
export {};
//# sourceMappingURL=contact.d.ts.map