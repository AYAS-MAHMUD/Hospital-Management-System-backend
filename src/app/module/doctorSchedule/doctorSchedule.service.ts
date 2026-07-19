import { prisma } from "../../shared/prisma.js";

const doctorScheduleInsert = async (user: any, payload: any) => {
  // console.log({user, payload})

  const doctor = await prisma.doctor.findUnique({
    where: {
      email: user.email,
    },
  });
  const doctorScheduleData = payload.scheduleIds.map((scheduleId: any) => ({
    doctorId: doctor?.id,
    scheduleId,
  }));



  console.log(doctorScheduleData)
  return await prisma.doctorSchedule.createMany({
      data : doctorScheduleData
  })
};


const getDoctorSchedules = async (user : any) => {
  // console.log(user.id)
  // get doctor schedule
  const doctorSchedules = await prisma.doctorSchedule.findMany({
    where: {
      doctor: {
        email: user.email,
      },
    },
    select: {
      scheduleId: true,
    },
  });

  const doctorScheduleIds = doctorSchedules.map((ds) => ds.scheduleId);

  const result = await prisma.schedule.findMany({
    where: {
      id: {
        in: doctorScheduleIds,
      },
    },
  });

  return result
};


const deleteDoctorSchedule = async(id : string) =>{
    return await prisma.schedule.delete({
        where : {
            id
        }
    })
}


export const doctorScheduleService = {
  doctorScheduleInsert,
  getDoctorSchedules,
  deleteDoctorSchedule
};
