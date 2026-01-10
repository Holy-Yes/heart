import { create } from 'zustand'
import axios from 'axios'

const API_URL = 'http://localhost:8000/predict'

export const useStore = create((set, get) => ({
  // 8 INPUT SLIDERS (exact Colab order)
  age: 39,
  bp: 142,
  cholesterol: 165,
  max_hr: 110,
  st_depression: 3.8,
  vessels: 1,
  thallium: 3,
  exercise_angina: 0,
  
  // 6 ML OUTPUTS (your screenshot)
  artery_narrowing: 0,
  wall_thickness: 0,
  ischemia_level: 0,
  stress_response: 0,
  elasticity: 0,
  overall_risk: 0,
  
  // Heart 3D visuals
  heart_rate: 72,
  contractility: 1.0,
  dilation: 0,
  arrhythmia: 0,
  ischemia: 0,
  risk_score: 0,

  // 8 INPUT SETTERS
  setAge: (value) => set({ age: value }),
  setBP: (value) => set({ bp: value }),
  setCholesterol: (value) => set({ cholesterol: value }),
  setMaxHR: (value) => set({ max_hr: value }),
  setSTDepression: (value) => set({ st_depression: value }),
  setVessels: (value) => set({ vessels: value }),
  setThallium: (value) => set({ thallium: value }),
  setExerciseAngina: (value) => set({ exercise_angina: value }),

  // ML PREDICTION (calls your Colab model)
  predictRisk: async () => {
    const state = get()
    console.log('🔄 Predicting with:', { age: state.age, bp: state.bp })
    
    try {
      const response = await axios.post(API_URL, {
        age: state.age,
        bp: state.bp,
        cholesterol: state.cholesterol,
        max_hr: state.max_hr,
        st_depression: state.st_depression,
        vessels: state.vessels,
        thallium: state.thallium,
        exercise_angina: state.exercise_angina
      })
      
      console.log('✅ ML Results:', response.data)
      set(response.data)
    } catch (error) {
      console.error('❌ ML API Error - Using simulation:', error.message)
      
      // SIMULATED ML (same as your Colab screenshot values)
      const artery_narrowing = Math.min(0.95, state.age / 100 + state.bp / 300)
      const ischemia_level = Math.min(0.8, state.st_depression / 10 + state.vessels / 8)
      const overall_risk = Math.min(0.95, artery_narrowing * 0.65 + ischemia_level * 0.35)
      
      set({
        artery_narrowing,
        wall_thickness: 0.733,
        ischemia_level,
        stress_response: 0.5,
        elasticity: 0.55,
        overall_risk,
        heart_rate: 85 + overall_risk * 40,
        contractility: 1.2 - 0.733 * 0.6,
        dilation: artery_narrowing * 0.8,
        arrhythmia: ischemia_level * 0.7,
        ischemia: ischemia_level,
        risk_score: overall_risk
      })
    }
  }
}))
