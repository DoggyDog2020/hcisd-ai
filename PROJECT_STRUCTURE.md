# HCISD AI Assistant Platform Documentation

## Project Overview
A role-based AI assistant platform for HCISD with multiple user interfaces tailored for Teachers, Students, Parents, and Administrators. The system uses Firebase for authentication and data management, integrates with OpenAI for AI capabilities, and maintains FERPA compliance.

## Current Project Structure
```typescript
## Current Directory Structure
```bash
hcisd-ai/
├── .firebaserc                    # Firebase project configuration
├── PROJECT_STRUCTURE.md           # This documentation file
├── firebase.json                  # Firebase service configuration
├── firestore.indexes.json         # Firestore indexes configuration
├── firestore.rules               # Firestore security rules
├── random                        # Random test file
│
├── public/                       # Static public assets
│   └── index.html               # Main HTML entry
│
├── functions/                    # Firebase Cloud Functions
│   ├── .eslintrc.js            # ESLint configuration
│   ├── package.json            # Functions dependencies
│   ├── tsconfig.dev.json       # TypeScript config for development
│   ├── tsconfig.json           # TypeScript configuration
│   └── src/
│       └── index.ts            # Cloud Functions entry point (OpenAI integration)
│
├── frontend/                    # React Frontend Application
│   ├── README.md               # Frontend documentation
│   ├── eslint.config.js        # ESLint configuration
│   ├── index.html             # Frontend HTML entry
│   ├── package.json           # Frontend dependencies
│   ├── tsconfig.app.json      # App TypeScript configuration
│   ├── tsconfig.json          # Base TypeScript configuration
│   ├── tsconfig.node.json     # Node TypeScript configuration
│   ├── vite.config.ts         # Vite configuration
│   │
│   └── src/                   # Source code
│       ├── App.css            # Main app styles
│       ├── App.tsx            # Main app component
│       ├── index.css          # Global styles
│       ├── main.tsx           # Application entry point
│       ├── vite-env.d.ts      # Vite type definitions
│       │
│       ├── services/          # Service integrations
│       │   ├── openai/        # OpenAI service
│       │   │   └── teacherAI.ts  # Teacher AI implementation
│       │   │
│       │   └── firebase/      # Firebase services
│       │       ├── auth.ts    # Authentication service (Google + Microsoft)
│       │       ├── firebase.ts # Firebase initialization
│       │       └── user.ts    # User management service
│       │
│       ├── router/            # Routing
│       │   └── routes.tsx     # Route definitions
│       │
│       ├── features/          # Feature modules
│       │   ├── teacher/       # Teacher features
│       │   │   ├── Dashboard.tsx     # Teacher dashboard
│       │   │   └── components/       # Teacher components
│       │   │       └── ChatInterface.tsx  # AI chat interface
│       │   │
│       │   └── auth/         # Authentication features
│       │       ├── RoleSelection.tsx # Role selection
│       │       └── SignIn.tsx        # Sign in page
│       │
│       ├── contexts/         # React contexts
│       │   └── AuthContext.tsx # Authentication context
│       │
│       └── components/       # Shared components
│           ├── ProtectedRoute.tsx  # Route protection
│           ├── SignOutButton.tsx   # Sign out component
│           └── Sidebar/           # Navigation sidebar
│               ├── StudentNav.tsx  # Student navigation
│               ├── TeacherNav.tsx  # Teacher navigation
│               └── index.ts       # Sidebar exports
│
├── dataconnect/              # Data connection configuration
│   ├── dataconnect.yaml     # Connection configuration
│   ├── schema/              # GraphQL schema
│   │   └── schema.gql       # Main schema
│   └── connector/           # Connector configuration
│       ├── connector.yaml   # Connector settings
│       ├── mutations.gql    # GraphQL mutations
│       └── queries.gql      # GraphQL queries
│
└── .github/                 # GitHub configuration
    └── workflows/           # GitHub Actions
        ├── firebase-hosting-merge.yml      # Production deployment
        └── firebase-hosting-pull-request.yml # PR deployment

## Technical Stack
- Frontend: React 18 + TypeScript + Vite
- UI Framework: Material-UI
- Backend: Firebase Services
- Authentication: Firebase Auth (Google + Microsoft)
- Database: Firestore
- AI: OpenAI API via Firebase Functions
- Hosting: Firebase Hosting

## Current Implementation Status

### Completed Features ✅
1. Project Setup
   - Firebase project initialization
   - React + TypeScript setup with Vite
   - Basic project structure
   - CI/CD with GitHub Actions

2. Authentication Foundation
   - Google Sign-in integration
   - Basic role-based routing
   - Protected routes implementation

### In Progress 🚧
1. Authentication Enhancements
   - Microsoft authentication integration
   - Email allowlist system
   - Role management system

2. Teacher Dashboard
   - Basic layout implementation
   - Chat interface structure

### Next Steps 📋
1. Complete Authentication (Priority: High)
   - Implement Microsoft auth
   - Set up allowlist system in Firestore
   - Complete role selection flow

2. Teacher Features (Priority: High)
   - Complete chat interface
   - Implement lesson planning AI
   - Add content management

3. Student Interface (Priority: Medium)
   - Design student dashboard
   - Implement homework helper
   - Add progress tracking

4. Parent Portal (Priority: Medium)
   - Create parent dashboard
   - Add student progress viewing
   - Implement communication features

5. Admin Dashboard (Priority: Low)
   - User management interface
   - System analytics
   - Content moderation tools

## Security & Compliance
- FERPA Compliance Requirements
  - Data encryption in transit and at rest
  - Role-based access control
  - Audit logging
  - Secure data handling

- Authentication Rules
  - Domain-restricted sign-in
  - Allowlist-based access
  - Role-based permissions

## API Integrations
1. OpenAI
   - Custom fine-tuned model for education
   - Rate limiting implementation
   - Content filtering

2. Firebase Services
   - Authentication
   - Firestore Database
   - Cloud Functions
   - Hosting

## Development Guidelines
1. Code Organization
   - Feature-based structure
   - Shared components in /components
   - Service isolation in /services

2. State Management
   - React Context for auth state
   - Local state for component-specific data
   - Firestore for persistent data

3. Testing Strategy
   - Unit tests for utilities
   - Integration tests for features
   - E2E tests for critical flows

## Deployment Pipeline
1. Development
   - Local development with Vite
   - Firebase emulators for testing

2. Staging
   - Automated deployments on PR
   - Integration testing

3. Production
   - Manual approval required
   - Automated deployment via GitHub Actions

## Contact & Resources
- Project Repository: [URL]
- Firebase Console: [URL]
- Design Documents: [URL]
- Technical Documentation: [URL]

## Regular Maintenance Tasks
1. Weekly
   - Dependency updates
   - Security rule reviews
   - Performance monitoring

2. Monthly
   - User analytics review
   - Security audit
   - Backup verification

## Recovery Procedures
1. Data Recovery
   - Backup locations
   - Restoration process

2. Service Disruption
   - Fallback procedures
   - Contact chain

This documentation serves as a living document and should be updated as the project evolves.
