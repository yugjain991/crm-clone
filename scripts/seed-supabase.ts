// Script to push the new seed data to Supabase
// Run: npx tsx scripts/seed-supabase.ts

import { createClient } from '@supabase/supabase-js';
import { brainDocuments } from '../src/lib/demo-documents';
import * as fs from 'fs';
import * as path from 'path';

// Load .env.local if present
try {
  const envPath = path.resolve(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/(^["']|["']$)/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
} catch (e) {}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing SUPABASE env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log(`Seeding ${brainDocuments.length} documents to Supabase...`);
  
  const employees = brainDocuments.filter(d => d.type === 'employee');
  const projects = brainDocuments.filter(d => d.type === 'project');
  const leads = brainDocuments.filter(d => d.type === 'lead');
  const subscriptions = brainDocuments.filter(d => d.type === 'subscription');
  const others = brainDocuments.filter(d => !['employee','project','lead','subscription'].includes(d.type));
  
  console.log(`  Employees: ${employees.length}`);
  console.log(`  Projects: ${projects.length}`);
  console.log(`  Leads: ${leads.length}`);
  console.log(`  Subscriptions: ${subscriptions.length}`);
  console.log(`  Other: ${others.length}`);

  const { error } = await supabase
    .from('app_data')
    .upsert({ key: 'documents', data: brainDocuments });

  if (error) {
    console.error('Failed to upsert documents:', error);
    process.exit(1);
  }

  console.log('✅ Successfully seeded all documents to Supabase!');
}

seed();
