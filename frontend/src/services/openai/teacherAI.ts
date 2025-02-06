import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/firebase';

interface AIResponse {
  result: string;
}

export const generateLessonPlan = async (prompt: string): Promise<AIResponse> => {
  try {
    const generateLessonPlanFn = httpsCallable<{ prompt: string }, AIResponse>(
      functions, 
      'generateLessonPlan'
    );
    const response = await generateLessonPlanFn({ prompt });
    return response.data;
  } catch (error) {
    console.error('AI API Error:', error);
    throw new Error('Failed to generate lesson plan');
  }
};
