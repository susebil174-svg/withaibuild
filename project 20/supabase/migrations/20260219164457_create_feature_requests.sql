/*
  # Create feature_requests table

  1. New Tables
    - `feature_requests`
      - `id` (uuid, primary key)
      - `email` (text, optional)
      - `request` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Allow anyone to INSERT
*/

CREATE TABLE IF NOT EXISTS feature_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text DEFAULT '',
  request text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE feature_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a feature request"
  ON feature_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
