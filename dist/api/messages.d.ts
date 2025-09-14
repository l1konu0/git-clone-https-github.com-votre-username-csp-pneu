interface VercelRequest {
    method: string;
    body: any;
    query: any;
}
interface VercelResponse {
    status: (code: number) => VercelResponse;
    json: (data: any) => void;
    setHeader: (name: string, value: string) => void;
    end: () => void;
}
export default function handler(req: VercelRequest, res: VercelResponse): Promise<void>;
export {};
//# sourceMappingURL=messages.d.ts.map