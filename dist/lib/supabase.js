"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
// Configuration Supabase pour CSP Pneu
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey);
//# sourceMappingURL=supabase.js.map