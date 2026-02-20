/*
  # Create job_applications table

  1. New Tables
    - `job_applications`
      - `id` (uuid, primary key)
      - `role` (text) - the job title applied for
      - `name` (text) - applicant full name
      - `email` (text) - applicant email
      - `linkedin` (text, nullable) - LinkedIn profile URL
      - `portfolio` (text, nullable) - portfolio/github URL
      - `cover` (text) - cover letter / motivation text
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anonymous users to insert (submit applications)
    - No select policy for public (admin only via service role)
*/

CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  role text NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  linkedin text DEFAULT '',
  portfolio text DEFAULT '',
  cover text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a job application"
  ON job_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
