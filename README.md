# Forum Application

This is a forum application implemented using Next.js, NestJS (backend), TypeScript, Shadcn UI library, NextAuth, Tailwind CSS, Prisma, Date-fns, and Zod.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

These instructions will help you set up and run the forum application on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- Database (e.g., PostgreSQL)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MouhsineNejmi/europortal-forum-app
   ```

2. **Navigate to the project folder:**

   ```bash
   cd europortal-forum-app
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application should now be running on http://localhost:3000.

<br />

# Usage

- Access the forum at [http://localhost:3000](http://localhost:3000).
- Users can view/start discussions and reply.
- Moderators can delete discussions and replies.

<br />

# Features

- List discussions on landing.
- Users start discussions with a heading/description.
- Discussions show user details, creation time, and replies.
- Users can reply to discussions.
- Moderators can delete discussions and replies.
- Auth using NextAuth.

<br />

# Tech Stack

- **Next.js:** React framework.
- **Shadcn UI:** Design UI component library.
- **NextAuth:** User authentication and authorization.
- **Prisma:** Database ORM.
  - Chosen for its powerful and type-safe query capabilities, providing a seamless interaction with databases.
- **Date-fns:** Library for date formatting.
- **Zod:** Library for data validation.
- **Tailwind CSS:** Styling.
