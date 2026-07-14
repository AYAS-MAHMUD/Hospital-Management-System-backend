import bcrypt from "bcrypt";
import { IUserQuery, patientInputData } from "./user.validation.js";
import { prisma } from "../../shared/prisma.js";
import { Prisma, UserRole } from "@prisma/client";
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

    const user =  await tx.user.create({
      data : {
        email : data.email,
        password : hashPassword,
        role : UserRole.ADMIN
      }
    })
    const admin =  await tx.admin.create({
      data : {
        name : data.name,
        email : data.email,
        profilePhoto : file.path,
        contactNumber : data.contactNumber
      }
    })
    return { user , admin}



  })
  return result


};

const getAllUser = async (query: IUserQuery) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;
  const searchTerm = query.searchTerm || "";


 const searchableFields = ["email"]; 

  // const whereCondition : Prisma.UserWhereInput = searchTerm
  //   ? {
  //       OR: [
  //         {
  //           email: {
  //             contains: searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //         {
  //           role : {
  //             equals : searchTerm as UserRole,
  //           }
  //         }
  //       ],
  //     }
  //   : {};

  const whereCondition  = searchTerm ? {
    OR : searchableFields.map((i)=>({
      [i] : {
        contains : searchTerm,
        mode : "insensitive"
      }
    })),
  } : {};


  const users = await prisma.user.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.user.count({
    where: whereCondition,
  });

  return {
    meta: {
      page,
      limit,
      total,
      totalPage: Math.ceil(total / limit),
    },
    data: users,
  };
};

export const userService = {
  createPatient,
  createDoctor,
  createAdmin,
  getAllUser,
};
