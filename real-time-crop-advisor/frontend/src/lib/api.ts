export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function createSession() {
  const res = await fetch(`${API_BASE_URL}/advisor/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Failed to create session');
  return res.json();
}

export async function getNextQuestion(sessionId: string) {
  const res = await fetch(`${API_BASE_URL}/advisor/session/${sessionId}/next-question`);
  if (!res.ok) throw new Error('Failed to get next question');
  return res.json();
}

export async function submitAnswer(sessionId: string, questionId: string, value: any) {
  const res = await fetch(`${API_BASE_URL}/advisor/session/${sessionId}/answer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question_id: questionId, value }),
  });
  if (!res.ok) throw new Error('Failed to submit answer');
  return res.json();
}

export async function getRecommendations(sessionId: string) {
  const res = await fetch(`${API_BASE_URL}/advisor/session/${sessionId}/recommendations`);
  if (!res.ok) throw new Error('Failed to get recommendations');
  return res.json();
}
