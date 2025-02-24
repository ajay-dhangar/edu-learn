import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { Hero } from './components/Hero';
import { LearningRoadmap } from './components/LearningRoadmap';
import { CourseCard } from './components/CourseCard';
import { LessonList } from './components/LessonList';
import { Quiz } from './components/Quiz';
import { AuthModal } from './components/AuthModal';
import { Course, Lesson } from './types';
import { courses, lessons } from './data/mockData';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const { user } = useAuth();

  React.useEffect(() => {
    const handleOpenAuth = () => setShowAuthModal(true);
    window.addEventListener('open-auth-modal', handleOpenAuth);
    return () => window.removeEventListener('open-auth-modal', handleOpenAuth);
  }, []);

  const handleCourseClick = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setSelectedCourse(course);
    }
  };

  const handleLessonClick = (lesson: Lesson) => {
    // Handle lesson completion logic here
    console.log('Lesson clicked:', lesson);
  };

  const handleBackClick = () => {
    setSelectedCourse(null);
    setShowQuiz(false);
  };

  const handleQuizComplete = (passed: boolean) => {
    if (passed) {
      // Show certificate download option
      console.log('Quiz passed! Show certificate');
    }
    setShowQuiz(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Hero />
      
      {user && <LearningRoadmap />}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedCourse ? (
          <div>
            <button
              onClick={handleBackClick}
              className="mb-6 flex items-center text-blue-600 hover:text-blue-800"
            >
              ← Back to Courses
            </button>
            
            {showQuiz ? (
              <Quiz
                courseId={selectedCourse.id}
                quizId={`quiz-${selectedCourse.id}`}
                onComplete={handleQuizComplete}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <GraduationCap className="w-6 h-6 text-blue-600 mr-2" />
                    <h2 className="text-2xl font-bold">{selectedCourse.title}</h2>
                  </div>
                  {user && (
                    <button
                      onClick={() => setShowQuiz(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Take Quiz
                    </button>
                  )}
                </div>
                <p className="text-gray-600 mb-8">{selectedCourse.description}</p>
                <LessonList
                  lessons={lessons[selectedCourse.id] || []}
                  onLessonClick={handleLessonClick}
                />
              </div>
            )}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-6">Available Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onClick={handleCourseClick}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}

export default App;