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
  const [courseCurriculumFormData, setCourseCurriculumFormData] = useState(
    courseCurriculumInitialFormData
  );
  const [mediaUploadProgress, setMediaProgress] = useState(false);
  const [mediauploadProgressPercentage, setMediauploadProgressPercentage] =
    useState(0);
  const [instructorCoursesList, setInstructorCoursesList] = useState([]);

  return (
    <InstructorContext.Provider
      value={{
        courseLandingFormData,
        setcourseLandingFormData,
        courseCurriculumFormData,
        setCourseCurriculumFormData,
        mediaUploadProgress,
        setMediaProgress,
        mediauploadProgressPercentage,
        setMediauploadProgressPercentage,
        instructorCoursesList,
        setInstructorCoursesList,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
}
