import prisma from "./lib/prisma.js";


// Create a new patient
export async function createPatient(data: {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
}) {
  return prisma.patient.create({
    data
  });
}

// Get a patient by ID
export async function getPatient(id: number) {
  const patient = await prisma.patient.findUnique({
    where: { id }
  });

  if (!patient) {
    throw new Error("Patient not found");
  }

  return patient;
}

// Search patients by name
export async function searchPatients(nameFragment: string) {
  return prisma.patient.findMany({
    where: {
      name: {
        contains: nameFragment,
        mode: "insensitive"
      }
    },
    orderBy: {
      name: "asc"
    }
  });
}

// Update patient phone number
export async function updatePatientPhone(id: number, phone: string) {
  return prisma.patient.update({
    where: { id },
    data: { phone }
  });
}

// Delete a patient
export async function deletePatient(id: number) {
  return prisma.patient.delete({
    where: { id }
  });
}
