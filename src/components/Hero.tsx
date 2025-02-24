import React from 'react';
import { GraduationCap, BookOpen, Award, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Hero = () => {
  const { user } = useAuth();

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover mix-blend-multiply filter brightness-50"
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
          alt="Learning background"
        />
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Master Your Skills with EduLearn
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Join our community of learners and advance your career with expert-led courses in web development, design, and more.
        </p>
        {!user && (
          <div className="mt-10">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 shadow-lg"
            >
              Get Started
              <GraduationCap className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
        
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-white">50+ Courses</p>
              <p className="text-base text-gray-300">In-depth content</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-white">10k+ Students</p>
              <p className="text-base text-gray-300">Active learners</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-white">Certificates</p>
              <p className="text-base text-gray-300">Industry recognized</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white bg-opacity-10">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-lg font-medium text-white">Expert Teachers</p>
              <p className="text-base text-gray-300">Learn from the best</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};