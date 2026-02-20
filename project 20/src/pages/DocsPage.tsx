import { useState } from 'react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';
import {
  Search, BookOpen, Zap, Database, Globe, Lock, Code2,
  Terminal, FileCode, ChevronRight, ChevronLeft, GitBranch,
  RefreshCw, Layers, Key, Server, HardDrive, AlertCircle,
} from 'lucide-react';

interface NavItem { title: string; id: string }
interface Section { icon: React.ElementType; title: string; items: NavItem[] }

const SECTIONS: Section[] = [
  {
    icon: BookOpen,
    title: 'Getting started',
    items: [
      { title: 'Introduction', id: 'introduction' },
      { title: 'Quick start', id: 'quick-start' },
      { title: 'Your first app', id: 'first-app' },
    ],
  },
  {
    icon: Zap,
    title: 'Building apps',
    items: [
      { title: 'Writing prompts', id: 'writing-prompts' },
      { title: 'Iterating with AI', id: 'iterating' },
      { title: 'Templates', id: 'templates' },
    ],
  },
  {
    icon: Database,
    title: 'Database',
    items: [
      { title: 'Schema generation', id: 'schema' },
      { title: 'Migrations', id: 'migrations' },
      { title: 'Queries', id: 'queries' },
    ],
  },
  {
    icon: Lock,
    title: 'Auth & Security',
    items: [
      { title: 'Authentication', id: 'auth' },
      { title: 'Row level security', id: 'rls' },
      { title: 'API keys', id: 'api-keys' },
    ],
  },
  {
    icon: Globe,
    title: 'Deployment',
    items: [
      { title: 'Deploy to production', id: 'deploy' },
      { title: 'Custom domains', id: 'custom-domains' },
      { title: 'Environment variables', id: 'env-vars' },
    ],
  },
  {
    icon: Code2,
    title: 'Code export',
    items: [
      { title: 'Export to GitHub', id: 'github' },
      { title: 'Project structure', id: 'structure' },
      { title: 'Local development', id: 'local-dev' },
    ],
  },
];

const FLAT_ITEMS = SECTIONS.flatMap((s) => s.items);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="font-mono text-xs bg-white/8 text-blue-300/90 px-1.5 py-0.5 rounded">{children}</code>
);

const CodeBlock = ({ label, children }: { label?: string; children: React.ReactNode }) => (
  <div className="bg-[#0d0d0d] border border-white/8 rounded-xl overflow-hidden my-5">
    {label && (
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/6 bg-white/3">
        <Terminal size={11} className="text-white/30" />
        <span className="text-xs text-white/30 font-mono">{label}</span>
      </div>
    )}
    <pre className="p-4 text-xs text-white/55 font-mono leading-relaxed overflow-x-auto">{children}</pre>
  </div>
);

const Callout = ({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'tip';
  title: string;
  children: React.ReactNode;
}) => {
  const styles = {
    info: 'bg-blue-500/6 border-blue-500/25 text-blue-400',
    warning: 'bg-amber-500/6 border-amber-500/25 text-amber-400',
    tip: 'bg-green-500/6 border-green-500/25 text-green-400',
  };
  return (
    <div className={`border rounded-xl p-4 my-5 ${styles[type]}`}>
      <p className="text-xs font-semibold mb-1.5">{title}</p>
      <p className="text-xs text-white/50 leading-relaxed">{children}</p>
    </div>
  );
};

const Bullet = ({ items, color = 'blue' }: { items: string[]; color?: string }) => (
  <ul className="space-y-2.5 my-4">
    {items.map((item) => (
      <li key={item} className="flex items-start gap-2.5 text-sm text-white/55 leading-relaxed">
        <span className={`mt-2 w-1.5 h-1.5 rounded-full bg-${color}-400 flex-shrink-0`} />
        {item}
      </li>
    ))}
  </ul>
);

const Steps = ({ steps }: { steps: { title: string; desc: string }[] }) => (
  <div className="space-y-5 my-4">
    {steps.map(({ title, desc }, i) => (
      <div key={title} className="flex gap-4">
        <div className="w-7 h-7 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center text-xs font-bold text-blue-400 flex-shrink-0 mt-0.5">
          {i + 1}
        </div>
        <div>
          <p className="text-sm font-semibold text-white mb-1">{title}</p>
          <p className="text-sm text-white/45 leading-relaxed">{desc}</p>
        </div>
      </div>
    ))}
  </div>
);

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-bold text-white mt-10 mb-3 tracking-tight">{children}</h2>
);

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm text-white/55 leading-[1.9] mb-0">{children}</p>
);

const CONTENT: Record<string, { title: string; breadcrumb: string; body: React.ReactNode }> = {
  introduction: {
    title: 'Introduction',
    breadcrumb: 'Getting started',
    body: (
      <div className="space-y-4">
        <P>
          withaibuild is an AI-powered full-stack application platform. You describe what you want to
          build in natural language, and withaibuild generates a complete, deployed web application —
          frontend, backend, database, and authentication — in under 30 seconds.
        </P>
        <Callout type="info" title="Tech stack">
          Every generated app uses React 18 + Tailwind CSS on the frontend, Supabase (PostgreSQL +
          Edge Functions) on the backend, and Vite for building. All code is clean, typed, and
          production-ready.
        </Callout>
        <H2>What withaibuild generates</H2>
        <P>A single prompt produces a complete system, not just UI scaffolding:</P>
        <Bullet
          items={[
            'React components with full routing and responsive layout',
            'PostgreSQL schema with proper indexes and foreign keys',
            'Supabase Edge Functions for server-side logic',
            'Email/password authentication with protected routes',
            'Row Level Security policies on every table',
            'One-click deployment to a live subdomain',
          ]}
        />
        <H2>What you can build</H2>
        <div className="grid sm:grid-cols-2 gap-3 my-4">
          {[
            { icon: Layers, label: 'SaaS products', desc: 'Subscriptions, user management, billing' },
            { icon: Server, label: 'Internal tools', desc: 'Admin panels, dashboards, CRMs' },
            { icon: HardDrive, label: 'Data apps', desc: 'Analytics, reporting, data entry tools' },
            { icon: Globe, label: 'Marketing sites', desc: 'Landing pages, portfolios, blogs' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="bg-white/4 border border-white/8 rounded-xl p-4 flex gap-3">
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={15} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{label}</p>
                <p className="text-xs text-white/35 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <H2>Prerequisites</H2>
        <P>No prior setup is required. withaibuild handles infrastructure, deployment, and hosting.
          You only need a withaibuild account and a browser.</P>
      </div>
    ),
  },

  'quick-start': {
    title: 'Quick start',
    breadcrumb: 'Getting started',
    body: (
      <div className="space-y-4">
        <P>Go from zero to a live, deployed app in under two minutes.</P>
        <Steps
          steps={[
            { title: 'Create a free account', desc: 'Sign up at withaibuild.com. No credit card required. Your account comes with 5 free projects and 50 AI generations per month.' },
            { title: 'Open the builder', desc: 'From your dashboard, click "New project". You\'ll see the main prompt input.' },
            { title: 'Describe your app', desc: 'Type a natural language description of what you want to build. Be as specific or broad as you like — the AI adapts to your detail level.' },
            { title: 'Review the generated app', desc: 'Your app appears in the built-in preview panel within seconds. Explore the pages, test the interactions.' },
            { title: 'Deploy with one click', desc: 'Click "Deploy" in the top toolbar. Your app goes live at a unique URL on the withaibuild.com subdomain instantly.' },
          ]}
        />
        <Callout type="tip" title="Pro tip">
          Your first prompt doesn't have to be perfect. Start with a rough description, then use
          follow-up prompts to refine. The AI understands context across the entire conversation.
        </Callout>
        <H2>Example first prompt</H2>
        <CodeBlock label="Prompt">
{`Build a task management app for small teams.
Users should be able to:
- Sign up and log in
- Create projects and invite teammates
- Add tasks with titles, descriptions, due dates, and assignees
- Mark tasks as complete
- See a dashboard with their assigned tasks`}
        </CodeBlock>
        <P>This single prompt generates a complete multi-user task manager with auth, a relational
          database schema, and a dashboard — all deployed and live.</P>
      </div>
    ),
  },

  'first-app': {
    title: 'Your first app',
    breadcrumb: 'Getting started',
    body: (
      <div className="space-y-4">
        <P>This walkthrough builds a simple expense tracker — a concrete example that demonstrates
          the key withaibuild workflow: generate, iterate, deploy.</P>
        <H2>Step 1 — Write the initial prompt</H2>
        <CodeBlock label="Prompt">
{`Build a personal expense tracker. Users can:
- Log in with email and password
- Add expenses with a title, amount, category, and date
- View all their expenses in a table, sorted by date
- See a summary card showing total spent this month
- Delete expenses they added

Use a dark color scheme.`}
        </CodeBlock>
        <H2>Step 2 — Review what was generated</H2>
        <P>The AI creates three pages: a login screen, an expenses list view with the summary
          card, and an add-expense modal. Check each one in the preview panel.</P>
        <Callout type="info" title="What to look for">
          Verify that the data relationships make sense (expenses are linked to the logged-in user),
          the form has appropriate validation, and the delete action works correctly.
        </Callout>
        <H2>Step 3 — Refine with follow-up prompts</H2>
        <CodeBlock label="Follow-up prompts (in sequence)">
{`> Add a bar chart showing spending by category for the current month

> Add a dropdown filter to the expenses table to filter by category

> Add an export to CSV button on the expenses page`}
        </CodeBlock>
        <H2>Step 4 — Deploy</H2>
        <P>Once you are happy with the app, click Deploy. You will receive a live URL you can share
          immediately. The URL format is <Code>your-project.withaibuild.com</Code>.</P>
        <Callout type="tip" title="Export your code">
          After deploying, go to Project Settings → Export to download your full codebase as a zip
          or push it directly to a GitHub repository.
        </Callout>
      </div>
    ),
  },

  'writing-prompts': {
    title: 'Writing prompts',
    breadcrumb: 'Building apps',
    body: (
      <div className="space-y-4">
        <P>The quality of your prompt directly determines the quality of the generated app. These
          principles are derived from analysing thousands of successful builds on withaibuild.</P>
        <H2>1 — Lead with the user and the goal</H2>
        <P>Before listing features, state who will use the app and what they are trying to
          accomplish. This context shapes everything from navigation structure to database design.</P>
        <div className="grid sm:grid-cols-2 gap-3 my-4">
          <div className="bg-red-500/5 border border-red-500/15 rounded-xl p-4">
            <p className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1.5"><AlertCircle size={11} /> Weak</p>
            <p className="text-xs text-white/45 font-mono leading-relaxed">"Build me a dashboard."</p>
          </div>
          <div className="bg-green-500/5 border border-green-500/15 rounded-xl p-4">
            <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1.5"><Code2 size={11} /> Strong</p>
            <p className="text-xs text-white/45 font-mono leading-relaxed">"Build an analytics dashboard for a SaaS startup. Marketing managers need to track campaign performance across channels."</p>
          </div>
        </div>
        <H2>2 — Name your screens explicitly</H2>
        <P>List the exact pages or views the app needs. This prevents the AI from making
          assumptions about scope.</P>
        <CodeBlock label="Good structure">
{`The app should have these pages:
1. Dashboard — summary stats + recent activity feed
2. Campaigns list — searchable, filterable table of all campaigns
3. Campaign detail — performance metrics, editable fields
4. Settings — profile, billing, team members
5. Login / Sign up`}
        </CodeBlock>
        <H2>3 — Describe your data model</H2>
        <P>Tell the AI what information the app manages. Field names, types, and relationships
          produce accurate database schemas and form inputs.</P>
        <CodeBlock label="Data model description">
{`A Campaign has: name (text), budget (number),
start_date, end_date, status (draft | active | paused | completed),
channel (email | social | paid | organic).

A Campaign belongs to a Workspace.
A Workspace has many Users (team members).`}
        </CodeBlock>
        <H2>4 — Mention visual preferences</H2>
        <P>If you have a strong opinion on the look and feel, say so. Otherwise the AI picks a
          sensible default appropriate for the app type.</P>
        <Bullet items={[
          '"Minimal, lots of whitespace, light mode"',
          '"Dark theme, dense data tables, professional tone"',
          '"Use blue as the primary color, rounded corners, card-based layout"',
        ]} color="sky" />
      </div>
    ),
  },

  iterating: {
    title: 'Iterating with AI',
    breadcrumb: 'Building apps',
    body: (
      <div className="space-y-4">
        <P>withaibuild maintains full context of your project across every prompt. You never need
          to re-explain the app — follow-up prompts are applied as precise diffs on top of what
          already exists.</P>
        <H2>How iteration works</H2>
        <P>Each follow-up prompt is processed with the full current state of your project as
          context. The AI identifies the minimum set of changes required and applies them — it does
          not regenerate the entire app.</P>
        <Callout type="info" title="Targeted changes">
          Saying "change the sidebar color to slate-800" only modifies the sidebar component.
          Everything else remains exactly as it was.
        </Callout>
        <H2>Types of follow-up prompts</H2>
        <div className="space-y-3 my-4">
          {[
            { type: 'Add a feature', example: '"Add a search bar to the users table that filters by name or email"' },
            { type: 'Change the UI', example: '"Make the navigation sidebar collapsible, remember the state in localStorage"' },
            { type: 'Fix behavior', example: '"The form should clear after submission and show a success toast message"' },
            { type: 'Update the data model', example: '"Add a priority field to tasks: low, medium, high. Show it as a colored badge"' },
            { type: 'Add a new page', example: '"Add an invoices page that lists all invoices for the current user with a PDF download button"' },
          ].map(({ type, example }) => (
            <div key={type} className="bg-white/3 border border-white/7 rounded-xl p-4">
              <p className="text-xs font-semibold text-white mb-2">{type}</p>
              <p className="text-xs text-white/45 font-mono leading-relaxed">{example}</p>
            </div>
          ))}
        </div>
        <H2>Handling conflicts</H2>
        <P>If a follow-up prompt would conflict with existing functionality (e.g. removing a field
          that is used elsewhere), the AI will notify you in the response and suggest how to
          resolve it before applying the change.</P>
        <H2>Viewing the diff</H2>
        <P>After every generation, click "View changes" in the toolbar to see exactly which files
          were modified, added, or deleted — similar to a git diff.</P>
      </div>
    ),
  },

  templates: {
    title: 'Templates',
    breadcrumb: 'Building apps',
    body: (
      <div className="space-y-4">
        <P>Templates are pre-built, fully deployed apps you can fork with one click. They serve
          as a starting point that you then customise with follow-up prompts.</P>
        <H2>Browsing templates</H2>
        <P>Go to <Code>withaibuild.com/templates</Code> or open the Templates tab from your
          dashboard. Templates are organized by category and sorted by popularity.</P>
        <H2>Template categories</H2>
        <div className="grid sm:grid-cols-2 gap-2.5 my-4">
          {[
            { label: 'SaaS', count: '14 templates', desc: 'Admin dashboards, billing, user management' },
            { label: 'E-commerce', count: '8 templates', desc: 'Product catalogs, cart, checkout flows' },
            { label: 'Productivity', count: '11 templates', desc: 'Project trackers, note apps, wikis' },
            { label: 'Marketing', count: '9 templates', desc: 'Landing pages, waitlists, link-in-bio' },
            { label: 'Developer tools', count: '6 templates', desc: 'API explorers, docs, changelogs' },
            { label: 'Internal tools', count: '10 templates', desc: 'CRMs, HR tools, ops dashboards' },
          ].map(({ label, count, desc }) => (
            <div key={label} className="bg-white/3 border border-white/7 rounded-xl p-4">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-semibold text-white">{label}</p>
                <span className="text-xs text-white/30 bg-white/5 px-2 py-0.5 rounded-full">{count}</span>
              </div>
              <p className="text-xs text-white/40">{desc}</p>
            </div>
          ))}
        </div>
        <H2>Using a template</H2>
        <Steps
          steps={[
            { title: 'Pick a template', desc: 'Click the template card to preview it live. The demo is a real running app, not a screenshot.' },
            { title: 'Fork it', desc: 'Click "Use this template". A full copy is created in your workspace within seconds.' },
            { title: 'Customise with prompts', desc: 'Use follow-up prompts to tailor the app to your specific needs — rebrand it, change the data model, add new pages.' },
            { title: 'Deploy', desc: 'Deploy your customised version to your own subdomain.' },
          ]}
        />
        <Callout type="tip" title="Submit your own template">
          Built something you're proud of? Submit it to the community library from Project Settings
          → Share as template. Well-crafted templates earn monthly revenue via our creator program.
        </Callout>
      </div>
    ),
  },

  schema: {
    title: 'Schema generation',
    breadcrumb: 'Database',
    body: (
      <div className="space-y-4">
        <P>withaibuild infers your database schema directly from your prompt. The resulting
          PostgreSQL schema is normalized, indexed appropriately, and includes proper foreign key
          constraints.</P>
        <H2>How schema inference works</H2>
        <P>The AI identifies entities (nouns) and their relationships from your prompt. Each entity
          becomes a table. Relationships are modelled as foreign keys with appropriate
          cardinality (one-to-many, many-to-many via junction tables).</P>
        <CodeBlock label="Example — inferred schema from prompt">
{`-- From: "Users can create projects and invite teammates.
--  Each project has tasks. Tasks have assignees."

CREATE TABLE users (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email       text UNIQUE NOT NULL,
  name        text NOT NULL DEFAULT '',
  avatar_url  text,
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id    uuid NOT NULL REFERENCES users(id),
  name        text NOT NULL,
  description text DEFAULT '',
  created_at  timestamptz DEFAULT now()
);

CREATE TABLE tasks (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id   uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  assignee_id  uuid REFERENCES users(id),
  title        text NOT NULL,
  description  text DEFAULT '',
  status       text NOT NULL DEFAULT 'todo',
  due_date     date,
  created_at   timestamptz DEFAULT now()
);`}
        </CodeBlock>
        <H2>Indexes</H2>
        <P>withaibuild automatically adds indexes on foreign key columns and any columns used in
          common filter patterns (e.g. <Code>status</Code>, <Code>created_at</Code>).</P>
        <H2>Modifying the schema</H2>
        <P>Use follow-up prompts to evolve the schema. withaibuild generates safe migration SQL
          that never drops data.</P>
        <CodeBlock label="Follow-up">
{`> Add a priority column to tasks: low, medium, high (default medium)
> Add a comments table — each comment belongs to a task and has an author`}
        </CodeBlock>
      </div>
    ),
  },

  migrations: {
    title: 'Migrations',
    breadcrumb: 'Database',
    body: (
      <div className="space-y-4">
        <P>Every schema change in withaibuild is tracked as a versioned migration file. Migrations
          are applied automatically on deploy and can be reviewed before execution.</P>
        <H2>Migration files</H2>
        <P>Each migration is a timestamped SQL file stored in <Code>supabase/migrations/</Code>.
          Files are run in chronological order on every deploy.</P>
        <CodeBlock label="supabase/migrations/20260218_add_priority_to_tasks.sql">
{`/*
  # Add priority to tasks

  Adds a priority column (low | medium | high) to the tasks table.
  Existing rows default to 'medium'.
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tasks' AND column_name = 'priority'
  ) THEN
    ALTER TABLE tasks
    ADD COLUMN priority text NOT NULL DEFAULT 'medium'
    CHECK (priority IN ('low', 'medium', 'high'));
  END IF;
END $$;`}
        </CodeBlock>
        <Callout type="warning" title="Destructive operations">
          withaibuild never generates <Code>DROP COLUMN</Code> or <Code>DROP TABLE</Code> statements
          automatically. If you need to remove data, use the manual migration editor and confirm
          you have a backup.
        </Callout>
        <H2>Running migrations manually</H2>
        <P>After exporting your code, migrations can be applied with the Supabase CLI:</P>
        <CodeBlock label="Terminal">
{`supabase db push`}
        </CodeBlock>
        <H2>Rolling back</H2>
        <P>withaibuild tracks the previously applied migration state. To roll back to a prior
          version, restore from a database snapshot in your project's Supabase dashboard.</P>
      </div>
    ),
  },

  queries: {
    title: 'Queries',
    breadcrumb: 'Database',
    body: (
      <div className="space-y-4">
        <P>withaibuild uses the Supabase JavaScript client for all data operations. Generated
          queries are typed, safe, and follow Supabase best practices.</P>
        <H2>Fetching data</H2>
        <CodeBlock label="src/lib/projects.ts">
{`import { supabase } from './supabase'

export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('id, name, description, created_at, tasks(count)')
    .eq('owner_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}`}
        </CodeBlock>
        <H2>Single row queries</H2>
        <P>Always use <Code>maybeSingle()</Code> when you expect zero or one result.
          Using <Code>single()</Code> throws an error when no row is found.</P>
        <CodeBlock label="Correct pattern">
{`const { data } = await supabase
  .from('projects')
  .select('*')
  .eq('id', projectId)
  .maybeSingle()   // returns null if not found, never throws`}
        </CodeBlock>
        <H2>Inserting and updating</H2>
        <CodeBlock label="Insert with returning">
{`const { data, error } = await supabase
  .from('tasks')
  .insert({ title, project_id, assignee_id, status: 'todo' })
  .select()
  .single()`}
        </CodeBlock>
        <H2>Real-time subscriptions</H2>
        <P>withaibuild generates real-time listeners when your prompt includes language like
          "live updates" or "real-time".</P>
        <CodeBlock label="Generated subscription">
{`supabase
  .channel('tasks-channel')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'tasks',
    filter: \`project_id=eq.\${projectId}\`,
  }, (payload) => {
    handleTaskChange(payload)
  })
  .subscribe()`}
        </CodeBlock>
      </div>
    ),
  },

  auth: {
    title: 'Authentication',
    breadcrumb: 'Auth & Security',
    body: (
      <div className="space-y-4">
        <P>withaibuild uses Supabase Auth for all authentication. Every app that includes a login
          flow automatically receives email/password auth, session management, and protected routes
          — no configuration required.</P>
        <H2>What gets generated</H2>
        <Bullet items={[
          'Sign up, sign in, and sign out UI flows',
          'JWT-based session management with automatic refresh token rotation',
          'Password reset via email (one-time link)',
          'A global auth context exposing the current user and session',
          'Protected route wrappers that redirect unauthenticated users to /login',
          'Auth state listener that updates the UI on login/logout',
        ]} />
        <H2>Auth state management</H2>
        <CodeBlock label="src/lib/auth.ts">
{`import { supabase } from './supabase'

// Listen for auth changes — never use async callbacks directly
// to avoid deadlocks with the Supabase client
supabase.auth.onAuthStateChange((event, session) => {
  (() => {
    if (event === 'SIGNED_IN')  setUser(session?.user ?? null)
    if (event === 'SIGNED_OUT') setUser(null)
  })()
})`}
        </CodeBlock>
        <H2>Signing in</H2>
        <CodeBlock label="Sign in with email/password">
{`const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
})

if (error) throw error`}
        </CodeBlock>
        <H2>Getting the current user</H2>
        <CodeBlock label="Server-side safe">
{`const { data: { user } } = await supabase.auth.getUser()
// Use getUser() over getSession() for server-side calls —
// getUser() validates the JWT with Supabase, getSession()
// reads from local storage only.`}
        </CodeBlock>
        <Callout type="warning" title="Email confirmation is off by default">
          withaibuild disables email confirmation to keep the onboarding flow smooth. You can enable
          it in your Supabase project dashboard under Authentication → Email Templates.
        </Callout>
      </div>
    ),
  },

  rls: {
    title: 'Row level security',
    breadcrumb: 'Auth & Security',
    body: (
      <div className="space-y-4">
        <P>Every table generated by withaibuild has Row Level Security (RLS) enabled by default.
          RLS enforces data access rules at the database layer, meaning users can only read or
          write their own data — even if there is a bug in application code.</P>
        <Callout type="warning" title="RLS is non-negotiable">
          Tables without RLS are fully accessible to anyone with your anon key. withaibuild
          enables RLS on every table and generates the minimum policies needed for legitimate
          access patterns.
        </Callout>
        <H2>Generated policy pattern</H2>
        <P>withaibuild generates four separate policies (SELECT, INSERT, UPDATE, DELETE) per table.
          Each policy uses <Code>auth.uid()</Code> to scope access to the row owner.</P>
        <CodeBlock label="Generated policies for a 'tasks' table">
{`ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tasks"
  ON tasks FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own tasks"
  ON tasks FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
  ON tasks FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
  ON tasks FOR DELETE TO authenticated
  USING (auth.uid() = user_id);`}
        </CodeBlock>
        <H2>Team / shared data</H2>
        <P>When your prompt involves shared data (e.g. team members accessing the same project),
          withaibuild generates membership-based policies using subqueries.</P>
        <CodeBlock label="Policy for team-shared data">
{`CREATE POLICY "Team members can view project tasks"
  ON tasks FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_members.project_id = tasks.project_id
      AND   project_members.user_id    = auth.uid()
    )
  );`}
        </CodeBlock>
      </div>
    ),
  },

  'api-keys': {
    title: 'API keys',
    breadcrumb: 'Auth & Security',
    body: (
      <div className="space-y-4">
        <P>withaibuild uses two Supabase API keys in every project. Understanding the difference
          between them is essential for keeping your app secure.</P>
        <H2>Anon key vs service role key</H2>
        <div className="space-y-3 my-4">
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <Key size={13} className="text-blue-400" /> Anon key (public)
            </p>
            <p className="text-sm text-white/50 leading-relaxed">Safe to use in browser code. Access is controlled entirely by RLS policies. Anyone who sees this key can only do what RLS allows.</p>
            <CodeBlock>VITE_SUPABASE_ANON_KEY=eyJhbGci...</CodeBlock>
          </div>
          <div className="bg-white/3 border border-white/8 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
              <Key size={13} className="text-red-400" /> Service role key (secret)
            </p>
            <p className="text-sm text-white/50 leading-relaxed">Bypasses ALL RLS policies. Never expose this in client-side code. Used only in Edge Functions and server-side environments.</p>
            <CodeBlock>SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...</CodeBlock>
          </div>
        </div>
        <Callout type="warning" title="Never commit secrets">
          The service role key must never appear in frontend code or be committed to a public
          repository. withaibuild automatically injects it only in Edge Functions at the server
          level — never in the browser bundle.
        </Callout>
        <H2>Rotating keys</H2>
        <P>If a key is exposed, rotate it immediately in your Supabase project dashboard under
          Settings → API. After rotating, redeploy your withaibuild project to pick up the new key.</P>
        <H2>Custom API keys for third-party services</H2>
        <P>Keys for services like Stripe, Resend, or OpenAI are stored as environment variables
          and accessed only inside Edge Functions. See the
          Environment variables section for details.</P>
      </div>
    ),
  },

  deploy: {
    title: 'Deploy to production',
    breadcrumb: 'Deployment',
    body: (
      <div className="space-y-4">
        <P>Deploying a withaibuild project publishes the latest version of your app to a live URL.
          The entire process — build, migrate, deploy — completes in under 10 seconds.</P>
        <H2>What happens on deploy</H2>
        <Steps
          steps={[
            { title: 'Build', desc: 'The React frontend is compiled with Vite and optimised for production (code splitting, tree shaking, asset hashing).' },
            { title: 'Migrate', desc: 'Any pending database migrations are applied to your Supabase instance in order.' },
            { title: 'Deploy functions', desc: 'Edge Functions are uploaded and deployed globally to Supabase\'s edge network.' },
            { title: 'Publish frontend', desc: 'The compiled frontend is distributed to Cloudflare\'s CDN. Cache is invalidated automatically.' },
            { title: 'Go live', desc: 'Your app is reachable at its subdomain within seconds of clicking Deploy.' },
          ]}
        />
        <H2>Your app URL</H2>
        <CodeBlock label="Default URL format">
{`https://your-project-name.withaibuild.com`}
        </CodeBlock>
        <H2>Deployment history</H2>
        <P>Every deployment is versioned. You can roll back to any previous deployment from
          Project Settings → Deployments. Rollback is instant and does not affect the database.</P>
        <Callout type="info" title="Database rollback">
          Rolling back a deployment does not roll back database migrations. If you need to undo a
          schema change, restore from a database snapshot.
        </Callout>
      </div>
    ),
  },

  'custom-domains': {
    title: 'Custom domains',
    breadcrumb: 'Deployment',
    body: (
      <div className="space-y-4">
        <P>Pro and Team plan projects can be served from a custom domain you own. withaibuild
          handles SSL certificates automatically via Let's Encrypt.</P>
        <H2>Adding a custom domain</H2>
        <Steps
          steps={[
            { title: 'Open project settings', desc: 'Go to your project → Settings → Domains and click "Add custom domain".' },
            { title: 'Enter your domain', desc: 'Type the domain you want to use, e.g. app.yourcompany.com.' },
            { title: 'Add a CNAME record', desc: 'In your DNS provider, add a CNAME record pointing your domain to withaibuild.com\'s CDN hostname shown on screen.' },
            { title: 'Verify and activate', desc: 'Click "Verify". withaibuild checks the DNS record (propagation can take up to 48 hours) and provisions an SSL certificate automatically.' },
          ]}
        />
        <H2>DNS configuration example</H2>
        <CodeBlock label="Cloudflare / standard DNS">
{`Type:   CNAME
Name:   app          (or @ for root domain)
Target: cname.withaibuild.com
TTL:    Auto`}
        </CodeBlock>
        <Callout type="info" title="Root domain support">
          Root domains (e.g. <Code>yourcompany.com</Code> without a subdomain) require ANAME or
          ALIAS record support. Cloudflare's proxied CNAME works for root domains.
        </Callout>
        <H2>SSL certificates</H2>
        <P>SSL certificates are provisioned automatically and renew before expiry. No manual
          action is required. All traffic is served over HTTPS; HTTP requests are redirected.</P>
      </div>
    ),
  },

  'env-vars': {
    title: 'Environment variables',
    breadcrumb: 'Deployment',
    body: (
      <div className="space-y-4">
        <P>Environment variables let you store secrets and configuration values outside your
          codebase. withaibuild distinguishes between client-side and server-side variables.</P>
        <H2>Variable types</H2>
        <div className="space-y-3 my-4">
          <div className="bg-white/3 border border-white/7 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-1">Public variables (browser-safe)</p>
            <p className="text-sm text-white/45 mb-3 leading-relaxed">Must be prefixed with <Code>VITE_</Code>. Embedded into the browser bundle at build time. Never put secrets here.</p>
            <CodeBlock>
{`VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...`}
            </CodeBlock>
          </div>
          <div className="bg-white/3 border border-white/7 rounded-xl p-4">
            <p className="text-sm font-semibold text-white mb-1">Private variables (server-only)</p>
            <p className="text-sm text-white/45 mb-3 leading-relaxed">No <Code>VITE_</Code> prefix. Available only inside Edge Functions. Never exposed to the browser.</p>
            <CodeBlock>
{`SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_...`}
            </CodeBlock>
          </div>
        </div>
        <H2>Setting variables</H2>
        <P>Go to Project Settings → Environment Variables. Variables set here are encrypted at
          rest and injected at build/deploy time. You do not need to redeploy to update
          server-only variables — they are read at Edge Function invocation time.</P>
        <Callout type="warning" title="Never commit .env files">
          Your <Code>.env</Code> file is gitignored by default. Never commit it to a public
          repository. Use the withaibuild dashboard to manage secrets.
        </Callout>
      </div>
    ),
  },

  github: {
    title: 'Export to GitHub',
    breadcrumb: 'Code export',
    body: (
      <div className="space-y-4">
        <P>You own your code. Every withaibuild project can be exported as a clean git repository
          at any time — with a single click or via the CLI.</P>
        <H2>Exporting from the dashboard</H2>
        <Steps
          steps={[
            { title: 'Connect GitHub', desc: 'Go to Account Settings → Integrations and connect your GitHub account. withaibuild requests only the minimum permissions needed to push to repositories you own or have admin access to.' },
            { title: 'Open export settings', desc: 'In your project, go to Settings → Export → GitHub.' },
            { title: 'Choose a repository', desc: 'Select an existing repo or create a new one. withaibuild pushes to the main branch by default.' },
            { title: 'Export', desc: 'Click "Export". The code is pushed as a single commit with the message "Export from withaibuild".' },
          ]}
        />
        <H2>What gets exported</H2>
        <Bullet items={[
          'Full React/Vite frontend source code',
          'Supabase Edge Function source files',
          'Database migration files in supabase/migrations/',
          'package.json, tsconfig.json, tailwind.config.js',
          '.env.example with variable names (no values)',
          'README.md with setup instructions',
        ]} />
        <H2>Continuous sync</H2>
        <P>After the initial export, enable "Sync on deploy" to automatically push a new commit to
          GitHub every time you deploy from withaibuild. This keeps your repo in sync with the
          latest version of your app.</P>
      </div>
    ),
  },

  structure: {
    title: 'Project structure',
    breadcrumb: 'Code export',
    body: (
      <div className="space-y-4">
        <P>Every exported withaibuild project follows a consistent structure. Understanding the
          layout makes it easy to navigate and extend the codebase after export.</P>
        <CodeBlock label="Project tree">
{`your-app/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page-level components (one per route)
│   ├── lib/
│   │   ├── supabase.ts # Supabase client singleton
│   │   ├── auth.ts     # Auth helpers and context
│   │   └── api/        # Data fetching functions per entity
│   ├── hooks/          # Custom React hooks
│   ├── types/          # TypeScript types and interfaces
│   ├── App.tsx         # Root component + router
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles + Tailwind imports
├── supabase/
│   ├── functions/      # Edge Functions (one folder per function)
│   └── migrations/     # SQL migration files (timestamped)
├── public/             # Static assets
├── .env.example        # Variable names without values
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts`}
        </CodeBlock>
        <H2>Key conventions</H2>
        <Bullet items={[
          'Each page component lives in src/pages/ and maps to a single route',
          'Data fetching logic is separated from UI in src/lib/api/',
          'The Supabase client is a singleton instantiated once in src/lib/supabase.ts',
          'TypeScript types are auto-generated from the Supabase schema in src/types/',
        ]} />
        <H2>Adding new pages</H2>
        <P>Create a new file in <Code>src/pages/</Code>, add it to the router in
          <Code>App.tsx</Code>, and link to it from the navigation. withaibuild generates new
          pages via prompt and adds the route automatically.</P>
      </div>
    ),
  },

  'local-dev': {
    title: 'Local development',
    breadcrumb: 'Code export',
    body: (
      <div className="space-y-4">
        <P>After exporting your code, you can run and develop your app locally. The stack requires
          Node.js 18+ and the Supabase CLI.</P>
        <H2>Prerequisites</H2>
        <Bullet items={['Node.js 18 or higher', 'npm or pnpm', 'Supabase CLI (for local database)', 'Git']} />
        <H2>Setup</H2>
        <CodeBlock label="Terminal">
{`# Clone or unzip your exported project
git clone https://github.com/you/your-app.git
cd your-app

# Install dependencies
npm install

# Copy the environment template and fill in your values
cp .env.example .env`}
        </CodeBlock>
        <H2>Filling in .env</H2>
        <P>Copy your Supabase project URL and anon key from the Supabase dashboard
          (Settings → API) into your <Code>.env</Code> file.</P>
        <CodeBlock label=".env">
{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...`}
        </CodeBlock>
        <H2>Running the dev server</H2>
        <CodeBlock label="Terminal">
{`npm run dev
# App available at http://localhost:5173`}
        </CodeBlock>
        <H2>Running migrations locally</H2>
        <P>To use a local Supabase instance (instead of the hosted one), install the Supabase
          CLI and run:</P>
        <CodeBlock label="Terminal">
{`supabase start        # starts local Postgres + Auth
supabase db push      # applies all migrations
supabase functions serve  # runs Edge Functions locally`}
        </CodeBlock>
        <Callout type="tip" title="Hot reload">
          The Vite dev server supports hot module replacement out of the box. UI changes appear
          in the browser instantly without a full page reload.
        </Callout>
      </div>
    ),
  },
};

export default function DocsPage() {
  const loading = usePageLoader();
  const [activeId, setActiveId] = useState('introduction');
  const [search, setSearch] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  if (loading) return <PageSkeleton />;

  const current = CONTENT[activeId];

  const filteredSections = SECTIONS.map((s) => ({
    ...s,
    items: s.items.filter(
      (item) => search === '' || item.title.toLowerCase().includes(search.toLowerCase())
    ),
  })).filter((s) => s.items.length > 0);

  const currentIndex = FLAT_ITEMS.findIndex((i) => i.id === activeId);
  const prevItem = currentIndex > 0 ? FLAT_ITEMS[currentIndex - 1] : null;
  const nextItem = currentIndex < FLAT_ITEMS.length - 1 ? FLAT_ITEMS[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#080808] pt-16">
      <div className="max-w-screen-xl mx-auto flex">
        <aside className="hidden md:flex w-64 flex-shrink-0 flex-col h-[calc(100vh-64px)] sticky top-16 border-r border-white/5 py-8 px-5 overflow-y-auto">
          <div className="relative mb-6">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              placeholder="Search docs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/8 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-blue-500/40 transition-colors"
            />
          </div>
          <nav className="space-y-6">
            {filteredSections.map(({ icon: Icon, title, items }) => (
              <div key={title}>
                <div className="flex items-center gap-2 text-xs font-semibold text-white/30 uppercase tracking-widest mb-2 px-1">
                  <Icon size={11} />
                  {title}
                </div>
                <ul className="space-y-0.5">
                  {items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveId(item.id)}
                        className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                          activeId === item.id
                            ? 'bg-blue-500/12 text-blue-400 font-medium'
                            : 'text-white/40 hover:text-white/75 hover:bg-white/4'
                        }`}
                      >
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="max-w-3xl px-8 md:px-14 py-10">
            <button
              className="md:hidden flex items-center gap-2 text-xs text-white/40 border border-white/8 rounded-lg px-3 py-2 mb-6 w-full"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <FileCode size={12} />
              {current?.title}
              <ChevronRight size={12} className={`ml-auto transition-transform ${mobileNavOpen ? 'rotate-90' : ''}`} />
            </button>

            {mobileNavOpen && (
              <div className="md:hidden bg-[#0d0d0d] border border-white/8 rounded-xl p-4 mb-6">
                {SECTIONS.map(({ title, items }) => (
                  <div key={title} className="mb-4 last:mb-0">
                    <p className="text-xs text-white/25 uppercase tracking-widest mb-2 px-1">{title}</p>
                    <ul className="space-y-0.5">
                      {items.map((item) => (
                        <li key={item.id}>
                          <button
                            onClick={() => { setActiveId(item.id); setMobileNavOpen(false); }}
                            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-all duration-150 ${
                              activeId === item.id ? 'text-blue-400 font-medium bg-blue-500/10' : 'text-white/50 hover:text-white'
                            }`}
                          >
                            {item.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {current && (
              <>
                <div className="flex items-center gap-2 text-xs text-white/30 mb-4">
                  <span>Docs</span>
                  <ChevronRight size={12} />
                  <span>{current.breadcrumb}</span>
                  <ChevronRight size={12} />
                  <span className="text-white/55">{current.title}</span>
                </div>

                <h1 className="text-3xl font-bold text-white mb-8 tracking-tight leading-tight">
                  {current.title}
                </h1>

                {current.body}

                <div className="mt-16 pt-6 border-t border-white/6 grid sm:grid-cols-2 gap-3">
                  {prevItem ? (
                    <button
                      onClick={() => setActiveId(prevItem.id)}
                      className="group flex items-center gap-3 bg-white/3 hover:bg-white/5 border border-white/7 hover:border-white/12 rounded-xl p-4 text-left transition-all duration-200"
                    >
                      <ChevronLeft size={16} className="text-white/30 group-hover:text-white/60 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/30 mb-0.5">Previous</p>
                        <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{prevItem.title}</p>
                      </div>
                    </button>
                  ) : <div />}
                  {nextItem ? (
                    <button
                      onClick={() => setActiveId(nextItem.id)}
                      className="group flex items-center justify-end gap-3 bg-white/3 hover:bg-white/5 border border-white/7 hover:border-white/12 rounded-xl p-4 text-right transition-all duration-200 sm:col-start-2"
                    >
                      <div>
                        <p className="text-xs text-white/30 mb-0.5">Next</p>
                        <p className="text-sm font-medium text-white/70 group-hover:text-white transition-colors">{nextItem.title}</p>
                      </div>
                      <ChevronRight size={16} className="text-white/30 group-hover:text-white/60 flex-shrink-0" />
                    </button>
                  ) : <div />}
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs text-white/20">Last updated February 2026</p>
                  <button className="text-xs text-blue-400/60 hover:text-blue-400 transition-colors flex items-center gap-1.5">
                    <GitBranch size={11} />
                    Edit this page
                  </button>
                </div>
              </>
            )}
          </div>
        </main>

        <div className="hidden xl:block w-52 flex-shrink-0 py-10 px-6 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto border-l border-white/5">
          <p className="text-xs font-semibold text-white/25 uppercase tracking-widest mb-4">On this page</p>
          <div className="space-y-2">
            {['Introduction', 'Quick start', 'Your first app', 'Writing prompts'].includes(current?.title ?? '')
              ? null
              : (
                <p className="text-xs text-white/25 italic">
                  Use the sidebar to navigate between sections.
                </p>
              )}
            <div className="mt-6 space-y-3">
              <a
                href="https://supabase.com/docs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-white/65 transition-colors"
              >
                <Database size={11} />
                Supabase docs
              </a>
              <a
                href="https://vitejs.dev/guide"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-white/65 transition-colors"
              >
                <Zap size={11} />
                Vite docs
              </a>
              <a
                href="https://react.dev"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-white/65 transition-colors"
              >
                <Code2 size={11} />
                React docs
              </a>
              <a
                href="https://tailwindcss.com/docs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-xs text-white/35 hover:text-white/65 transition-colors"
              >
                <RefreshCw size={11} />
                Tailwind docs
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
