/*
  # Enhanced E-learning Platform Features

  1. New Tables
    - `quizzes` - Store course quizzes
    - `quiz_questions` - Store quiz questions
    - `user_quiz_attempts` - Track user quiz attempts
    - `certificates` - Store user certificates
  
  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
*/

-- Create quizzes table
CREATE TABLE quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  title text NOT NULL,
  passing_score integer NOT NULL DEFAULT 85,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quiz questions table
CREATE TABLE quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  question text NOT NULL,
  options jsonb NOT NULL,
  correct_answer text NOT NULL,
  points integer NOT NULL DEFAULT 10,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create user quiz attempts table
CREATE TABLE user_quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL,
  passed boolean NOT NULL DEFAULT false,
  answers jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, quiz_id)
);

-- Create certificates table
CREATE TABLE certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  quiz_attempt_id uuid REFERENCES user_quiz_attempts(id) ON DELETE CASCADE,
  certificate_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- Policies for quizzes
CREATE POLICY "Quizzes are viewable by everyone"
  ON quizzes FOR SELECT
  TO authenticated
  USING (true);

-- Policies for quiz questions
CREATE POLICY "Quiz questions are viewable by everyone"
  ON quiz_questions FOR SELECT
  TO authenticated
  USING (true);

-- Policies for user quiz attempts
CREATE POLICY "Users can view their own quiz attempts"
  ON user_quiz_attempts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own quiz attempts"
  ON user_quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policies for certificates
CREATE POLICY "Users can view their own certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view all certificates"
  ON certificates FOR SELECT
  TO authenticated
  USING (true);