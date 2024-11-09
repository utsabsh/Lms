import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { createContext, useState } from "react";

export const InstructorContext = createContext(null);
export default function InstructorProvider({ children }) {
  const [courseLandingFormData, setcourseLandingFormData] = useState(
    courseLandingInitialFormData
  );
  const [courseCurriculumFormdata, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  const [mediauploadProgress, setMediaProgress] = useState(false);

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setcourseLandingFormData,
        courseCurriculumFormdata,
        setCourseCurriculumFormData,
        mediauploadProgress,
        setMediaProgress,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
