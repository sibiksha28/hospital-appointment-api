import prisma from "./lib/prisma.js";

// Create a new doctor
export async function createDoctor(data: {
  name: string;
  specialty: string;
  email: string;
}) {
  return prisma.doctor.create({
    data
  });
}

// Get doctor by ID
export async function getDoctor(id: number) {
  const doctor = await prisma.doctor.findUnique({
    where: { id }
  });

  if (!doctor) {
    throw new Error("Doctor not found");
  }

  return doctor;
}

// List doctors by specialty
export async function listDoctorsBySpecialty(specialty: string) {
  return prisma.doctor.findMany({
    where: {
      specialty: {
        contains: specialty,
        mode: "insensitive"
      }
    },
    orderBy: {
      name: "asc"
    },
    select: {
      id: true,
      name: true,
      specialty: true,
      email: true
    }
  });
}

// Delete a doctor
export async function deleteDoctor(id: number) {
  return prisma.doctor.delete({
    where: { id }
  });
}
