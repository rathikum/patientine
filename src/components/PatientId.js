var patientId = "";
export default class PatientId {
  getPatientId = data => {
    patientId = data;
  };
  putPatientId = () => {
    return patientId;
  };
}
