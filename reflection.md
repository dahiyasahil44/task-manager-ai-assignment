
# Reflection on AI-Assisted Development

This assignment required building a small full-stack Task Manager application while intentionally using an AI code editor. I used Cursor IDE throughout the development process to scaffold the backend, generate the frontend structure, and implement the API logic. This experience helped me understand both the advantages and limitations of AI-assisted development.

## Moments Where AI Saved Significant Time

The first moment where AI saved a lot of time was during the initial project setup. Instead of manually creating the backend structure, I prompted Cursor to generate a Node.js Express backend with CORS enabled, JSON middleware, and a basic project structure. The AI quickly created a working `package.json`, `index.js`, and folder layout. Normally this setup process takes several minutes and requires repetitive configuration, but the AI generated it instantly and allowed me to focus on building features.

The second time AI was particularly useful was when generating the CRUD API structure. I asked Cursor to create task CRUD APIs along with a proper MVC structure including models, routes, and controllers. The AI generated most of the boilerplate code for these components automatically. This saved time because setting up controllers, routes, and database models manually involves writing repetitive code. Having this generated allowed me to focus more on connecting the frontend and verifying the logic rather than writing standard backend structure from scratch.

## Moments Where AI Generated Incorrect or Incomplete Code

One issue occurred with the MongoDB connection configuration. The AI generated code that included `useNewUrlParser` and `useUnifiedTopology` options. When running the server, the MongoDB driver produced warnings that these options were deprecated. This showed that AI sometimes generates outdated patterns based on older documentation. I detected this issue by reading the warning in the terminal and consulting the MongoDB documentation before removing the deprecated options.

Another issue appeared during deployment. The AI configured a Vite proxy for `/api` routes in `vite.config.js`. While this worked correctly during local development, it failed in production when the frontend was deployed. The reason is that the Vite proxy only works when running the development server. Once deployed, the frontend was trying to call its own domain instead of the backend API, causing 404 errors. I fixed this by creating a centralized Axios instance that points directly to the backend API hosted on Render.

## How AI Changed My Workflow

Using an AI editor significantly changed my development workflow. Instead of writing every line of code manually, I focused more on describing what I wanted the code to do. This made development faster, especially for boilerplate code and common patterns like CRUD APIs. However, it also required careful code review to ensure the generated code was correct and up to date.

I would definitely use AI tools like Cursor in real projects, particularly for scaffolding, documentation, and repetitive tasks. However, I would always review the generated code carefully before using it in production.