import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Student {
  id: string;
  name: string;
  birthday: string; // Format: "MM-DD"
  type: "student" | "staff" | "admin";
}

interface StudentContextType {
  students: Student[];
  getTodaysBirthdays: () => Student[];
}

const initialStudents: Student[] = [
  { id: "1", name: "Priya Sharma", birthday: new Date().toISOString().slice(5, 10), type: "student" },
  { id: "2", name: "Rahul Kumar", birthday: new Date().toISOString().slice(5, 10), type: "student" },
  { id: "3", name: "Anita Verma", birthday: "03-15", type: "staff" },
  { id: "4", name: "Vikash Singh", birthday: new Date().toISOString().slice(5, 10), type: "admin" },
  { id: "5", name: "Sneha Patel", birthday: "07-22", type: "student" },
  { id: "6", name: "Amit Joshi", birthday: "09-10", type: "staff" },
];

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [students] = useState<Student[]>(initialStudents);

  const getTodaysBirthdays = () => {
    const today = new Date().toISOString().slice(5, 10);
    return students.filter((s) => s.birthday === today);
  };

  return (
    <StudentContext.Provider value={{ students, getTodaysBirthdays }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
};
