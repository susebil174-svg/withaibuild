/*
  # Add Security Constraints to All Form Tables

  ## Summary
  This migration adds database-level security constraints to all user-facing form tables
  to enforce data integrity, prevent abuse, and complement client-side validation.

  ## Changes

  ### contact_messages
  - Add max length constraints on name (100 chars), email (254 chars), message (3000 chars)
  - Add CHECK constraint to validate email format
  - Add CHECK constraint to validate topic is one of allowed values
  - Add CHECK to prevent empty strings

  ### newsletter_subscribers
  - Add max length constraint on email (254 chars)
  - Add CHECK constraint to validate email format
  - Add CHECK to prevent empty strings

  ### job_applications
  - Add max length constraints on name (100), email (254), linkedin (500), portfolio (500), cover (5000)
  - Add CHECK constraint to validate email format
  - Add CHECK to prevent empty required fields

  ### feature_requests
  - Add max length constraints on email (254), request (2000)
  - Add CHECK constraint to validate email format when provided
  - Add CHECK to prevent empty request field

  ## Security Notes
  - Email regex validation at DB level provides a last line of defense
  - Length constraints prevent storage exhaustion attacks
  - Empty string checks ensure data quality
*/

ALTER TABLE contact_messages
  ADD CONSTRAINT contact_messages_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT contact_messages_email_length CHECK (char_length(email) BETWEEN 1 AND 254),
  ADD CONSTRAINT contact_messages_message_length CHECK (char_length(message) BETWEEN 1 AND 3000),
  ADD CONSTRAINT contact_messages_topic_valid CHECK (topic IN ('general','sales','support','billing','press','partnership')),
  ADD CONSTRAINT contact_messages_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

ALTER TABLE newsletter_subscribers
  ADD CONSTRAINT newsletter_email_length CHECK (char_length(email) BETWEEN 1 AND 254),
  ADD CONSTRAINT newsletter_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

ALTER TABLE job_applications
  ADD CONSTRAINT job_applications_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
  ADD CONSTRAINT job_applications_email_length CHECK (char_length(email) BETWEEN 1 AND 254),
  ADD CONSTRAINT job_applications_linkedin_length CHECK (char_length(linkedin) <= 500),
  ADD CONSTRAINT job_applications_portfolio_length CHECK (char_length(portfolio) <= 500),
  ADD CONSTRAINT job_applications_cover_length CHECK (char_length(cover) BETWEEN 1 AND 5000),
  ADD CONSTRAINT job_applications_email_format CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$');

ALTER TABLE feature_requests
  ADD CONSTRAINT feature_requests_email_length CHECK (char_length(email) <= 254),
  ADD CONSTRAINT feature_requests_request_length CHECK (char_length(request) BETWEEN 1 AND 2000),
  ADD CONSTRAINT feature_requests_email_format CHECK (
    email = '' OR email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  );
