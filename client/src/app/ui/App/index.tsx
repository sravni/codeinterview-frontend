import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Fallback } from '../../../shared/ui/Fallback';
import { Providers } from '../Providers';

import 'antd/dist/reset.css';
import './styles.css';
import { AdminProtectedRoute } from '../AdminProtectedRoute';

const Interviews = React.lazy(() => import("../../../pages/interviews/ui"));
const InterviewRoom = React.lazy(() => import("../../../pages/interviewRoom/ui"));
const CodeTasks = React.lazy(() => import("../../../pages/codeTasks/ui"));
const Forbidden = React.lazy(() => import("../../../pages/forbidden/ui"));
const NoMatch = React.lazy(() => import("../../../pages/noMatch/ui"));
    
export function App() {
  return (
    <Providers>
      <Routes>
        <Route
          index
          element={
            <Navigate to="/interviews"/>
          }
        />
        <Route
          path="/interviews"
          element={            
            <AdminProtectedRoute>
              <React.Suspense fallback={<Fallback/>}>
                <Interviews />
              </React.Suspense>
            </AdminProtectedRoute>            
          }
        />
        <Route
          path="/codeTasks"
          element={          
            <AdminProtectedRoute>
              <React.Suspense fallback={<Fallback/>}>
                <CodeTasks />
              </React.Suspense>
            </AdminProtectedRoute>            
          }
        />
        <Route
          path="/interviews/:id"
          element={
            <React.Suspense fallback={<Fallback/>}>
              <InterviewRoom />
            </React.Suspense>            
            }
          />        
        <Route
          path="/forbidden"
          element={
            <React.Suspense fallback={<Fallback />}>
              <Forbidden />
            </React.Suspense>}
        />
        <Route
          path="*"
          element={
            <React.Suspense fallback={<Fallback />}>
              <NoMatch />
            </React.Suspense>}
        />
      </Routes>
    </Providers>
  );
}
