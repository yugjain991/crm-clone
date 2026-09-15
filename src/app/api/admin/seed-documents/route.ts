import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { brainDocuments } from "../../../../lib/demo-documents";

export const dynamic = "force-dynamic";

/**
 * POST /api/admin/seed-documents
 * Force-resets the Supabase documents store with the latest seed data from code.
 */
export async function POST() {
  try {
    const employees = brainDocuments.filter(d => d.type === 'employee');
    const projects = brainDocuments.filter(d => d.type === 'project');
    const leads = brainDocuments.filter(d => d.type === 'lead');
    const subscriptions = brainDocuments.filter(d => d.type === 'subscription');

    const { error } = await supabase
      .from('app_data')
      .upsert({ key: 'documents', data: brainDocuments });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      counts: {
        total: brainDocuments.length,
        employees: employees.length,
        projects: projects.length,
        leads: leads.length,
        subscriptions: subscriptions.length,
      }
    });
  } catch (error: any) {
    console.error("Failed to seed documents:", error);
    return NextResponse.json({ error: error?.message || "Failed to seed" }, { status: 500 });
  }
}
