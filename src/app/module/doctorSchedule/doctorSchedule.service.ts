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

export const doctorScheduleService = {
  doctorScheduleInsert,
};
