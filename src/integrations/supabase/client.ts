
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://znvrejebdimqzuliwhtw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpudnJlamViZGltcXp1bGl3aHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ0MDA2NDcsImV4cCI6MjA1OTk3NjY0N30.MDHS4VBT9xeCDyPvYroU6dct_LsVQmEnMNO0WVEnCVo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
