const API_URL =
  "http://localhost:8000";

export async function analyzeResume(
  formData: FormData
) {

  const response =
    await fetch(
      `${API_URL}/analyze`,
      {
        method: "POST",
        body: formData
      }
    );

  return response.json();
}
