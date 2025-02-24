export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  lessons: number;
  progress: number;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: string;
  completed: boolean;
}

export interface User {
  name: string;
  email: string;
  progress: Record<string, number>;
}