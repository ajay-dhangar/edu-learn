/*
  # Initial Schema Setup for E-learning Platform

  1. New Tables
    - users (managed by Supabase Auth)
    - courses
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - thumbnail (text)
      - duration (text)
      - lessons_count (integer)
    - lessons
      - id (uuid, primary key)
      - course_id (uuid, foreign key)
      - title (text)
      - content (text)
      - duration (text)
      - order (integer)
    - user_progress
      - id (uuid, primary key)
      - user_id (uuid, foreign key)
      - lesson_id (uuid, foreign key)
      - completed (boolean)
      - completed_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create courses table
CREATE TABLE courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  thumbnail text NOT NULL,
  duration text NOT NULL,
  lessons_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create lessons table
CREATE TABLE lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  duration text NOT NULL,
  order_number integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user progress table
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  completed boolean DEFAULT false,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Policies for courses
CREATE POLICY "Courses are viewable by everyone"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Policies for lessons
CREATE POLICY "Lessons are viewable by everyone"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user_progress
CREATE POLICY "Users can view their own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);