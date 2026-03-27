import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hsdjqguceixxdgjovlsk.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZGpxZ3VjZWl4eGRnam92bHNrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2ODk5NjMsImV4cCI6MjA4OTI2NTk2M30.BmL-ypQfCz0zNGGAqq-vC3cDl8WgA_2K3mVR5ImqWUQ'
)
