import { createContext, useState } from "react";

export const StudentContext = createContext(null);
export default function StudentProvider({ children }) {
  const [studentViewCoursesList, setStudentViewCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentViewCourseDetails, setStudentViewCourseDetails] =
    useState(null);
  const [currentCourseDetailsID, setCurrentCourseDetailsID] = useState(null);
  return (
    <StudentContext.Provider
      value={{
        studentViewCoursesList,
        setStudentViewCoursesList,
        loading,
        setLoading,
        studentViewCourseDetails,
        setStudentViewCourseDetails,
        currentCourseDetailsID,
        setCurrentCourseDetailsID,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}
