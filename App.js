import { StackNavigator } from "react-navigation";
import LoginScreen from "./src/components/Login/Login";
import DashBoardScreen from "./src/components/DashBoard";
import ProfileScreen from "./src/components/Profile";
import RegistrationScreen from "./src/components/Registration";
import ForgetPasswordScreen from "./src/components/ForgetPassword";
import AppointmentScreen from "./src/components/Appointment";
import VisitNoteScreen from "./src/components/VisitNote";
import MedicationsScreen from "./src/components/Medications";
import PaymentScreen from "./src/components/Payment";
import Notification from "./src/components/Notification";
import UploadScreen from "./src/components/Upload";
import OnlinePayment from "./src/components/OnlinePayment";
import UpComingScreen from "./src/components/UpcomingEvents";
import HomePage from "./src/components/HomePage";
import OfflineMessage from "./src/components/offlineMessages";
import OfflineMessageDetails from "./src/components/offlineMessageDetails";
import AppointmentPay from "./src/components/AppoinmentPayment";
import TermsCondition from "./src/components/TermsandCondition";

const App = StackNavigator({
  Login: { screen: LoginScreen },
  DashBoard: { screen: DashBoardScreen },
  VisitNote: { screen: VisitNoteScreen },
  Payment: { screen: PaymentScreen },
  Medications: { screen: MedicationsScreen },
  Appointment: { screen: AppointmentScreen },
  Registration: { screen: RegistrationScreen },
  ForgetPassword: { screen: ForgetPasswordScreen },
  Notification: { screen: Notification },
  Upload: { screen: UploadScreen },
  Online : { screen : OnlinePayment },
  UpComing : { screen : UpComingScreen},
  Home : { screen : HomePage},
  Profile : { screen : ProfileScreen},
  OfflineMessage : { screen : OfflineMessage},
  OfflineDetails : { screen : OfflineMessageDetails},
  AppointmentPay : { screen : AppointmentPay},
  TermsCondition : { screen : TermsCondition}
});

export default App;
