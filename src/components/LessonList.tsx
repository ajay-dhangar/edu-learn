import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Lesson } from '../types';

interface LessonListProps {
  lessons: Lesson[];
  onLessonClick: (lesson: Lesson) => void;
}

export const LessonList: React.FC<LessonListProps> = ({ lessons, onLessonClick }) => {
  return (
    <div className="space-y-4">
      {lessons.map((lesson) => (
        <div
          key={lesson.id}
          className="flex items-center p-4 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
          onClick={() => onLessonClick(lesson)}
        >
          {lesson.completed ? (
            <CheckCircle className="w-6 h-6 text-green-500 mr-4" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 mr-4" />
          )}
          <div className="flex-1">
            <h4 className="font-medium">{lesson.title}</h4>
            <p className="text-sm text-gray-500">{lesson.content}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span>{lesson.duration}</span>
          </div>
        </div>
      ))}
    </div>
  );
};