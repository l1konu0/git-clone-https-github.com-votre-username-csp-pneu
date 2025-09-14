export declare const supabase: import("@supabase/supabase-js").SupabaseClient<any, "public", "public", any, any>;
export interface Pneu {
    id: number;
    marque: string;
    modele: string;
    dimensions: string;
    type: 'été' | 'hiver' | '4saisons';
    prix: number;
    stock: number;
    description: string;
    image_url?: string;
    created_at: string;
    updated_at: string;
}
export interface Commande {
    id: number;
    nom: string;
    email: string;
    telephone?: string;
    adresse?: string;
    total: number;
    statut: 'en_attente' | 'confirmee' | 'en_cours' | 'livree' | 'annulee';
    created_at: string;
    updated_at: string;
}
export interface CommandeDetail {
    id: number;
    commande_id: number;
    pneu_id: number;
    quantite: number;
    prix_unitaire: number;
}
export interface Message {
    id: number;
    nom: string;
    email: string;
    telephone?: string;
    sujet?: string;
    message: string;
    lu: boolean;
    created_at: string;
}
export interface Admin {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    created_at: string;
}
//# sourceMappingURL=supabase.d.ts.map