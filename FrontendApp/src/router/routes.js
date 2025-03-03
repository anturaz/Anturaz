const admin = {
  path: "/Admin",
  component: () => import("layouts/Admin.vue"),
  children: [
    {
      path: "Dashboard",
      name: "dashboard",
      component: () => import("pages/Admin/Dashboard/Dashboard.vue")
    },
    {
      path: "Maintenance/Categories",
      // name: 'maintenanceCategories',
      component: () => import("pages/Maintenance/Categories/Categories.vue"),
      children: [
        {
          path: "",
          name: "table",
          component: () => import("pages/Maintenance/Categories/table.vue")
        },
        {
          path: "add",
          name: "addCategory",
          component: () =>
            import("pages/Maintenance/Categories/addCategory.vue")
        }
      ]
    },
    {
      path: "Maintenance/Payment",
      component: () => import("pages/Maintenance/Payment/Payment.vue")
    },
    {
      path: "Maintenance/Shopper",
      component: () => import("pages/Maintenance/Shopper/Shopper.vue")
    },
    {
      path: "Maintenance/Store",
      component: () => import("pages/Maintenance/Store/Store.vue")
    },
    {
      path: "Maintenance/SystemUser",
      component: () => import("pages/Maintenance/SystemUser/SystemUser.vue")
    },
    {
      path: "Maintenance/SocialMedia",
      component: () => import("pages/Maintenance/SocialMedia/SocialMedia.vue")
    },
    {
      path: "Maintenance/Utilities",
      component: () => import("pages/Maintenance/Utilities/Utilities.vue")
    },
    {
      path: "Maintenance/Layout",
      component: () => import("pages/Maintenance/Layout/Layout.vue"),
      children: [
        {
          path: "Logo",
          component: () => import("pages/Maintenance/Layout/Logo.vue")
        },
        {
          path: "Favicon",
          component: () => import("pages/Maintenance/Layout/Favicon.vue")
        },
        {
          path: "FeaturedPhotos",
          component: () => import("pages/Maintenance/Layout/FeaturedPhotos.vue")
        },
        {
          path: "Announcement",
          component: () => import("pages/Maintenance/Layout/Announcement.vue")
        }
      ]
    },
    {
      path: "BankDeposit/StoreAdvertisment",
      component: () => import("pages/Admin/BankDeposit/StoreAdvertisment.vue")
    },
    {
      path: "BankDeposit/ProductAdvertisment",
      component: () => import("pages/Admin/BankDeposit/ProductAdvertisment.vue")
    },
    {
      path: "BankDeposit/ServiceAdvertisment",
      component: () => import("pages/Admin/BankDeposit/ServiceAdvertisment.vue")
    },
    {
      path: "BankDeposit/ProductTransactions",
      component: () => import("pages/Admin/BankDeposit/ProductTransactions.vue")
    },
    {
      path: "BankDeposit/ServiceTransactions",
      component: () => import("pages/Admin/BankDeposit/ServiceTransactions.vue")
    },
    {
      path: "BankDeposit/ProductSubscriptions",
      component: () =>
        import("pages/Admin/BankDeposit/ProductSubscriptions.vue")
    },
    {
      path: "BankDeposit/ServiceSubscriptions",
      component: () =>
        import("pages/Admin/BankDeposit/ServiceSubscriptions.vue")
    }
  ]
};

const storeOwner = {
  path: "/StoreOwner",
  component: () => import("layouts/StoreOwner.vue"),
  children: [
    {
      path: "PublishStore",
      component: () => import("pages/StoreOwner/PublishStore.vue")
    },
    {
      path: "Portfolio",
      component: () => import("pages/StoreOwner/Portfolio/Portfolio.vue")
    },
    {
      path: "GiftWrappingServices",
      component: () => import("pages/StoreOwner/GiftWrappingServices.vue")
    },
    {
      path: "FuelTranspo",
      component: () => import("pages/StoreOwner/FuelTranspo.vue")
    },
    {
      path: "Delivery",
      component: () => import("pages/StoreOwner/Delivery.vue")
    },

    {
      path: "BookingSystem",
      component: () => import("pages/StoreOwner/BookingSystem.vue")
    },
    {
      path: "User",
      component: () => import("pages/StoreOwner/Users.vue")
    },
    {
      path: "Orders",
      component: () => import("pages/StoreOwner/Orders/Orders.vue")
    },
    {
      path: "Reservations",
      component: () => import("pages/StoreOwner/Reservations/Reservations.vue")
    },
    {
      path: "Inventory/Products",
      component: () => import("pages/StoreOwner/ManageProducts.vue")
    },
    {
      path: "Inventory/Products/ManageProduct",
      component: () => import("pages/StoreOwner/Inventory/manageProduct.vue")
    },
    {
      path: "Inventory/Services",
      component: () => import("pages/StoreOwner/ManageServices.vue")
    },
    {
      path: "Inventory/Services/ManageService",
      component: () => import("pages/StoreOwner/Inventory/manageService.vue")
    },
    {
      path: "Reports",
      component: () => import("pages/StoreOwner/Reports/Reports.vue")
    },
    {
      path: "RatingsAndReviews",
      component: () =>
        import("pages/StoreOwner/RatingsAndReviews/RatingsAndReviews.vue")
    }
  ]
};

const shopper = {
  path: "/",
  component: () => import("layouts/Shopper.vue"),
  children: [
    {
      path: "/",
      component: () => import("pages/Shopper/Home.vue")
    },
    {
      path: "/Shops",
      component: () => import("pages/Shopper/Home/Shops.vue")
    },

    {
      path: "/TermsOfUse",
      component: () => import("pages/Shopper/TermsOfUse.vue")
    },

    {
      path: "/PrivacyPolicy",
      component: () => import("pages/Shopper/PrivacyPolicy.vue")
    },

    {
      path: "/ReturnPolicy",
      component: () => import("pages/Shopper/ReturnPolicy.vue")
    },

    {
      path: "/CommisionAndFees",
      component: () => import("pages/Shopper/CommisionFees.vue")
    },

    {
      path: "/FAQ",
      component: () => import("pages/Shopper/FAQ.vue")
    },

    {
      path: "/AboutUs",
      component: () => import("pages/Shopper/AboutUs.vue")
    },
    {
      path: "/ProductDetails/:product",
      component: () => import("pages/Shopper/Home/ProductDetails.vue")
    },
    {
      path: "/ServiceDetails/:service",
      component: () => import("pages/Shopper/Home/ServiceDetails.vue")
    },
    {
      path: "/CheckoutProduct/:cart",
      component: () => import("components/CheckOut/CheckoutProduct.vue")
    },
    {
      path: "/CheckoutService/:cart",
      component: () => import("components/CheckOut/CheckoutService.vue")
    },
    {
      path: "/GiftRegistry",
      component: () => import("pages/Shopper/GiftRegistry/GiftRegistry.vue")
    },
    {
      path: "/GiftRegistry/Event/Manage/:reference_no",
      component: () =>
        import("pages/Shopper/GiftRegistry/EventGiftRegistry.vue"),
      beforeEnter: (to, from, next) => {
        const isAuthenticated = !!localStorage.getItem("user_token"); // Replace with your auth logic
        if (isAuthenticated) {
          next(); // Allow access
        } else {
          localStorage.setItem("redirectAfterLogin", to.fullPath);
          next("/ShopperLogin"); // Redirect to login page
        }
      }
    },
    {
      path: "/GiftRegistry/Event/:reference_no",
      component: () =>
        import("pages/Shopper/GiftRegistry/EventGiftRegistry.vue")
    },
    {
      path: "/Orders",
      component: () => import("pages/Shopper/Orders/Orders.vue")
    },
    {
      path: "/Reservations",
      component: () => import("pages/Shopper/Reservations/Reservations.vue")
    },
    {
      path: "/Cart",
      component: () => import("pages/Shopper/Home/Cart.vue")
    },
    {
      path: "/Search",
      component: () => import("pages/Shopper/Home/SearchResults.vue")
    },
    {
      path: "/StoreDetails",
      component: () => import("pages/Shopper/StoreDetails.vue")
    },
    {
      path: "/Store/:store_name",
      component: () => import("pages/Shopper/StoreDetails.vue")
    },
    {
      path: "/ShopperSignUp",
      component: () => import("layouts/ShopperSignUp.vue")
    },
    {
      path: "/Settings",
      component: () => import("pages/Shopper/Settings.vue"),
      children: [
        {
          path: "Profile",
          component: () => import("pages/Shopper/Settings/Profile.vue")
        },
        {
          path: "Security",
          component: () => import("pages/Shopper/Settings/Security.vue")
        },
        {
          path: "DeliveryServiceAddress",
          component: () =>
            import("pages/Shopper/Settings/DeliveryServiceAddress.vue")
        }
      ]
    }
  ]
};

const forgotPassword = {
  path: "/ForgotPassword",
  component: () => import("components/forgotPassword")
};

const changePassword = {
  path: "/ChangePassword",
  component: () => import("components/changePassword")
};

const adminVerifyAccount = {
  path: "/Admin/VerifyAccount",
  component: () => import("pages/Maintenance/SystemUser/VerifySystemUser.vue")
};

const adminLogin = {
  path: "/Admin/Login",
  component: () => import("layouts/AdminLoginPage.vue")
};

const storeOwnerLogin = {
  path: "/StoreOwner/Login",
  component: () => import("layouts/StoreOwnerLogin.vue")
};
const createStore = {
  path: "/StoreOwner/CreateStore",
  component: () => import("pages/StoreOwner/CreateStore.vue")
};

const shopperLogin = {
  path: "/ShopperLogin",
  component: () => import("layouts/ShopperLogin.vue")
};

// const temrsOfUse = {
//   path: "/TermsOfUse",
//   component: () => import("pages/Shopper/TermsOfUse.vue")
// };

// const privacyPolicy = {
//   path: "/PrivacyPolicy",
//   component: () => import("pages/Shopper/PrivacyPolicy.vue")
// };

// const returnPolicy = {
//   path: "/ReturnPolicy",
//   component: () => import("pages/Shopper/ReturnPolicy.vue")
// };

// const commissionFees = {
//   path: "/CommisionAndFees",
//   component: () => import("pages/Shopper/CommisionFees.vue")
// };

// const faq = {
//   path: "/FAQ",
//   component: () => import("pages/Shopper/FAQ.vue")
// };

// const aboutUs = {
//   path: "/AboutUs",
//   component: () => import("pages/Shopper/AboutUs.vue")
// };

const routes = [
  admin,
  adminLogin,
  adminVerifyAccount,
  storeOwner,
  storeOwnerLogin,
  createStore,
  shopperLogin,
  shopper,
  forgotPassword,
  changePassword,
  // temrsOfUse,
  // privacyPolicy,
  // returnPolicy,
  // commissionFees,
  // faq,
  // aboutUs,
  {
    path: "/test",
    component: () => import("layouts/sampletable.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
