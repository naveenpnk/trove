'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { RegisterFormData } from '@/types/formData'


export async function register(formData: RegisterFormData) {
  const supabase = await createClient()
  
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email as string,
    password: formData.password as string,
  }
  
  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/auth/not-found')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}