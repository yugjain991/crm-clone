// Simpler approach: just import the data and push via Supabase client
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE env vars. Check .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  // Dynamically import the brainDocuments
  // Since demo-documents.ts uses ES imports, we need to use the compiled version
  // Instead, we'll hit the local Next.js API to get the current seed data and push it
  
  console.log('Fetching current seed documents from local server...');
  
  try {
    // Get the seed data by importing it directly via tsx
    const res = await fetch('http://localhost:3000/api/documents');
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    
    // We don't want the OLD Supabase data, we want the NEW seed data
    // So let's build it ourselves from the source files
    console.log('Current Supabase data retrieved. Now replacing with fresh seed data...');
  } catch(e) {
    console.log('Note: Could not reach local server, proceeding with direct Supabase update.');
  }

  // Read the brainDocuments from the compiled source
  // We'll use eval approach with the transpiled code
  console.log('Pushing seed data to Supabase via API...');
  
  // Just call the local API to force-reset
  const resetRes = await fetch('http://localhost:3000/api/seed-documents', { method: 'POST' });
  if (resetRes.ok) {
    console.log('✅ Done!');
  } else {
    console.error('Failed:', await resetRes.text());
  }
}

seed();
