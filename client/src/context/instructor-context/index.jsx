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
  const [mediaUploadProgress, setMediaProgress] = useState(false);
  const [mediauploadProgressPercentage, setMediauploadProgressPercentage] =
    useState(0);

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setcourseLandingFormData,
        courseCurriculumFormdata,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaProgress,
        mediauploadProgressPercentage,
        setMediauploadProgressPercentage,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
