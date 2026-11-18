import React from 'react';
import { FaJs, FaReact, FaNodeJs, FaGithub, FaFileUpload } from 'react-icons/fa';
import { 
    SiTypescript, 
    SiNextdotjs, 
    SiTailwindcss, 
    SiShadcnui, 
    SiExpress, 
    SiMongodb, 
    SiFirebase, 
    SiPrisma, 
    SiPostgresql, 
    SiGsap, 
    SiFramer,
    SiZod,
    SiRedis,
    SiCloudinary,
    SiBun,
    SiReactquery,
    SiBiome,
    SiJsonwebtokens,
    SiDocker
} from 'react-icons/si';
import { GiBee } from 'react-icons/gi';
import { javaScriptOverview } from './TechIconOverview/JavaScriptOverview';

export const techStackData = [
    // -------------------------------------------------------------
    // 1. FRONTEND & UI (Languages, Libraries, Frameworks & Motion)
    // -------------------------------------------------------------
    {
        id: 'javascript',
        name: 'JavaScript',
        mainCategory: 'frontend',
        category: 'Programming Language',
        icon: <FaJs size={25} className='text-[#f7df1e]' />,
        url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
        vivaDetails: javaScriptOverview
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        mainCategory: 'frontend',
        category: 'Typed Language',
        icon: <SiTypescript size={25} className='text-[#3178c6]' />,
        url: 'https://www.typescriptlang.org/',
        vivaDetails: {
            whatIsIt: 'TypeScript is a strongly typed superset of JavaScript developed by Microsoft that compiles down to plain JavaScript.',
            whyUseIt: 'It catches type errors at compile-time, provides robust autocompletion, and improves code maintainability in large scale applications.',
            keyConcepts: ['Static Typing', 'Interfaces & Types', 'Generics', 'Type Inference', 'Utility Types'],
            vivaQuestions: [
                {
                    q: 'What is the difference between Interface and Type alias in TypeScript?',
                    a: 'Interfaces are extendable and supports declaration merging (ideal for object shapes and OOP). Types are more versatile for union types, primitives, and tuples.'
                },
                {
                    q: 'What are Generics in TypeScript?',
                    a: 'Generics allow creating reusable components/functions that operate over a variety of types rather than a single fixed type while maintaining full type safety.'
                }
            ]
        }
    },
    {
        id: 'react',
        name: 'React',
        mainCategory: 'frontend',
        category: 'Frontend Library',
        icon: <FaReact size={25} className='text-[#61dafb]' />,
        url: 'https://react.dev/',
        vivaDetails: {
            whatIsIt: 'React is an open-source front-end JavaScript library maintained by Meta for building user interfaces based on components.',
            whyUseIt: 'It utilizes a Virtual DOM for efficient UI rendering, component reusability, declarative state management, and a massive ecosystem.',
            keyConcepts: ['Virtual DOM', 'React Hooks (useState, useEffect)', 'JSX Syntax', 'Component Lifecycle', 'State & Props'],
            vivaQuestions: [
                {
                    q: 'How does Virtual DOM improve React performance?',
                    a: 'Virtual DOM keeps an in-memory representation of UI. When state changes, React computes the diff with current DOM (reconciliation) and updates only changed nodes efficiently.'
                },
                {
                    q: 'What is the purpose of useEffect hook?',
                    a: 'useEffect allows executing side effects in functional components, such as data fetching, subscriptions, or manually changing DOM, synchronized with dependency state changes.'
                }
            ]
        }
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        mainCategory: 'frontend',
        category: 'Full-Stack Framework',
        icon: <SiNextdotjs size={25} className='text-white' />,
        url: 'https://nextjs.org/',
        vivaDetails: {
            whatIsIt: 'Next.js is a React framework created by Vercel that enables Server-Side Rendering (SSR), Static Site Generation (SSG), and API routing.',
            whyUseIt: 'It provides automatic code splitting, optimized SEO, App Router, Server Components, image optimization, and full-stack capabilities out of the box.',
            keyConcepts: ['App Router & File-based Routing', 'Server Components vs Client Components', 'SSR, SSG, & ISR', 'Server Actions', 'API Routes'],
            vivaQuestions: [
                {
                    q: 'What is the difference between React Server Components and Client Components?',
                    a: 'Server Components render exclusively on the server and send lightweight HTML to the client (reducing bundle size). Client Components run on client browser for interactivity using "use client".'
                },
                {
                    q: 'What is Incremental Static Regeneration (ISR)?',
                    a: 'ISR allows developers to update static pages in the background without needing to rebuild the entire site, by specifying a revalidate interval.'
                }
            ]
        }
    },
    {
        id: 'tailwind',
        name: 'Tailwind CSS',
        mainCategory: 'frontend',
        category: 'CSS Framework',
        icon: <SiTailwindcss size={25} className='text-[#38bdf8]' />,
        url: 'https://tailwindcss.com/',
        vivaDetails: {
            whatIsIt: 'Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design directly in markup.',
            whyUseIt: 'It speeds up UI styling, eliminates custom CSS boilerplate, enforces design consistency, and purges unused styles for minimal production bundle size.',
            keyConcepts: ['Utility-First Approach', 'Responsive Modifiers (sm, md, lg)', 'Theme Configuration', 'Purging & JIT Compiler', 'Arbitrary Values'],
            vivaQuestions: [
                {
                    q: 'What are the main advantages of Utility-First CSS?',
                    a: 'You do not waste energy inventing class names, CSS files stay small because utilities are reused, and styling is localized directly within component files.'
                }
            ]
        }
    },
    {
        id: 'shadcn',
        name: 'Shadcn UI',
        mainCategory: 'frontend',
        category: 'UI Component Library',
        icon: <SiShadcnui size={25} className='text-white' />,
        url: 'https://ui.shadcn.com/',
        vivaDetails: {
            whatIsIt: 'Shadcn UI is a collection of re-usable UI components built using Radix Primitives and Tailwind CSS, copied directly into your project codebase.',
            whyUseIt: 'Unlike traditional component libraries, you own the code, allowing 100% customization, accessibility compliance, and zero npm dependency lock-in.',
            keyConcepts: ['Code Ownership', 'Radix UI Primitives', 'Tailwind Styling', 'Accessibility (a11y)', 'Cva (class-variance-authority)'],
            vivaQuestions: [
                {
                    q: 'Why is Shadcn UI not installed as an npm dependency package?',
                    a: 'Because Shadcn UI copy-pastes source code components directly into your src directory so you have complete ownership and customization over component logic and styles.'
                }
            ]
        }
    },
    {
        id: 'gsap',
        name: 'GSAP',
        mainCategory: 'frontend',
        category: 'Animation Engine',
        icon: <SiGsap size={25} className='text-[#88ce02]' />,
        url: 'https://gsap.com/',
        vivaDetails: {
            whatIsIt: 'GSAP (GreenSock Animation Platform) is an industry-standard JavaScript library for high-performance, complex web animations.',
            whyUseIt: 'It provides unparalleled performance, precise Timeline control, ScrollTrigger capabilities, and cross-browser consistency for interactive web experiences.',
            keyConcepts: ['Tweens (gsap.to, gsap.from)', 'GSAP Timelines', 'ScrollTrigger Plugin', 'Easing Curves', 'SVG & Canvas Animation'],
            vivaQuestions: [
                {
                    q: 'Why choose GSAP over basic CSS animations for complex sequences?',
                    a: 'GSAP allows creating sequenced timelines, offers fine-grained pause/resume/seek controls, eliminates browser render bugs, and supports advanced plugins like ScrollTrigger.'
                }
            ]
        }
    },
    {
        id: 'framer',
        name: 'Framer Motion',
        mainCategory: 'frontend',
        category: 'React Animation Library',
        icon: <SiFramer size={25} className='text-[#0055ff]' />,
        url: 'https://motion.dev/',
        vivaDetails: {
            whatIsIt: 'Framer Motion is a production-ready motion library for React that simplifies declarative animations, gestures, and layout transitions.',
            whyUseIt: 'It seamlessly integrates with React component states using `motion` primitives, layout animations (`layoutId`), and exit transitions (`AnimatePresence`).',
            keyConcepts: ['motion components (`motion.div`)', 'AnimatePresence', 'Variants & Gestures', 'Layout Animations (`layoutId`)', 'Spring Physics'],
            vivaQuestions: [
                {
                    q: 'What is AnimatePresence used for in Framer Motion?',
                    a: 'AnimatePresence allows components to animate out when they are removed from the React component tree (unmounted), which standard React does not support.'
                }
            ]
        }
    },
    {
        id: 'tanstack-query',
        name: 'TanStack Query',
        mainCategory: 'frontend',
        category: 'Server State & Caching',
        icon: <SiReactquery size={25} className='text-[#ff4154]' />,
        url: 'https://tanstack.com/query/latest',
        vivaDetails: {
            whatIsIt: 'TanStack Query (React Query) is a powerful asynchronous state management library for fetching, caching, synchronizing, and updating server state.',
            whyUseIt: 'It eliminates manual useEffect data fetching, manages background refetching, handles loading/error states, and automates server cache invalidation.',
            keyConcepts: ['QueryClient & QueryProvider', 'useQuery & useMutation', 'Stale-While-Revalidate', 'Query Keys & Invalidation', 'Optimistic Updates'],
            vivaQuestions: [
                {
                    q: 'How does TanStack Query differ from client state managers like Redux or Zustand?',
                    a: 'Redux and Zustand manage synchronous local client state. TanStack Query specializes in asynchronous server state: managing cache, network deduplication, pagination, and background sync.'
                }
            ]
        }
    },
    {
        id: 'bun',
        name: 'Bun',
        mainCategory: 'frontend',
        category: 'Fast Runtime & Bundler',
        icon: <SiBun size={25} className='text-[#fbf0df]' />,
        url: 'https://bun.sh/',
        vivaDetails: {
            whatIsIt: 'Bun is an all-in-one JavaScript runtime, bundler, test runner, and package manager written in Zig, built from scratch for speed.',
            whyUseIt: 'It installs dependencies up to 30x faster than npm/yarn, runs TypeScript natively without transpilation, and speeds up local dev builds dramatically.',
            keyConcepts: ['Zig Engine', 'Native TypeScript & JSX Support', 'Ultra-fast Package Manager', 'Bundler & Test Runner', 'Node.js API Compatibility'],
            vivaQuestions: [
                {
                    q: 'Why is Bun faster than Node.js and npm?',
                    a: 'Bun is written in low-level Zig on top of WebKit JavaScriptCore (rather than V8), uses native OS system calls (io_uring, kqueue), and performs zero-overhead TypeScript parsing.'
                }
            ]
        }
    },
    {
        id: 'biome',
        name: 'Biome',
        mainCategory: 'frontend',
        category: 'Linter & Formatter',
        icon: <SiBiome size={25} className='text-[#60a5fa]' />,
        url: 'https://biomejs.dev/',
        vivaDetails: {
            whatIsIt: 'Biome is a fast formatter and linter for JavaScript, TypeScript, JSX, and JSON, designed as a modern unified replacement for Prettier and ESLint.',
            whyUseIt: 'Written in Rust, it formats and lints code in milliseconds with zero configuration headaches and 97% Prettier compatibility.',
            keyConcepts: ['Rust-Powered Speed', 'Unified Linter & Formatter', 'biome.json Configuration', 'Zero Plugin Overhead', 'IDE Integration'],
            vivaQuestions: [
                {
                    q: 'What is the advantage of using Biome over ESLint and Prettier?',
                    a: 'Biome unifies linting and formatting into a single tool that runs up to 35x faster, uses less memory, and eliminates rule conflicts between ESLint and Prettier.'
                }
            ]
        }
    },

    // -------------------------------------------------------------
    // 2. BACKEND & APIS (Runtime, Frameworks & Middlewares)
    // -------------------------------------------------------------
    {
        id: 'nodejs',
        name: 'Node.js',
        mainCategory: 'backend',
        category: 'Runtime Environment',
        icon: <FaNodeJs size={25} className='text-[#339933]' />,
        url: 'https://nodejs.org/',
        vivaDetails: {
            whatIsIt: 'Node.js is an open-source, cross-platform JavaScript runtime environment built on Google Chrome V8 engine for server-side execution.',
            whyUseIt: 'Its non-blocking asynchronous I/O model makes it highly lightweight, scalable, and ideal for data-intensive real-time applications.',
            keyConcepts: ['V8 Engine', 'Non-blocking I/O', 'CommonJS vs ESM', 'NPM Ecosystem', 'Stream & Buffer APIs'],
            vivaQuestions: [
                {
                    q: 'Why is Node.js called single-threaded yet able to handle high concurrent requests?',
                    a: 'Node.js uses a single main thread for JS code, but offloads asynchronous I/O operations (file system, network) to underlying system threads via libuv thread pool.'
                }
            ]
        }
    },
    {
        id: 'express',
        name: 'Express',
        mainCategory: 'backend',
        category: 'Backend Framework',
        icon: <SiExpress size={25} className='text-slate-350' />,
        url: 'https://expressjs.com/',
        vivaDetails: {
            whatIsIt: 'Express.js is a minimal, unopinionated, flexible Node.js web application framework providing a robust set of features for web & mobile applications.',
            whyUseIt: 'It simplifies building HTTP REST APIs, routing, handling requests/responses, and executing custom middleware chains.',
            keyConcepts: ['Middleware Pipeline', 'RESTful Routing', 'Request & Response Objects', 'Error Handling Middleware', 'CORS Integration'],
            vivaQuestions: [
                {
                    q: 'What is Middleware in Express?',
                    a: 'Middleware functions have access to the request object (req), response object (res), and the next function in the app request-response cycle to execute custom logic or pass control.'
                }
            ]
        }
    },
    {
        id: 'zod',
        name: 'Zod',
        mainCategory: 'backend',
        category: 'Schema Validation',
        icon: <SiZod size={25} className='text-[#3E67B1]' />,
        url: 'https://zod.dev/',
        vivaDetails: {
            whatIsIt: 'Zod is a TypeScript-first schema declaration and validation library with static type inference.',
            whyUseIt: 'It allows developers to build schemas once and automatically infer TypeScript types, validating API request bodies, forms, and environment variables at runtime.',
            keyConcepts: ['Schema Parsing (z.parse, z.safeParse)', 'Type Inference (z.infer)', 'Object & Array Validation', 'Custom Error Messages', 'Transform & Refine'],
            vivaQuestions: [
                {
                    q: 'What is the difference between parse() and safeParse() in Zod?',
                    a: 'parse() throws a ZodError if validation fails, whereas safeParse() returns an object with { success: true, data } or { success: false, error } without throwing runtime exceptions.'
                },
                {
                    q: 'How does Zod work with TypeScript static typing?',
                    a: 'Zod infers static TypeScript types directly from schemas using z.infer<typeof schema>, eliminating duplicate type definitions between runtime validation and compile-time types.'
                }
            ]
        }
    },
    {
        id: 'multer',
        name: 'Multer',
        mainCategory: 'backend',
        category: 'File Upload Middleware',
        icon: <FaFileUpload size={25} className='text-[#e535ab]' />,
        url: 'https://github.com/expressjs/multer',
        vivaDetails: {
            whatIsIt: 'Multer is a Node.js middleware for handling multipart/form-data, primarily used for uploading files in Express applications.',
            whyUseIt: 'It handles file buffers and disk storage seamlessly, allowing easy file uploads to server storage or cloud services like Cloudinary.',
            keyConcepts: ['DiskStorage & MemoryStorage', 'multipart/form-data', 'Single & Array File Uploads', 'File Size Limits & Filtering', 'Req.file & Req.files'],
            vivaQuestions: [
                {
                    q: 'Why is Multer required for handling file uploads in Express?',
                    a: 'Express body-parser does not support multipart/form-data requests. Multer parses multipart headers and extracts file streams into req.file or req.files.'
                },
                {
                    q: 'What is the difference between memoryStorage and diskStorage in Multer?',
                    a: 'diskStorage saves uploaded files directly to server disk folders, while memoryStorage stores files in memory as Buffer objects (ideal for streaming directly to Cloudinary or S3).'
                }
            ]
        }
    },
    {
        id: 'jwt',
        name: 'JWT Auth',
        mainCategory: 'backend',
        category: 'Token Security & RBAC',
        icon: <SiJsonwebtokens size={25} className='text-[#d63aff]' />,
        url: 'https://jwt.io/',
        vivaDetails: {
            whatIsIt: 'JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.',
            whyUseIt: 'It powers stateless user authentication, access token and refresh token rotation, and Role-Based Access Control (RBAC) across distributed web APIs.',
            keyConcepts: ['Header, Payload & Signature', 'Access & Refresh Tokens', 'Stateless Verification', 'Role-Based Access Control (RBAC)', 'HttpOnly Cookie Storage'],
            vivaQuestions: [
                {
                    q: 'Why should Access Tokens have a short expiration and Refresh Tokens be stored in HttpOnly cookies?',
                    a: 'Short-lived access tokens minimize damage if intercepted. Storing refresh tokens in HttpOnly cookies prevents malicious XSS scripts from accessing them.'
                }
            ]
        }
    },

    // -------------------------------------------------------------
    // 3. DATABASE, ORM & CACHING
    // -------------------------------------------------------------
    {
        id: 'mongodb',
        name: 'MongoDB',
        mainCategory: 'database',
        category: 'NoSQL Database',
        icon: <SiMongodb size={25} className='text-[#47a248]' />,
        url: 'https://www.mongodb.com/',
        vivaDetails: {
            whatIsIt: 'MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like BSON (Binary JSON) documents.',
            whyUseIt: 'It allows dynamic schemas, fast querying, seamless horizontal scaling (sharding), and easy mapping to object-oriented application code.',
            keyConcepts: ['BSON Documents & Collections', 'Aggregation Pipeline', 'Indexes & Performance', 'Mongoose ODM', 'Replica Sets & Sharding'],
            vivaQuestions: [
                {
                    q: 'What is the difference between SQL and NoSQL databases?',
                    a: 'SQL databases are relational with fixed table schemas and ACID transactions. NoSQL databases (like MongoDB) are non-relational, schema-less document/key-value stores optimized for horizontal scaling.'
                }
            ]
        }
    },
    {
        id: 'postgresql',
        name: 'PostgreSQL',
        mainCategory: 'database',
        category: 'Relational Database',
        icon: <SiPostgresql size={25} className='text-[#336791]' />,
        url: 'https://www.postgresql.org/',
        vivaDetails: {
            whatIsIt: 'PostgreSQL is an advanced, open-source relational database management system (RDBMS) emphasizing extensibility and SQL compliance.',
            whyUseIt: 'It handles complex ACID transactional workloads, supports JSONB data types, spatial queries (PostGIS), and robust data integrity constraints.',
            keyConcepts: ['ACID Compliance', 'Primary & Foreign Keys', 'JSONB Document Support', 'SQL Joins & Indexing', 'Transactions & Locks'],
            vivaQuestions: [
                {
                    q: 'What does ACID stand for in database management systems?',
                    a: 'Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions do not interfere), and Durability (saved changes persist).'
                }
            ]
        }
    },
    {
        id: 'prisma',
        name: 'Prisma',
        mainCategory: 'database',
        category: 'Next-Gen ORM',
        icon: <SiPrisma size={25} className='text-white' />,
        url: 'https://www.prisma.io/',
        vivaDetails: {
            whatIsIt: 'Prisma is an open-source next-generation Object-Relational Mapper (ORM) for Node.js and TypeScript.',
            whyUseIt: 'It features declarative schema definitions, automated database migrations, type-safe database queries, and auto-generated TypeScript clients.',
            keyConcepts: ['Prisma Schema (`schema.prisma`)', 'Prisma Client', 'Prisma Migrate', 'Type-Safety', 'Relational Mapping'],
            vivaQuestions: [
                {
                    q: 'How does Prisma ensure type safety in database queries?',
                    a: 'Prisma Client reads your `schema.prisma` file and generates exact TypeScript types tailored specifically to your database models whenever you run `prisma generate`.'
                }
            ]
        }
    },
    {
        id: 'redis',
        name: 'Redis',
        mainCategory: 'database',
        category: 'In-Memory Data Store',
        icon: <SiRedis size={25} className='text-[#dc382d]' />,
        url: 'https://redis.io/',
        vivaDetails: {
            whatIsIt: 'Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine.',
            whyUseIt: 'It provides sub-millisecond data retrieval speeds by storing data in RAM, drastically reducing database load and speeding up application response times.',
            keyConcepts: ['In-Memory Caching', 'Data Structures (Strings, Hashes, Lists, Sets)', 'TTL & Cache Expiration', 'Pub/Sub Messaging', 'Persistence (RDB & AOF)'],
            vivaQuestions: [
                {
                    q: 'Why is Redis so fast compared to traditional databases?',
                    a: 'Redis stores data directly in RAM (memory) rather than on disk, and operates on a single-threaded event loop that avoids context switching overhead.'
                },
                {
                    q: 'How is Redis used for Session Management and Rate Limiting?',
                    a: 'Redis stores temporary user session tokens with automatic TTL (time-to-live) expiration and maintains atomic counters to restrict API request frequencies.'
                }
            ]
        }
    },

    // -------------------------------------------------------------
    // 4. TOOLS, CLOUD & MANAGEMENT
    // -------------------------------------------------------------
    {
        id: 'firebase',
        name: 'Firebase',
        mainCategory: 'tools',
        category: 'Backend-as-a-Service',
        icon: <SiFirebase size={25} className='text-[#FFCA28]' />,
        url: 'https://firebase.google.com/',
        vivaDetails: {
            whatIsIt: 'Firebase is a platform developed by Google for creating mobile and web applications offering authentication, realtime databases, and hosting.',
            whyUseIt: 'It accelerates backend setup with pre-built social authentication, Cloud Firestore, real-time push sync, and serverless Cloud Functions.',
            keyConcepts: ['Firebase Authentication', 'Cloud Firestore', 'Realtime Database', 'Security Rules', 'Cloud Functions'],
            vivaQuestions: [
                {
                    q: 'How does Firebase Realtime Database differ from Cloud Firestore?',
                    a: 'Realtime Database stores data as one large JSON tree. Cloud Firestore is a document-collection database supporting complex querying and structured data scaling.'
                }
            ]
        }
    },
    {
        id: 'cloudinary',
        name: 'Cloudinary',
        mainCategory: 'tools',
        category: 'Cloud Media Management',
        icon: <SiCloudinary size={25} className='text-[#3448C5]' />,
        url: 'https://cloudinary.com/',
        vivaDetails: {
            whatIsIt: 'Cloudinary is an end-to-end cloud-based image and video management platform for uploading, storing, transforming, and delivering digital assets.',
            whyUseIt: 'It offloads media storage from the server, automatically optimizes media sizes/formats (WebP/AVIF), and delivers images lightning-fast via global CDN.',
            keyConcepts: ['Cloud Upload API', 'Dynamic URL Transformations', 'Auto Format & Quality Optimization', 'CDN Media Delivery', 'Secure Signed Uploads'],
            vivaQuestions: [
                {
                    q: 'What are dynamic image transformations in Cloudinary?',
                    a: 'Cloudinary allows cropping, resizing, applying filters, or changing image formats dynamically on-the-fly just by altering parameters in the asset URL.'
                },
                {
                    q: 'Why use Cloudinary instead of storing images on local server storage?',
                    a: 'Storing images on local servers consumes disk space, makes horizontal scaling difficult, and burdens the server. Cloudinary provides scalable cloud storage with automatic CDN optimization.'
                }
            ]
        }
    },
    {
        id: 'github',
        name: 'GitHub',
        mainCategory: 'tools',
        category: 'Version Control Platform',
        icon: <FaGithub size={25} className='text-white' />,
        url: 'https://github.com/',
        vivaDetails: {
            whatIsIt: 'GitHub is a cloud platform for code hosting, version control using Git, collaboration, and automated CI/CD software pipelines.',
            whyUseIt: 'It enables distributed team collaboration, code reviews, Pull Requests, issue tracking, and GitHub Actions automation.',
            keyConcepts: ['Git Workflows & Branching', 'Pull Requests (PR)', 'Code Review & Merging', 'GitHub Actions CI/CD', 'Repository Management'],
            vivaQuestions: [
                {
                    q: 'What is the difference between Git and GitHub?',
                    a: 'Git is a local distributed version control software tool. GitHub is a cloud-based web service that hosts Git repositories for team collaboration.'
                }
            ]
        }
    },
    {
        id: 'beekeeper',
        name: 'Beekeeper Studio',
        mainCategory: 'tools',
        category: 'Database Management GUI',
        icon: <GiBee size={25} className='text-[#f59e0b]' />,
        url: 'https://www.beekeeperstudio.io/',
        vivaDetails: {
            whatIsIt: 'Beekeeper Studio is an open-source SQL editor and database management app supporting PostgreSQL, MySQL, SQLite, SQL Server, and CockroachDB.',
            whyUseIt: 'It provides an intuitive graphical interface for running SQL queries, viewing table schemas, managing database relations, and exporting dataset records.',
            keyConcepts: ['Cross-Platform Database GUI', 'SQL Query Editor', 'Connection Management', 'Schema Visualizer', 'Data Export/Import'],
            vivaQuestions: [
                {
                    q: 'Why use a GUI client like Beekeeper Studio during backend development?',
                    a: 'GUI clients simplify inspecting database schemas, running raw SQL test queries, and visualizing table records without relying solely on command line tools.'
                }
            ]
        }
    },
    {
        id: 'docker',
        name: 'Docker',
        mainCategory: 'tools',
        category: 'Containerization Platform',
        icon: <SiDocker size={25} className='text-[#2496ed]' />,
        url: 'https://www.docker.com/',
        vivaDetails: {
            whatIsIt: 'Docker is an open platform for developing, shipping, and running applications inside lightweight, isolated containers.',
            whyUseIt: 'It guarantees environment consistency between development, staging, and production servers, eliminating the "works on my machine" problem.',
            keyConcepts: ['Dockerfile & Image Layers', 'Docker Containers vs VMs', 'Docker Compose', 'Volume Mounts & Networking', 'Multi-stage Builds'],
            vivaQuestions: [
                {
                    q: 'How does a Docker container differ from a Virtual Machine (VM)?',
                    a: 'VMs virtualize hardware and run a complete guest OS (heavyweight). Docker containers share the host OS kernel and isolate user spaces, making them boot in milliseconds with minimal RAM.'
                }
            ]
        }
    }
];
