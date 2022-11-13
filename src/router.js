import Vue from "vue";
import Router from "vue-router";
import Auth from "@/components/Auth";
import UserLoginPage from "@/components/UserLoginPage";
import UserRegistrationPage from "@/components/UserRegistrationPage";
import Jobs from "@/components/Jobs";
import Tenders from "@/components/Tenders";
import Freelancers from "@/components/freelancers";
import AdminRegistration from "@/components/adminRegistration";
import AddJobs from "@/components/addJobs";
import jobDetail from "@/components/jobDetail";
import AddTenders from "@/components/addTenders";
import TenderDetail from "@/components/tenderDetail";
import BeFreelancer from "@/components/beFreelancer";
import FreelancerDetail from "@/components/freelancerDetail";
import DetailFreelancer from "@/components/DetailFreelancer";
import Payment from "@/components/payment";
import Price from "@/components/price";
import ViewOrder from "@/components/viewOrder";
import OrderDetail from "@/components/orderDetail";
import Profile from "@/components/profile";
import HomeSection from "@/components/HomeSection";
import updateJobs from "@/components/updateJobs";
import updateTenders from "@/components/updateTenders";
import Promotion from "@/components/promotion";
import TestFreelancerPage from "@/components/testFreelancerPage";
Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      // component: home
      component: HomeSection,
    },
    {
      path: "/regi_admin",
      name: "adminRegistration",
      component: AdminRegistration,
    },
    {
      path: "/auth",
      name: "auth",
      component: Auth,
    },
    {
      path: "/userLoginPage",
      name: "userLoginPage",
      component: UserLoginPage,
    },
    {
      path: "/be_freelancer/:id",
      name: "beFreelancer",
      component: BeFreelancer,
    },
    {
      path: "/userRegistrationPage",
      name: "userRegistrationPage",
      component: UserRegistrationPage,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: Jobs,
    },
    {
      path: "/tenders",
      name: "tenders",
      component: Tenders,
    },
    {
      path: "/freelancers",
      name: "freelancers",
      component: Freelancers,
    },

    {
      path: "/add_jobs",
      name: "addJobs",
      component: AddJobs,
    },
    {
      path: "/j_detail/:id",
      name: "jobDetail",
      component: jobDetail,
    },
    {
      path: "/add_tenders",
      name: "addTenders",
      component: AddTenders,
    },
    {
      path: "/t_detail/:id",
      name: "tenderDetail",
      component: TenderDetail,
    },
    {
      path: "/freelancer_detail/:id",
      name: "freelancerDetail",
      component: DetailFreelancer,
    },
    {
      path: "/payment",
      name: "payment",
      component: Payment,
    },
    {
      path: "/price",
      name: "price",
      component: Price,
    },
    {
      path: "/viewOrder",
      name: "viewOrder",
      component: ViewOrder,
    },
    {
      path: "/order_detail/:id",
      name: "orderDetail",
      component: OrderDetail,
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
    },
    {
      path: "/update_jobs",
      name: "updateJobs",
      component: updateJobs,
    },
    {
      path: "/update_tenders",
      name: "updateTenders",
      component: updateTenders,
    },
    {
      path: "/add_promotion",
      name: "promotion",
      component: Promotion,
    },
    {
      path: "/test_freelancerPage",
      name: "testFreelancerPage",
      component: TestFreelancerPage,
    },
  ],
});
