import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: string;
  points: number;
}

interface QuizProps {
  courseId: string;
  quizId: string;
  onComplete: (passed: boolean) => void;
}

export const Quiz: React.FC<QuizProps> = ({ courseId, quizId, onComplete }) => {
  const { user } = useAuth();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadQuizQuestions();
  }, [quizId]);

  const loadQuizQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('quiz_id', quizId);

      if (error) throw error;
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load quiz questions');
      console.error('Error:', error);
    }
  };

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correct_answer) {
        score += question.points;
      }
    });
    return score;
  };

  const handleSubmit = async () => {
    const score = calculateScore();
    const passed = score >= 85;

    try {
      const { error } = await supabase.from('user_quiz_attempts').insert({
        user_id: user?.id,
        quiz_id: quizId,
        score,
        passed,
        answers,
      });

      if (error) throw error;

      if (passed) {
        // Generate certificate if passed
        await supabase.from('certificates').insert({
          user_id: user?.id,
          course_id: courseId,
          quiz_id: quizId,
          certificate_url: `https://example.com/certificates/${user?.id}/${courseId}`,
        });
      }

      onComplete(passed);
      toast.success(passed ? 'Congratulations! You passed the quiz!' : 'Keep practicing and try again!');
    } catch (error) {
      toast.error('Failed to submit quiz');
      console.error('Error:', error);
    }
  };

  if (loading) {
    return <div>Loading quiz...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Course Quiz</h2>
      
      <div className="space-y-8">
        {questions.map((question, index) => (
          <div key={question.id} className="p-6 border rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {index + 1}. {question.question}
            </h3>
            <div className="space-y-3">
              {question.options.map((option) => (
                <label key={option} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={() => handleAnswer(question.id, option)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={Object.keys(answers).length !== questions.length}
        className="mt-8 w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        Submit Quiz
      </button>
    </div>
  );
};