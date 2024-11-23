import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vjgjkhrspkfwgoakdqpr.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqZ2praHJzcGtmd2dvYWtkcXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIyOTIyMjYsImV4cCI6MjA0Nzg2ODIyNn0.i2v0QvuyDNV9q8GalDnDmOqp3FTrFmn3izm6MP7XARI';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
