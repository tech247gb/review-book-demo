// AppRouter.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter as Router
import { AuthContextProvider } from '../context/AuthContext';
import { SearchContextProvider } from '../context/SearchContext';
import Layout from '../Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
import PublicRoute from './PublicRoute';
import Login from '../components/Login/Login';
import Registration from '../components/Registration/Registration';
import PrivateRoute from './PrivateRoute';
import ReviewForm from '../components/User/components/Forms/ReviewForm';
import ManageProfile from '../components/User/components/Forms/ManageProfileForm';
import ReviewListing from '../components/User/components/Pages/ReviewListing';
import UpdateReviewForm from '../components/User/components/Forms/UpdateReviewForm';
import NotFound from '../components/NotFound/NotFound';
import SingleReview from '../components/SingleReview/SingleReview';
import SearchResults from '../components/SearchResults/SearchResults';
import BookReviews from '../components/BookList/BookReviews';


const AppRouter: React.FC = () => {
    return (
        <Router>
            <AuthContextProvider>
                <SearchContextProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/reviews" element={<BookReviews />} />
                            <Route path="/search" element={<SearchResults />} />
                            <Route path="/reviews/:id" element={<SingleReview />} />
                            <Route element={<PublicRoute />}>
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<Registration />} />
                            </Route>
                            <Route element={<PrivateRoute />}>
                                <Route path="/user/review-book" element={<ReviewForm />} />
                                <Route path="/user/manage-profile" element={<ManageProfile />} />
                                <Route path="/user/view-reviews" element={<ReviewListing />} />
                                <Route path="/user/update-review/:id" element={<UpdateReviewForm />} />
                            </Route>
                            <Route path="/search" element={<BookReviews />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                </SearchContextProvider>
            </AuthContextProvider>
        </Router>
    );
};

export default AppRouter;
