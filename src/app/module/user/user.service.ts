import bcrypt from "bcrypt";
import { patientInputData } from "./user.validation.js";
import { prisma } from "../../shared/prisma.js";
import { UserRole } from "@prisma/client";
import { AppError } from "../../errors/AppError.js";

const createPatient = async (data: patientInputData, file: any) => {
  const hashPassword = await bcrypt.hash(data.password, 10);

  const isExistingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (isExistingUser) {
    throw new AppError(400, "User already exists");
  }
  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: {
        email: data.email,
        password: hashPassword,
      },
    });

    const patient = await tx.patient.create({
      data: {
        name: data.name,
        email: data.email,
        profilePhoto: file?.path,
      },
    });

    return {
      user,
      patient,
    };
  });

  return result;
};

const createDoctor = async (data: any, file: any) => {
  const isExistingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (isExistingUser) {
    throw new AppError(400, "User already exists");
  }
  const hashPassword = await bcrypt.hash(data.password, 10);

  const result = await prisma.$transaction(async (txx) => {
    const user = await txx.user.create({
      data: {
        email: data.email,
        password: hashPassword,
        role: UserRole.DOCTOR,
      },
    });

    const doctor = await txx.doctor.create({
      data: {
        name: data.name,
        email: data.email,
        profilePhoto: file?.path,
        contactNumber: data.contactNumber,
        address: data.address,
        registrationNumber: data.registrationNumber,
        experience: data.experience,
        gender: data.gender,
        appointmentFee: data.appointmentFee,
        qualification: data.qualification,
        currentWorkingPlace: data.currentWorkingPlace,
        designation: data.designation,
      },
    });
    return {
      user,
      doctor,
    };
  });

  return result;
};

const createAdmin = async (data: any, file: any) => {
  console.log(data, file);
  const isExitingEmail = await prisma.user.findUnique({
    where: { email: data.email },
  });
  if (isExitingEmail) {
    throw new AppError(400, "User already Exit");
  }

  const hashPassword = await bcrypt.hash(data.password, 10);

  const result = await prisma.$transaction(async (tx)=>{

    return await tx.user.create({
      data : {
        email : data.email,
        password : hashPassword,
        role : UserRole.ADMIN
      }
    })
    return await tx.admin.create({
      data : {
        name : data.name,
        email : data.email,
        profilePhoto : file.path,
        contactNumber : data.contactNumber
      }
    })



  })
  return result


};

// {
//   name: 'Dr. Ahmed Rahman',
//   email: 'aha@example.com',
//   password: 'Doctor1111@',
//   contactNumber: '+8801712345678'
// } {
//   fieldname: 'file',
//   originalname: 'abu taher.jpeg',
//   encoding: '7bit',
//   mimetype: 'image/jpeg',
//   path: 'https://res.cloudinary.com/hogzikuw/image/upload/v1784007186/jl7whsx7plq-1784007183275-abu-taher-jpeg.jpeg.jpg',
//   size: 246779,
//   filename: 'jl7whsx7plq-1784007183275-abu-taher-jpeg.jpeg'
// }

const getAllUser = async () => {
  const user = await prisma.user.findMany();
  return user;
};
export const userService = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUser,
};
