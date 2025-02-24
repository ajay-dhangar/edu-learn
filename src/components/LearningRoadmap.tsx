import React from 'react';
import { Milestone, CheckCircle2, Circle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const LearningRoadmap = () => {
  const { user } = useAuth();
  
  const roadmapSteps: RoadmapStep[] = [
    {
      id: '1',
      title: 'Web Fundamentals',
      description: 'Master HTML, CSS, and JavaScript basics',
      completed: true,
    },
    {
      id: '2',
      title: 'Frontend Development',
      description: 'Learn React and modern frontend tools',
      completed: false,
    },
    {
      id: '3',
      title: 'Backend Development',
      description: 'Build APIs and server-side applications',
      completed: false,
    },
    {
      id: '4',
      title: 'Full Stack Integration',
      description: 'Connect frontend and backend systems',
      completed: false,
    },
  ];

  if (!user) return null;

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Your Learning Roadmap
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Follow this path to become a full-stack developer
          </p>
        </div>

        <div className="mt-12">
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t-2 border-gray-200"></div>
            </div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {roadmapSteps.map((step, index) => (
                <div key={step.id} className="relative">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-2 border-blue-600">
                    {step.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div className="mt-4 min-w-[150px]">
                    <h3 className="text-lg font-medium text-gray-900">{step.title}</h3>
                    <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};