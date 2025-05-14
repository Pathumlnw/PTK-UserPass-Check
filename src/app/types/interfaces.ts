// Define the type for our student profile data
export interface StudentProfile {
  [key: string]: string | number | boolean | null;
}

export interface SearchFormProps {
  nationalID: string;
  loading: boolean;
  setNationalID: (value: string) => void;
  handleSubmit: () => void;
  clearForm: () => void;
}

export interface StudentProfileProps {
  studentProfiles: StudentProfile[];
  formatFieldName: (key: string) => string;
}

export interface ErrorMessageProps {
  error: string;
}

export interface AnalyticsSectionProps {
  totalStudents: number;
  maleStudents: number;
  femaleStudents: number;
}

export interface InstructionsSectionProps {
  // Can add props if needed in the future
}

export interface FooterProps {
  currentYear: number;
}