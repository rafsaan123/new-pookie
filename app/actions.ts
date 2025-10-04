'use server';

import { PookieApiService } from '../services/pookieApiService';
import { redirect } from 'next/navigation';

export async function searchResult(formData: FormData) {
  const studentId = formData.get('studentId') as string;
  const regulation = formData.get('regulation') as string || '2022';
  const program = formData.get('program') as string || 'Diploma in Engineering';

  if (!studentId) {
    return { error: 'Student ID is required' };
  }

  try {
    const result = await PookieApiService.searchStudentResult(studentId, regulation, program);

    if (result.error) {
      return { error: result.error };
    }

    // Store result in session or pass as URL params
    const params = new URLSearchParams({
      success: 'true',
      data: JSON.stringify(result.data)
    });

    redirect(`/?${params.toString()}`);
  } catch (error: any) {
    return { error: error.message || 'Failed to fetch result' };
  }
}
