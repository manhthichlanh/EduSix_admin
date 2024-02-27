import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

//||Components
import Home from "./pages/Home/Home";
import AddCateCourse from "./pages/AddCateCourse/addCateCourse";
import AddCourse from "./pages/AddCourse/addCourse";
import Layout from "./Layout/Layout";
import NoPage from "./pages/NoPage/NoPage";
import AddSection from "./pages/AddSection/AddSection";
import AddLesson from "./pages/AddLesson/AddLesson";
import ListCourse from "./pages/ListCourse/ListCourse";
import AddCateBlog from "./pages/AddCateBlog/AddCateBlog";
import CateCourse from "./pages/CateCourse/CateCourse";
import Order from "./pages/Order/Order";
import CateBlog from "./pages/CateBlog/CateBlog";
import ListBlog from "./pages/ListBlog/ListBlog";
import AddBlog from "./pages/AddBlog/AddBlog";
import MemberAdmin from "./pages/MemberAdmin/MemberAdmin";
import MemberUser from "./pages/MemberUser/MemberUser";
import MemberDetail from "./pages/MemberDetail/MemberDetail";
import AddBanner from "./pages/AddBanner/AddBanner";
import ListBanner from "./pages/ListBanner/ListBanner"
import Login from "./Layout/Login/Login";
import ListQuiz from "./pages/ListQuiz/ListQuiz";
import ProtectedRoute from "./Layout/ProtectRoute/ProtectedRoute";
import ProtectedCourseRoute from "./Layout/ProtectRoute/ProtectedCourseRoute";
import ProtectedOrderRoute from "./Layout/ProtectRoute/ProtectedOrderRoute";
import ProtectedBlogRoute from "./Layout/ProtectRoute/ProtectedBlogRoutejsx";
import ProtectedMemberRoute from "./Layout/ProtectRoute/ProtectedMemberRoute";
import CreateAccountAdmin from "./pages/CreateAccountAdmin/CreateAccountAdmin";
import ListAuthor from "./pages/ListAuthor/ListAuthor"
import AddAuthor from "./pages/AddAuthor/AddAuthor"
import ListReview from "./pages/ListReview/ListReview"
import AddReview from "./pages/AddReview/AddReview"
import CourseStructure from "./pages/CourseStructure/CourseStructure";
import GeneralInfo from "./pages/CourseStructure/General-Info/GeneralInfo";
import Content from "./pages/CourseStructure/Content/Content";
import Publish from "./pages/CourseStructure/Publish/Publish";
//||Components
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />

          <Route
            path="/add-cate-course"
            element={
              <ProtectedCourseRoute>
                <AddCateCourse />
              </ProtectedCourseRoute>
            }
          />
          <Route
            path="/add-course"
            element={
              <ProtectedCourseRoute>
                <AddCourse />
              </ProtectedCourseRoute>
            }
          />
          {/* <Route
            path="/course-structure"
            element={
              <ProtectedCourseRoute>
                <CourseStructure />
              </ProtectedCourseRoute>
            }
          /> */}
          <Route
            path="/course-structure/course"
            element={
              <ProtectedCourseRoute>
                <CourseStructure />
              </ProtectedCourseRoute>
            }
          >
            <Route path="create/general-info" element={<GeneralInfo/>} />
            <Route path=":course_id/general-info" element={<GeneralInfo/>} />
            <Route path=":course_id/content" element={<Content/>} />
            <Route path=":course_id/publish" element={<Publish/>} />
          </Route>
          <Route
            path="/add-section"
            element={
              <ProtectedCourseRoute>
                <AddSection />
              </ProtectedCourseRoute>
            }
          />
          <Route
            path="/add-lesson"
            element={
              <ProtectedCourseRoute>
                <AddLesson />
              </ProtectedCourseRoute>
            }
          />
          <Route
            path="/list-course"
            element={
              <ProtectedCourseRoute>
                <ListCourse />
              </ProtectedCourseRoute>
            }
          />
          <Route
            path="/cate-course"
            element={
              <ProtectedCourseRoute>
                <CateCourse />
              </ProtectedCourseRoute>
            }
          />
          <Route
            path="/list-quiz"
            element={
              <ProtectedCourseRoute>
                <ListQuiz />
              </ProtectedCourseRoute>
            }
          />

          <Route path="/add-cate-blog" element={<AddCateBlog />} />
          <Route
            path="/cate-blog"
            element={
              <ProtectedBlogRoute>
                <CateBlog />
              </ProtectedBlogRoute>
            }
          />
          <Route
            path="/list-blog"
            element={
              <ProtectedBlogRoute>
                <ListBlog />
              </ProtectedBlogRoute>
            }
          />
          <Route
            path="/add-blog"
            element={
              <ProtectedBlogRoute>
                <AddBlog />
              </ProtectedBlogRoute>
            }
          />

          <Route
            path="/order"
            element={
              <ProtectedOrderRoute>
                <Order />
              </ProtectedOrderRoute>
            }
          />
          <Route path="/create-account" element={<CreateAccountAdmin />} />
          <Route
            path="/member-admin"
            element={
              <ProtectedMemberRoute>
                <MemberAdmin />
              </ProtectedMemberRoute>
            }
          />
          <Route
            path="/member-user"
            element={
              <ProtectedMemberRoute>
                <MemberUser />
              </ProtectedMemberRoute>
            }
          />
          <Route
            path="/member-user-detail"
            element={
              <ProtectedMemberRoute>
                <MemberDetail />
              </ProtectedMemberRoute>
            }
          />
          <Route path="/list-banner" element={<ListBanner />} />
          <Route path="/add-banner" element={<AddBanner />} />
          <Route path="/list-author" element={<ListAuthor />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/list-review" element={<ListReview />} />
          <Route path="/add-review" element={<AddReview />} />
        </Route>
        <Route path="/admin/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;



