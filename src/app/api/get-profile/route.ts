import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase/client';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const idParam = url.searchParams.get('id');
  
  let query = supabase.from('student-profiles')
    .select('*'); // Select all fields instead of just ID
    
  // If ID parameter is provided, filter by it
  if (idParam) {
    query = query.eq('NatId', idParam);
  }
  
  const { data: studentProfiles, error } = await query;
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ studentProfiles });
}
