import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense, lazy, useState } from "react";
// import HomePage from "./pages/HomePage";
// import AboutPage from "./pages/AboutPage";
// import ProductPage from "./pages/ProductPage";
// import NewsPage from "./pages/NewsPage";
// import ContactPage from "./pages/ContactPage";
import Loading from "./components/Loading/Loading";
import { readLanguage } from "./utils/storage";

const HomePage = lazy(() => import("./pages/HomePage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const NewsPage = lazy(() => import("./pages/NewsPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const SinglePage = lazy(() => import("./pages/SinglePage"));

function App() {
  const [lang, setLang] = useState(readLanguage);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage lang={lang} setLang={setLang} />
              </Suspense>
            }
          />
          <Route
            path="/about"
            element={
              <Suspense fallback={<Loading />}>
                <AboutPage lang={lang} setLang={setLang} />
              </Suspense>
            }
          />
          <Route
            path="/product"
            element={
              <Suspense fallback={<Loading />}>
                <ProductPage lang={lang} setLang={setLang} />
              </Suspense>
            }
          />
          <Route
            path="/news"
            element={
              <Suspense fallback={<Loading />}>
                <NewsPage lang={lang} setLang={setLang} />
              </Suspense>
            }
          />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<Loading />}>
                <ContactPage lang={lang} setLang={setLang} />
              </Suspense>
            }
          />

          <Route
            path="/single/:id"
            element={
              <Suspense fallback={<Loading />}>
                <SinglePage lang={lang} setLang={setLang} />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
