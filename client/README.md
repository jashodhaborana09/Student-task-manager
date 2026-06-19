# Student Task Manager - Client

Modern, responsive React frontend for the Student Task Manager application built with Vite, Tailwind CSS, and React Router.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Configure environment variables:**
```env
VITE_API_URL=http://localhost:5000/api
```

4. **Start development server:**
```bash
npm run dev
```

Application will be available at `http://localhost:5173`

## 📁 Project Structure

```
client/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskModal.jsx
│   │   ├── TaskFilters.jsx
│   │   ├── DashboardCard.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── EmptyState.jsx
│   │   └── ProgressCircle.jsx
│   ├── pages/               # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Analytics.jsx
│   │   └── ProtectedRoute.jsx
│   ├── layouts/             # Layout wrappers
│   │   └── MainLayout.jsx
│   ├── context/             # Context API
│   │   ├── AuthContext.jsx
│   │   ├── TaskContext.jsx
│   │   └── ThemeContext.jsx
│   ├── services/            # API services
│   │   └── api.js
│   ├── utils/               # Utilities
│   ├── assets/              # Static files
│   ├── App.jsx              # Main component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json
└── .env.example
```

## 🎨 Features

### Pages

#### Login Page
- Email and password input
- Form validation
- Error messages
- Link to registration
- Responsive design

#### Register Page
- Name, email, and password fields
- Password confirmation
- Validation feedback
- Link to login
- Responsive design

#### Dashboard Page
- Welcome section
- Key metrics cards
- Task completion progress
- Recent tasks list
- Quick statistics

#### Tasks Page
- Full task list
- Advanced filtering
- Sorting options
- Add/Edit/Delete operations
- CSV export/import

#### Analytics Page
- Completion metrics
- Priority distribution
- Category breakdown
- Weekly productivity chart
- Task status overview

### Components

#### Navbar
- Branding and logo
- Mobile menu toggle
- Theme switcher
- User profile
- Logout button

#### Sidebar
- Navigation menu
- Active route highlighting
- Mobile responsive
- Smooth transitions

#### TaskCard
- Task title and description
- Priority and category badges
- Due date display
- Completion checkbox
- Edit and delete buttons
- Overdue indicator

#### TaskModal
- Create/Edit form
- Input validation
- Category and priority selectors
- Due date picker
- Save and cancel buttons

#### TaskFilters
- Priority filter
- Category filter
- Status filter
- Sort options
- Export/Import buttons
- Add task button

#### DashboardCard
- Icon display
- Metric value
- Trend indicator
- Color customization

#### ProgressCircle
- Circular progress indicator
- Completion percentage
- Visual representation

## 🛠️ Available Scripts

### Development
```bash
npm run dev
```
Starts Vite development server with hot reload.

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder.

### Preview
```bash
npm run preview
```
Previews production build locally.

### Lint
```bash
npm run lint
```
Runs ESLint on project files.

## 🎯 State Management

### Context API Providers

#### AuthContext
- User authentication state
- Login/Register/Logout functions
- Token management
- Authentication guards

#### TaskContext
- All tasks state
- CRUD operations
- Filtering and sorting
- Task management functions

#### ThemeContext
- Dark/Light mode toggle
- Theme persistence
- Document class management

## 🎨 Styling

### Tailwind CSS
- Utility-first CSS framework
- Custom color palette
- Dark mode support
- Responsive design
- Custom animations

### CSS Features
- Glass morphism effects
- Gradient backgrounds
- Smooth transitions
- Custom scrollbar
- Responsive grid system

### Dark Mode
- Automatic system detection
- Manual toggle
- LocalStorage persistence
- Smooth transitions

## 🔐 Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token included in API requests
5. Protected routes check authentication
6. Token refreshes on page reload
7. Auto-logout on token expiration

## 📡 API Integration

### Axios Configuration
- Base URL from environment variable
- Automatic token attachment
- Error interceptors
- Request/Response handling

### Service Layer
- Centralized API calls
- Error handling
- Response formatting
- Type consistency

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Mobile Features
- Hamburger menu
- Touch-friendly buttons
- Optimized layouts
- Mobile-first CSS

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast
- Focus management
- Screen reader support

## 🔄 Data Flow

```
User Action
    ↓
Component Handler
    ↓
Context Function
    ↓
API Service
    ↓
Backend API
    ↓
Context Update
    ↓
Component Re-render
    ↓
UI Update
```

## 🧪 Testing Components

### Manual Testing Checklist
- [ ] Register new account
- [ ] Login with credentials
- [ ] Create new task
- [ ] Edit existing task
- [ ] Delete task
- [ ] Toggle task completion
- [ ] Filter tasks
- [ ] Sort tasks
- [ ] Export tasks as CSV
- [ ] View analytics
- [ ] Toggle dark mode
- [ ] Test on mobile
- [ ] Test logout

## 🐛 Troubleshooting

### API Connection Error
- Check backend is running
- Verify `VITE_API_URL` in .env
- Check browser console for errors
- Ensure CORS is enabled

### Login/Register Not Working
- Check backend authentication endpoint
- Verify credentials
- Check network tab for response
- Review error messages

### Styling Issues
- Clear browser cache
- Rebuild project: `npm run build`
- Check Tailwind config
- Verify CSS file is imported

### Dark Mode Not Working
- Check `ThemeContext` provider
- Verify localStorage availability
- Check Tailwind dark mode config
- Inspect document HTML class

## 📦 Dependencies

### Production
- **react** ^18.2.0 - UI library
- **react-dom** ^18.2.0 - React DOM
- **react-router-dom** ^6.16.0 - Routing
- **axios** ^1.5.0 - HTTP client
- **react-icons** ^4.12.0 - Icons
- **recharts** ^2.10.3 - Charts
- **react-hot-toast** ^2.4.1 - Notifications
- **papaparse** ^5.4.1 - CSV parsing

### Development
- **vite** ^5.0.0 - Build tool
- **@vitejs/plugin-react** ^4.2.0 - React plugin
- **tailwindcss** ^3.3.5 - CSS framework
- **postcss** ^8.4.31 - CSS processor
- **autoprefixer** ^10.4.16 - CSS prefixes

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options

#### Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Vercel builds and deploys automatically
4. Set `VITE_API_URL` in environment variables

#### Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add `VITE_API_URL` in environment variables

#### GitHub Pages
1. Set homepage in package.json
2. Build project
3. Deploy `dist` folder

#### Self-hosted
1. Build project: `npm run build`
2. Upload `dist` folder to server
3. Configure web server for SPA routing
4. Set up environment variables

## 🔒 Security

- JWT tokens stored in localStorage
- API requests include authorization headers
- Input validation on frontend
- CORS protection
- HTTPS recommended in production

## 📈 Performance

- Code splitting with React Router
- Lazy loading of routes
- Image optimization
- CSS optimization with Tailwind
- Efficient re-renders
- Memoization where needed

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

## 📝 Code Style

- ES6+ syntax
- Arrow functions
- Destructuring
- Async/Await
- Component composition
- Prop validation

## 🤝 Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## 📄 License

MIT License

## 🆘 Support

- Check documentation
- Review error messages
- Check browser console
- Verify backend is running
- Create GitHub issue

---

**Built with React and Vite**
