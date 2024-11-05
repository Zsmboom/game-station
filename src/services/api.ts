const API_URL = import.meta.env.VITE_API_URL;

export async function saveCircle(imageData: string, score: number): Promise<string> {
  const id = Math.random().toString(36).substring(2, 15);
  
  const response = await fetch(`${API_URL}/api/circles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      image: imageData,
      score,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to save circle');
  }

  const data = await response.json();
  return data.id;
}

export async function getCircle(id: string): Promise<{
  image: string;
  score: number;
  created_at: string;
}> {
  const response = await fetch(`${API_URL}/api/circles/${id}`);
  
  if (!response.ok) {
    throw new Error('Failed to retrieve circle');
  }

  return response.json();
}