'use server'

import { createClient } from "@/lib/supabase/server";
import { UpdatePasswordFormData } from "@/types/formData";
import { redirect } from "next/navigation";

export async function updatePassword(formData: UpdatePasswordFormData) {

  const supabase = await createClient();

  const newPassword = formData.password as string;

  const { data, error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    console.log(error);
  } else {
    // if there is no error, send user back to login page.
    console.log(data.user.aud);
    redirect('/auth/login')
  }

}