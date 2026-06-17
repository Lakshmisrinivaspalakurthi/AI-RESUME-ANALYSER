"use client";

import { useState } from "react";

// Define the structure of our AI response data
interface AnalysisResult {
  atsScore: number;
  skillMatch: number;
  missingSkills: string[];
  aiRecommendations: string[];
}

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      alert("Please upload a resume and paste a job description.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      // Connects to your FastAPI backend route
      const response = await fetch("https://ai-resume-analyser-nza0.onrender.com/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong while analyzing.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalyzer = () => {
    setResult(null);
    setResume(null);
    setJobDescription("");
    setError(null);
  };

  // ==========================================
  // VIEW 1: LOADING STATE
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <h2 className="text-2xl font-bold tracking-wide animate-pulse">Analyzing Your Resume...</h2>
        <p className="text-slate-400 mt-2 text-sm">Gemini is matching your profile against the job description.</p>
      </div>
    );
  }

  // ==========================================
  // VIEW 2: FULL PAGE RESULTS STATE
  // ==========================================
  if (result) {
    return (
      <div className="min-h-screen bg-slate-950 text-white p-8 md:p-16">
        <div className="max-w-5xl mx-auto">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-800 pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                Analysis Report
              </h1>
              <p className="text-slate-400 mt-1">Live AI Evaluation Complete</p>
            </div>
            <button
              onClick={resetAnalyzer}
              className="bg-slate-800 hover:bg-slate-700 text-sm font-semibold py-2.5 px-5 rounded-lg transition-colors border border-slate-700"
            >
              ← Analyze Another Resume
            </button>
          </div>

          {error && (
            <div className="bg-red-950/50 border border-red-500 text-red-200 p-4 rounded-xl mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Scores Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Overall ATS Score</span>
              <div className="text-6xl font-black text-indigo-400">{result.atsScore}%</div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${result.atsScore}%` }}></div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center justify-center text-center">
              <span className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">Keyword & Skill Match</span>
              <div className="text-6xl font-black text-cyan-400">{result.skillMatch}%</div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${result.skillMatch}%` }}></div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown Panels */}
          <div className="grid grid-cols-1 gap-8">
            {/* Missing Skills Section */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center text-amber-400">
                ⚠️ Key Missing Skills
              </h3>
              {result.missingSkills?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, index) => (
                    <span key={index} className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">No major missing skills detected! Excellent match.</p>
              )}
            </div>

            {/* AI Action Steps Section */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center text-emerald-400">
                💡 Targeted AI Recommendations
              </h3>
              <ul className="space-y-3">
                {result.aiRecommendations?.map((rec, index) => (
                  <li key={index} className="flex items-start text-sm text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-850">
                    <span className="text-emerald-500 mr-3 font-bold mt-0.5">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 3: INITIAL INPUT STATE (CLEAN & SHORT)
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-center items-center p-6 md:p-12">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            AI Resume Analyzer
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Optimize your resume against target jobs instantly using Gemini 2.5
          </p>
        </div>

        <form onSubmit={handleAnalyze} className="space-y-6">
          {/* Job Description Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Target Job Description
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the entire job requirements text here..."
              rows={5}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm focus:outline-none focus:border-indigo-500 transition-colors text-slate-200 placeholder-slate-600 resize-none"
            />
          </div>

          {/* File Upload Field */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Upload Resume (PDF format)
            </label>
            <div className="relative border-2 border-dashed border-slate-800 hover:border-slate-700 bg-slate-950 rounded-xl p-6 transition-colors text-center group cursor-pointer">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="space-y-1 pointer-events-none">
                <p className="text-sm font-medium text-slate-300">
                  {resume ? `✅ Selected: ${resume.name}` : "Click to select or drag PDF file"}
                </p>
                {!resume && <p className="text-xs text-slate-500">Only standard PDF documents supported</p>}
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg text-sm tracking-wide"
          >
            Analyze Resume →
          </button>
        </form>
      </div>
    </div>
  );
}
