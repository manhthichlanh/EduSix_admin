import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//||Components
import Home from "./pages/Home/Home";
import AddCateCourse from "./pages/AddCateCourse/AddCateCourse";
import AddCourse from "./pages/AddCourse/AddCourse";
import Layout from "./Layout/Layout";
import NoPage from "./pages/NoPage/NoPage";
import AddSection from "./pages/AddSection/AddSection";
import AddLesson from "./pages/AddLesson/AddLesson";
// import AddVideo from "./pages/AddVideo/AddVideo"
import AddCateBlog from "./pages/AddCateBlog/AddCateBlog";
//||Components
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/add-cate-course" element={<AddCateCourse />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/add-section" element={<AddSection />} />
          <Route path="/add-lesson" element={<AddLesson />} />
          <Route path="/add-cate-blog" element={<AddCateBlog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
