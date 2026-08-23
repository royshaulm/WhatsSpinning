/** Future backend boundary (Supabase/Lovable). Keep UI code independent of provider-specific APIs. */
export interface BackendService {
  isConfigured(): boolean;
}
export const backend: BackendService = { isConfigured: () => false };
