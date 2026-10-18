import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, createElement } from 'react';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import Loading from './components/Loading';
import { routes } from './routes';

// `pages` maps a page name to its component. The browser passes lazy
// (code-split) components; the server render passes plain ones.
function App({ pages }) {
  return (
    <>
      <Layout>
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={
                  r.redirect ? (
                    <Navigate to={r.redirect} replace />
                  ) : (
                    createElement(pages[r.page], r.props)
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { background: '#1E3A8A', color: '#fff' },
        }}
      />
    </>
  );
}

export default App;
