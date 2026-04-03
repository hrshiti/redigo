import { useState, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MapPin, FileText } from 'lucide-react';
import './App.css';

// Lazy loading pages for performance
const UserHome = lazy(() => import('./modules/user/pages/Home'));
const Login = lazy(() => import('./modules/user/pages/auth/Login'));
const VerifyOTP = lazy(() => import('./modules/user/pages/auth/VerifyOTP'));
const Signup = lazy(() => import('./modules/user/pages/auth/Signup'));

// Ride Module Pages
const SelectLocation = lazy(() => import('./modules/user/pages/ride/SelectLocation'));
const SelectVehicle = lazy(() => import('./modules/user/pages/ride/SelectVehicle'));
const SearchingDriver = lazy(() => import('./modules/user/pages/ride/SearchingDriver'));
const RideTracking = lazy(() => import('./modules/user/pages/ride/RideTracking'));
const RideComplete = lazy(() => import('./modules/user/pages/ride/RideComplete'));
const Chat = lazy(() => import('./modules/user/pages/ride/Chat'));
const Support = lazy(() => import('./modules/user/pages/ride/Support'));
const RideDetail = lazy(() => import('./modules/user/pages/ride/RideDetail'));

// Parcel Module Pages
const ParcelType = lazy(() => import('./modules/user/pages/parcel/ParcelType'));
const ParcelDetails = lazy(() => import('./modules/user/pages/parcel/ParcelDetails'));
const SenderReceiverDetails = lazy(() => import('./modules/user/pages/parcel/SenderReceiverDetails'));

// Profile & History
const Activity = lazy(() => import('./modules/user/pages/Activity'));
const Profile = lazy(() => import('./modules/user/pages/Profile'));
const Wallet = lazy(() => import('./modules/user/pages/Wallet'));

// Coming Soon placeholder (for /tours and any unbuilt routes)
const ComingSoon = lazy(() => import('./modules/shared/pages/ComingSoon'));

// New Feature Pages
const BikeRentalHome = lazy(() => import('./modules/user/pages/rental/BikeRentalHome'));
const IntercityHome = lazy(() => import('./modules/user/pages/intercity/IntercityHome'));
const CabSharing = lazy(() => import('./modules/user/pages/cabsharing/CabSharing'));

// Profile Settings Sub-pages
const ProfileSettings = lazy(() => import('./modules/user/pages/profile/ProfileSettings'));
const PaymentSettings = lazy(() => import('./modules/user/pages/profile/PaymentSettings'));
const AddressSettings = lazy(() => import('./modules/user/pages/profile/AddressSettings'));
const NotificationSettings = lazy(() => import('./modules/user/pages/profile/NotificationSettings'));
const SecuritySettings = lazy(() => import('./modules/user/pages/profile/SecuritySettings'));

// Driver Module - Registration
const DriverWelcome = lazy(() => import('./modules/driver/pages/registration/DriverWelcome'));
const DriverAuth = lazy(() => import('./modules/driver/pages/registration/DriverAuth'));
const RegistrationDashboard = lazy(() => import('./modules/driver/pages/registration/RegistrationDashboard'));
const RegistrationStatus = lazy(() => import('./modules/driver/pages/registration/RegistrationStatus'));
const StepPersonal = lazy(() => import('./modules/driver/pages/registration/StepPersonal'));
const StepVehicle = lazy(() => import('./modules/driver/pages/registration/StepVehicle'));
const StepDocuments = lazy(() => import('./modules/driver/pages/registration/StepDocuments'));
const StepSelfie = lazy(() => import('./modules/driver/pages/registration/StepSelfie'));
const StepBank = lazy(() => import('./modules/driver/pages/registration/StepBank'));
const ApplicationStatus = lazy(() => import('./modules/driver/pages/registration/ApplicationStatus'));

// Driver Module - Core
const DriverHome = lazy(() => import('./modules/driver/pages/DriverHome'));
const ActiveTrip = lazy(() => import('./modules/driver/pages/ActiveTrip'));
const DriverWallet = lazy(() => import('./modules/driver/pages/DriverWallet'));
const DriverProfile = lazy(() => import('./modules/driver/pages/DriverProfile'));
const RideRequests = lazy(() => import('./modules/driver/pages/RideRequests'));

// Driver Module - Settings
const DriverSettings = lazy(() => import('./modules/driver/pages/settings/DriverSettings'));
const EditProfile = lazy(() => import('./modules/driver/pages/settings/EditProfile'));
const DriverDocuments = lazy(() => import('./modules/driver/pages/settings/DriverDocuments'));
const Notifications = lazy(() => import('./modules/driver/pages/settings/Notifications'));
const PayoutMethods = lazy(() => import('./modules/driver/pages/settings/PayoutMethods'));
const Referral = lazy(() => import('./modules/driver/pages/settings/Referral'));
const SecuritySOS = lazy(() => import('./modules/driver/pages/settings/SecuritySOS'));
const DriverSupport = lazy(() => import('./modules/driver/pages/settings/Support'));
const VehicleFleet = lazy(() => import('./modules/driver/pages/settings/VehicleFleet'));

// Admin Module Pages
const AdminLayout = lazy(() => import('./modules/admin/components/AdminLayout'));
const AdminLogin = lazy(() => import('./modules/admin/pages/auth/AdminLogin'));
const AdminDashboard = lazy(() => import('./modules/admin/pages/dashboard/MainDashboard'));
const AdminUserList = lazy(() => import('./modules/admin/pages/users/UserList'));
const AdminUserDetails = lazy(() => import('./modules/admin/pages/users/UserDetails'));
const AdminDeleteRequestUsers = lazy(() => import('./modules/admin/pages/users/DeleteRequestUsers'));
const AdminUserBulkUpload = lazy(() => import('./modules/admin/pages/users/UserBulkUpload'));

// DRIVER MANAGEMENT IMPORTS
const AdminDriverList = lazy(() => import('./modules/admin/pages/drivers/DriverList'));
const AdminDriverDetails = lazy(() => import('./modules/admin/pages/drivers/DriverDetails'));
const AdminPendingDrivers = lazy(() => import('./modules/admin/pages/drivers/PendingDrivers'));
const AdminDriverSubscriptions = lazy(() => import('./modules/admin/pages/drivers/DriverSubscriptions'));
const AdminDriverRatings = lazy(() => import('./modules/admin/pages/drivers/DriverRatings'));
const AdminDriverRatingDetail = lazy(() => import('./modules/admin/pages/drivers/DriverRatingDetail'));
const AdminDriverWallet = lazy(() => import('./modules/admin/pages/drivers/DriverWallet'));
const AdminNegativeBalanceDrivers = lazy(() => import('./modules/admin/pages/drivers/NegativeBalanceDrivers'));
const AdminWithdrawalRequestDrivers = lazy(() => import('./modules/admin/pages/drivers/WithdrawalRequestDrivers'));
const AdminWithdrawalRequestDetail = lazy(() => import('./modules/admin/pages/drivers/WithdrawalRequestDetail'));
const AdminDriverDeleteRequests = lazy(() => import('./modules/admin/pages/drivers/DriverDeleteRequests'));
const AdminGlobalDocuments = lazy(() => import('./modules/admin/pages/drivers/GlobalDocuments'));
const AdminDriverBulkUpload = lazy(() => import('./modules/admin/pages/drivers/DriverBulkUpload'));
const AdminDriverAudit = lazy(() => import('./modules/admin/pages/drivers/DriverAudit'));
const AdminPaymentMethods = lazy(() => import('./modules/admin/pages/drivers/PaymentMethods'));
const AdminServiceConfig = lazy(() => import('./modules/admin/pages/drivers/ServiceConfig'));
const AdminDriverCreate = lazy(() => import('./modules/admin/pages/drivers/CreateDriver'));
const AdminDriverEdit = lazy(() => import('./modules/admin/pages/drivers/EditDriver'));
const AdminReferralDashboard = lazy(() => import('./modules/admin/pages/referrals/ReferralDashboard'));
const AdminUserReferralSettings = lazy(() => import('./modules/admin/pages/referrals/UserReferralSettings'));
const AdminDriverReferralSettings = lazy(() => import('./modules/admin/pages/referrals/DriverReferralSettings'));
const AdminJoiningBonusSettings = lazy(() => import('./modules/admin/pages/referrals/JoiningBonusSettings'));
const AdminReferralTranslation = lazy(() => import('./modules/admin/pages/referrals/ReferralTranslation'));

const AdminPromoCodes = lazy(() => import('./modules/admin/pages/promotions/PromoCodes'));
const AdminSendNotification = lazy(() => import('./modules/admin/pages/promotions/SendNotification'));
const AdminBannerImage = lazy(() => import('./modules/admin/pages/promotions/BannerImage'));

// Price Management
const AdminServiceLocation = lazy(() => import('./modules/admin/pages/price-management/ServiceLocation'));
const AdminZoneManagement = lazy(() => import('./modules/admin/pages/price-management/ZoneManagement'));
const AdminSetPrices = lazy(() => import('./modules/admin/pages/price-management/SetPrices'));
const AdminVehicleType = lazy(() => import('./modules/admin/pages/price-management/VehicleType'));
const AdminRentalPackageTypes = lazy(() => import('./modules/admin/pages/price-management/RentalPackageTypes'));
const AdminGoodsTypes = lazy(() => import('./modules/admin/pages/price-management/GoodsTypes'));
const AdminPricingPlaceholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400 bg-white rounded-[32px] border border-gray-100 shadow-sm p-10">
    <MapPin size={60} strokeWidth={1} className="mb-6 opacity-20" />
    <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">{title}</h2>
    <p className="mt-2 font-bold italic tracking-tight">Configuration module coming soon</p>
  </div>
);

const AdminOwnerDashboard = lazy(() => import('./modules/admin/pages/owners/OwnerDashboard'));
const AdminManageOwners = lazy(() => import('./modules/admin/pages/owners/ManageOwners'));
const AdminOwnerNeededDocuments = lazy(() => import('./modules/admin/pages/owners/OwnerNeededDocuments'));
const AdminManageFleet = lazy(() => import('./modules/admin/pages/owners/ManageFleet'));
const AdminFleetDrivers = lazy(() => import('./modules/admin/pages/owners/FleetDrivers'));
const AdminBlockedFleetDrivers = lazy(() => import('./modules/admin/pages/owners/BlockedFleetDrivers'));
const AdminFleetNeededDocuments = lazy(() => import('./modules/admin/pages/owners/FleetNeededDocuments'));
const AdminWithdrawalRequestOwners = lazy(() => import('./modules/admin/pages/owners/WithdrawalRequestOwners'));
const AdminWithdrawalRequestOwnerDetail = lazy(() => import('./modules/admin/pages/owners/WithdrawalRequestOwnerDetail'));
const AdminDeletedOwners = lazy(() => import('./modules/admin/pages/owners/DeletedOwners'));

const AdminGeoFencing = lazy(() => import('./modules/admin/pages/geo/GeoFencing'));
const AdminFinance = lazy(() => import('./modules/admin/pages/finance/Finance'));
const AdminFareConfig = lazy(() => import('./modules/admin/pages/finance/FareConfiguration'));
const AdminSafetyCenter = lazy(() => import('./modules/admin/pages/safety/SafetyCenter'));
const AdminCMSBuilder = lazy(() => import('./modules/admin/pages/cms/CMSBuilder'));
const AdminGlobalSettings = lazy(() => import('./modules/admin/pages/settings/GlobalSettings'));

// Reports Module
const AdminUserReport = lazy(() => import('./modules/admin/pages/reports/UserReport'));
const AdminDriverReport = lazy(() => import('./modules/admin/pages/reports/DriverReport'));
const AdminDriverDutyReport = lazy(() => import('./modules/admin/pages/reports/DriverDutyReport'));
const AdminOwnerReport = lazy(() => import('./modules/admin/pages/reports/OwnerReport'));
const AdminFinanceReport = lazy(() => import('./modules/admin/pages/reports/FinanceReport'));
const AdminFleetFinanceReport = lazy(() => import('./modules/admin/pages/reports/FleetFinanceReport'));

// Masters Management
const AdminLanguages = lazy(() => import('./modules/admin/pages/masters/Languages'));
const AdminPreferences = lazy(() => import('./modules/admin/pages/masters/Preferences'));
const AdminRoles = lazy(() => import('./modules/admin/pages/masters/Roles'));

const AdminReportPlaceholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[500px] text-gray-400 bg-white rounded-[32px] border border-gray-100 shadow-sm p-10 mx-6">
    <FileText size={60} strokeWidth={1} className="mb-6 opacity-20" />
    <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">{title}</h2>
    <p className="mt-2 font-bold italic tracking-tight text-primary">Report engine initializing...</p>
  </div>
);

// A wrapper to handle conditional layouts (Mobile for User/Driver, Full for Admin)
const MainLayout = ({ children }) => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  if (isAdminPath) {
    return <div className="redigo-admin-root h-screen bg-gray-50 overflow-hidden">{children}</div>;
  }

  return (
    <div className="redigo-app min-h-screen bg-gray-50/50">
      <main className="max-w-lg mx-auto shadow-2xl bg-white min-h-screen relative overflow-x-hidden">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-white">
            <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
          </div>
        }>
          <Routes>
            {/* User Module Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<UserHome />} />
            
            <Route path="/ride/select-location" element={<SelectLocation />} />
            <Route path="/ride/select-vehicle" element={<SelectVehicle />} />
            <Route path="/ride/searching" element={<SearchingDriver />} />
            <Route path="/ride/tracking" element={<RideTracking />} />
            <Route path="/ride/complete" element={<RideComplete />} />
            <Route path="/ride/chat" element={<Chat />} />
            <Route path="/support" element={<Support />} />
            <Route path="/ride/detail/:id" element={<RideDetail />} />

            <Route path="/parcel/type" element={<ParcelType />} />
            <Route path="/parcel/details" element={<ParcelDetails />} />
            <Route path="/parcel/contacts" element={<SenderReceiverDetails />} />
            <Route path="/parcel/detail/:id" element={<RideDetail />} />

            {/* New Service Routes — Real pages replacing ComingSoon */}
            <Route path="/rental" element={<BikeRentalHome />} />
            <Route path="/intercity" element={<IntercityHome />} />
            <Route path="/cab-sharing" element={<CabSharing />} />
            <Route path="/tours" element={<ComingSoon />} />

            <Route path="/activity" element={<Activity />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />

            <Route path="/profile/settings" element={<ProfileSettings />} />
            <Route path="/profile/payments" element={<PaymentSettings />} />
            <Route path="/profile/addresses" element={<AddressSettings />} />
            <Route path="/profile/notifications" element={<NotificationSettings />} />
            <Route path="/profile/security" element={<SecuritySettings />} />
            
            {/* Driver Module Routes */}
            <Route path="/taxi/driver/welcome" element={<DriverWelcome />} />
            <Route path="/taxi/driver/auth" element={<DriverAuth />} />
            <Route path="/taxi/driver/dashboard-reg" element={<RegistrationDashboard />} />
            <Route path="/taxi/driver/step-personal" element={<StepPersonal />} />
            <Route path="/taxi/driver/step-vehicle" element={<StepVehicle />} />
            <Route path="/taxi/driver/step-documents" element={<StepDocuments />} />
            <Route path="/taxi/driver/step-selfie" element={<StepSelfie />} />
            <Route path="/taxi/driver/step-bank" element={<StepBank />} />
            <Route path="/taxi/driver/registration-status" element={<RegistrationStatus />} />
            <Route path="/taxi/driver/status" element={<ApplicationStatus />} />

            <Route path="/taxi/driver/home" element={<DriverHome />} />
            <Route path="/taxi/driver/dashboard" element={<DriverHome />} />
            <Route path="/taxi/driver/active-trip" element={<ActiveTrip />} />
            <Route path="/taxi/driver/wallet" element={<DriverWallet />} />
            <Route path="/taxi/driver/profile" element={<DriverProfile />} />
            <Route path="/taxi/driver/history" element={<RideRequests />} />

            <Route path="/taxi/driver/settings" element={<DriverSettings />} />
            <Route path="/taxi/driver/edit-profile" element={<EditProfile />} />
            <Route path="/taxi/driver/documents" element={<DriverDocuments />} />
            <Route path="/taxi/driver/notifications" element={<Notifications />} />
            <Route path="/taxi/driver/payout-methods" element={<PayoutMethods />} />
            <Route path="/taxi/driver/referral" element={<Referral />} />
            <Route path="/taxi/driver/security" element={<SecuritySOS />} />
            <Route path="/taxi/driver/support" element={<DriverSupport />} />
            <Route path="/taxi/driver/vehicle-fleet" element={<VehicleFleet />} />

            {/* Admin Module Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<AdminUserList />} />
              <Route path="users/:id" element={<AdminUserDetails />} />
              <Route path="users/delete-requests" element={<AdminDeleteRequestUsers />} />
              <Route path="users/bulk-upload" element={<AdminUserBulkUpload />} />
              
              <Route path="drivers" element={<AdminDriverList />} />
              <Route path="drivers/create" element={<AdminDriverCreate />} />
              <Route path="drivers/edit/:id" element={<AdminDriverEdit />} />
              <Route path="drivers/:id" element={<AdminDriverDetails />} />
              <Route path="drivers/pending" element={<AdminPendingDrivers />} />
              <Route path="drivers/subscription" element={<AdminDriverSubscriptions />} />
              <Route path="drivers/ratings" element={<AdminDriverRatings />} />
              <Route path="drivers/ratings/:id" element={<AdminDriverRatingDetail />} />
              <Route path="drivers/wallet" element={<AdminDriverWallet />} />
              <Route path="drivers/wallet/negative" element={<AdminNegativeBalanceDrivers />} />
              <Route path="drivers/wallet/withdrawals" element={<AdminWithdrawalRequestDrivers />} />
              <Route path="drivers/wallet/withdrawals/:id" element={<AdminWithdrawalRequestDetail />} />
              <Route path="drivers/delete-requests" element={<AdminDriverDeleteRequests />} />
              <Route path="drivers/documents" element={<AdminGlobalDocuments />} />
              <Route path="drivers/bulk-upload" element={<AdminDriverBulkUpload />} />
              <Route path="drivers/payment-methods" element={<AdminPaymentMethods />} />
              <Route path="drivers/service-config" element={<AdminServiceConfig />} />
               <Route path="drivers/audit/:id" element={<AdminDriverAudit />} />
              <Route path="referrals/dashboard" element={<AdminReferralDashboard />} />
              <Route path="referrals/user-settings" element={<AdminUserReferralSettings />} />
              <Route path="referrals/driver-settings" element={<AdminDriverReferralSettings />} />
              <Route path="referrals/joining-bonus" element={<AdminJoiningBonusSettings />} />
               <Route path="referrals/translation" element={<AdminReferralTranslation />} />
               
               {/* Promotions Management */}
               <Route path="promotions/promo-codes" element={<AdminPromoCodes />} />
               <Route path="promotions/send-notification" element={<AdminSendNotification />} />
               <Route path="promotions/banner-image" element={<AdminBannerImage />} />
              
              {/* Owner Management */}
              <Route path="owners/dashboard" element={<AdminOwnerDashboard />} />
              <Route path="owners" element={<AdminManageOwners />} />
              <Route path="owners/wallet/withdrawals" element={<AdminWithdrawalRequestOwners />} />
              <Route path="owners/wallet/withdrawals/:id" element={<AdminWithdrawalRequestOwnerDetail />} />
              <Route path="fleet/drivers" element={<AdminFleetDrivers />} />
              <Route path="fleet/blocked" element={<AdminBlockedFleetDrivers />} />
              <Route path="fleet/documents" element={<AdminFleetNeededDocuments />} />
              <Route path="fleet/manage" element={<AdminManageFleet />} />
              <Route path="owners/documents" element={<AdminOwnerNeededDocuments />} />
              <Route path="owners/deleted" element={<AdminDeletedOwners />} />
              <Route path="owners/bookings" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest italic decoration-indigo-200">Global Fleet Bookings - Indexing</div>} />
              <Route path="referrals/config" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Referral Configuration - Under Setup</div>} />
              <Route path="referrals/active" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Active Referrals Logs - Under Setup</div>} />
              <Route path="geo/*" element={<AdminGeoFencing />} />
              <Route path="finance" element={<AdminFinance />} />
              {/* Price Management */}
              <Route path="pricing">
                <Route index element={<Navigate to="service-location" />} />
                <Route path="service-location" element={<AdminServiceLocation />} />
                <Route path="zone" element={<AdminZoneManagement />} />
                <Route path="airport" element={<AdminPricingPlaceholder title="Airport Management" />} />
                <Route path="vehicle-type" element={<AdminVehicleType />} />
                <Route path="rental-packages" element={<AdminRentalPackageTypes />} />
                <Route path="set-price" element={<AdminSetPrices />} />
                <Route path="goods-types" element={<AdminGoodsTypes />} />
              </Route>
              <Route path="safety" element={<AdminSafetyCenter />} />
              <Route path="cms" element={<AdminCMSBuilder />} />
              <Route path="support" element={<div className="flex items-center justify-center min-h-[500px] text-gray-400 font-bold uppercase tracking-widest">Help & Ticket Management - Under Development</div>} />
              
              {/* Report Module Routes */}
              <Route path="reports/user" element={<AdminUserReport />} />
              <Route path="reports/driver" element={<AdminDriverReport />} />
              <Route path="reports/driver-duty" element={<AdminDriverDutyReport />} />
              <Route path="reports/owner" element={<AdminOwnerReport />} />
              <Route path="reports/finance" element={<AdminFinanceReport />} />
              <Route path="reports/fleet-finance" element={<AdminFleetFinanceReport />} />

              {/* Masters Management */}
              <Route path="masters/languages" element={<AdminLanguages />} />
              <Route path="masters/preferences" element={<AdminPreferences />} />
              <Route path="masters/roles" element={<AdminRoles />} />

              {/* Settings & Config Placeholders */}
              <Route path="settings/business/*" element={<AdminReportPlaceholder title="Business Settings" />} />
              <Route path="settings/app/*" element={<AdminReportPlaceholder title="App Settings" />} />
              <Route path="settings/third-party/*" element={<AdminReportPlaceholder title="Third-party Settings" />} />
              <Route path="settings/addons/*" element={<AdminReportPlaceholder title="Addons Management" />} />
              <Route path="settings/cms/*" element={<AdminReportPlaceholder title="CMS Management" />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
}

export default App;
