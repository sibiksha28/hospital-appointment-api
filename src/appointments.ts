import prisma from "./lib/prisma.js";

// Book a new appointment
export async function bookAppointment(
  patientId: number,
  doctorId: number,
  date: Date,
  notes?: string
) {
  return prisma.appointment.create({
    data: {
      appointmentDate: date,
      ...(notes !== undefined && { notes }),
      patient: {
        connect: { id: patientId }
      },
      doctor: {
        connect: { id: doctorId }
      }
    },
    include: {
      patient: {
        select: { name: true, email: true }
      },
      doctor: {
        select: { name: true, specialty: true }
      }
    }
  });
}

// Get full appointment details
export async function getAppointmentFull(id: number) {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: true,
      doctor: true
    }
  });

  if (!appointment) {
    throw new Error("Appointment not found");
  }

  return appointment;
}

// Get upcoming appointments for a doctor
export async function getDoctorUpcomingAppointments(doctorId: number) {
  return prisma.appointment.findMany({
    where: {
      doctorId,
      status: "scheduled",
      appointmentDate: {
        gte: new Date()
      }
    },
    orderBy: {
      appointmentDate: "asc"
    },
    include: {
      patient: {
        select: { name: true, phone: true }
      }
    }
  });
}

// Update appointment status
export async function setAppointmentStatus(
  id: number,
  status: "scheduled" | "completed" | "cancelled"
) {
  return prisma.appointment.update({
    where: { id },
    data: { status }
  });
}

// Cancel all scheduled appointments for a patient
export async function cancelAllPatientAppointments(patientId: number) {
  const result = await prisma.appointment.updateMany({
    where: {
      patientId,
      status: "scheduled"
    },
    data: {
      status: "cancelled"
    }
  });

  return result.count;
}

// Delete an appointment
export async function deleteAppointment(id: number) {
  return prisma.appointment.delete({
    where: { id }
  });
}
