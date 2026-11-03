import prisma from "./lib/prisma.js";

import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient
} from "./patients.js";

import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor
} from "./doctors.js";

import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment
} from "./appointments.js";

async function main() {
  // 1. Create a patient
  const patient = await createPatient({
    name: "Test Patient",
    email: `test-${Date.now()}@example.com`,
    phone: "9876543212"
  });
  console.log("Patient created:", patient.name);

  // 2. Get patient by ID
  const foundPatient = await getPatient(patient.id);
  console.log("Patient found:", foundPatient.name);

  // 3. Search patients by name
  const patients = await searchPatients("Test");
  console.log("Patients found:", patients.length);

  // 4. Update patient phone
  const updatedPatient = await updatePatientPhone(
    patient.id,
    "9999999999"
  );
  console.log("Updated phone:", updatedPatient.phone);

  // 5. Create a doctor
  const doctor = await createDoctor({
    name: "Dr. Test",
    specialty: "Cardiology",
    email: `doctor-${Date.now()}@hospital.com`
  });
  console.log("Doctor created:", doctor.name);

  // 6. Get doctor by ID
  const foundDoctor = await getDoctor(doctor.id);
  console.log("Doctor found:", foundDoctor.name);

  // 7. List doctors by specialty
  const doctors = await listDoctorsBySpecialty("Cardiology");
  console.log("Cardiology doctors:", doctors.length);

  // 8. Book two future appointments
  const futureDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  const appointment1 = await bookAppointment(
    patient.id,
    doctor.id,
    futureDate,
    "First test appointment"
  );

  const appointment2 = await bookAppointment(
    patient.id,
    doctor.id,
    new Date(futureDate.getTime() + 60 * 60 * 1000),
    "Second test appointment"
  );

  console.log("Appointments booked:", appointment1.id, appointment2.id);

  // 9. Get full appointment details
  const fullAppointment = await getAppointmentFull(appointment1.id);
  console.log("Appointment patient:", fullAppointment.patient.name);
  console.log("Appointment doctor:", fullAppointment.doctor.name);

  // 10. Get upcoming appointments
  const upcoming = await getDoctorUpcomingAppointments(doctor.id);
  console.log("Upcoming appointments:", upcoming.length);

  // 11. Update appointment status
  await setAppointmentStatus(appointment1.id, "completed");
  console.log("Appointment status updated: completed");

  // 12. Cancel all remaining scheduled appointments
  const cancelledCount = await cancelAllPatientAppointments(patient.id);
  console.log("Appointments cancelled:", cancelledCount);

  // 13. Delete appointments
  await deleteAppointment(appointment1.id);
  await deleteAppointment(appointment2.id);
  console.log("Appointments deleted");

  // 14. Delete patient and doctor
  await deletePatient(patient.id);
  console.log("Patient deleted");

  await deleteDoctor(doctor.id);
  console.log("Doctor deleted");
}

main()
  .catch((error) => {
    console.error("Test failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  