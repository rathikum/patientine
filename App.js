import { StackNavigator } from "react-navigation";
import FireBaseScreen from "./src/components/FireBase";
import LoginScreen from "./src/components/Login/Login";
import DashBoardScreen from "./src/components/DashBoard";
import PrimaryInsuranceScreen from "./src/components/PrimaryInsurance";
import SecondaryInsuranceScreen from "./src/components/SecondaryInsurance";
import RegistrationScreen from "./src/components/Registration";
import ForgetPasswordScreen from "./src/components/ForgetPassword";
import PatientProfileScreen from "./src/components/PatientProfile";
import AppointmentScreen from "./src/components/Appointment";
import ProcedureScreen from "./src/components/Procedure";
import UpdatePrimaryInsuranceScreen from "./src/components/UpdatePrimaryInsurance";
import UpdateSecondaryInsuranceScreen from "./src/components/UpdateSecondaryInsurance";
import VisitNoteScreen from "./src/components/VisitNote";
import VisitNoteDetailsScreen from "./src/components/VisitNoteDetails";
import ActiveMedicationsScreen from "./src/components/ActiveMedications";
import MedicationsScreen from "./src/components/Medications";
import VideoAppointmentScreen from "./src/components/VideoAppointment";
import DoctorListScreen from "./src/components/DoctorList";
import VideoCallScreen from "./src/components/VideoCall";
import PaymentScreen from "./src/components/Payment";
import PreRegAppointment from "./src/components/PreRegAppointment";
import Notification from "./src/components/Notification";
import BillingScreen from "./src/components/Billing";
import OnlinePayment from "./src/components/OnlinePayment";
import UpComingScreen from "./src/components/UpcomingEvents";
import HomePage from "./src/components/HomePage";

const App = StackNavigator({
  Login: { screen: LoginScreen },
  Procedure: { screen: ProcedureScreen },
  DashBoard: { screen: DashBoardScreen },
  SecondaryInsurance: { screen: SecondaryInsuranceScreen },
  PrimaryInsurance: { screen: PrimaryInsuranceScreen },
  PatientProfile: { screen: PatientProfileScreen },
  VisitNote: { screen: VisitNoteScreen },
  VideoCall: { screen: VideoCallScreen },
  Payment: { screen: PaymentScreen },
  VisitNoteDetails: { screen: VisitNoteDetailsScreen },
  UpdatePrimaryInsurance: { screen: UpdatePrimaryInsuranceScreen },
  UpdateSecondaryInsurance: { screen: UpdateSecondaryInsuranceScreen },
  DoctorList: { screen: DoctorListScreen },
  Medications: { screen: MedicationsScreen },
  ActiveMedications: { screen: ActiveMedicationsScreen },
  Appointment: { screen: AppointmentScreen },
  Registration: { screen: RegistrationScreen },
  ForgetPassword: { screen: ForgetPasswordScreen },
  VideoAppointment: { screen: VideoAppointmentScreen },
  PreRegAppointment: { screen: PreRegAppointment },
  Notification: { screen: Notification },
  Billing: { screen: BillingScreen },
  Online : { screen : OnlinePayment },
  UpComing : { screen : UpComingScreen},
  Home : { screen : HomePage}
});

export default App;
