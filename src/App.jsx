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
import ListCourse from "./pages/ListCourse/ListCourse"
import AddCateBlog from "./pages/AddCateBlog/AddCateBlog";
import CateCourse from "./pages/CateCourse/CateCourse"
import Order from "./pages/Order/Order"
import CateBlog from "./pages/CateBlog/CateBlog"
import ListBlog from "./pages/ListBlog/ListBlog"
import AddBlog from "./pages/AddBlog/AddBlog"
import Member from "./pages/Member/Member"
import Login from "./Layout/Login/Login"
import MemberDetail from "./pages/MemberDetail/MemberDetail"
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
          <Route path="/list-course" element={<ListCourse />} />
          <Route path="/cate-course" element={<CateCourse />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cate-blog" element={<CateBlog />} />
          <Route path="/list-blog" element={<ListBlog />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/member" element={<Member />} />
          <Route path="/member-detail" element={<MemberDetail />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
