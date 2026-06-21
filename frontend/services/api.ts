// frontend/services/api.ts

export interface AnalysisResponse {
  atsScore: number;
  skillMatch: number;
  missingSkills: string[];
  aiRecommendations: string[];
}

export const analyzeResume = async (
  file: File,
  jobDescription: string
): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobDescription", jobDescription);

  try {
    const response = await fetch("http://0.0.0.0:10000", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw error;
  }
};
