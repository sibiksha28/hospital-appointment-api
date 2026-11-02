import prisma from "./lib/prisma.js";

async function main() {
  // Clear existing data
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  // Create doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Arun",
      specialty: "Cardiology",
      email: "arun@hospital.com"
    }
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Priya",
      specialty: "Dermatology",
      email: "priya@hospital.com"
    }
  });

  // Create patients
  const patient1 = await prisma.patient.create({
    data: {
      name: "Rahul",
      email: "rahul@example.com",
      phone: "9876543210"
    }
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: "Anitha",
      email: "anitha@example.com",
      phone: "9876543211"
    }
  });

  // Create appointments
  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentDate: new Date("2026-11-05T10:00:00"),
      notes: "Regular checkup"
    }
  });

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      appointmentDate: new Date("2026-11-06T11:00:00"),
      notes: "Skin consultation"
    }
  });

  console.log("Seed data inserted successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
  