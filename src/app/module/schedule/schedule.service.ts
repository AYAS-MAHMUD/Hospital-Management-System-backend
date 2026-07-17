
import { addMinutes, addHours, format } from "date-fns";
import { prisma } from "../../shared/prisma.js";

const scheduleInsert = async (payload: any) => {

    const { startTime, endTime, startDate, endDate } = payload;
    // console.log({startDate,endDate,startTime,endTime})

    
    const intervalTime = 30;
    const schedules = [];

    const currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
        const startDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(startTime.split(":")[0]) // 11:00
                ),
                Number(startTime.split(":")[1])
            )
        )

        const endDateTime = new Date(
            addMinutes(
                addHours(
                    `${format(currentDate, "yyyy-MM-dd")}`,
                    Number(endTime.split(":")[0]) // 11:00
                ),
                Number(endTime.split(":")[1])
            )
        )

        while (startDateTime < endDateTime) {
            const slotStartDateTime = startDateTime; // 10:30
            const slotEndDateTime = addMinutes(startDateTime, intervalTime); // 11:00

            const scheduleData = {
                startDateTime: slotStartDateTime,
                endDateTime: slotEndDateTime
            }

            const existingSchedule = await prisma.schedule.findFirst({
                where: scheduleData
            })

            if (!existingSchedule) {
                const result = await prisma.schedule.create({
                    data: scheduleData
                });
                schedules.push(result)
            }

            slotStartDateTime.setMinutes(slotStartDateTime.getMinutes() + intervalTime);
        }

        currentDate.setDate(currentDate.getDate() + 1)
    }

    return schedules;
}


const scheduleForDoctor = async(payload: any)=>{
    // filter startdatetime and enddatetime from payload
    const {startDateTime, endDateTime} = payload;
    const whereCondition  : any = startDateTime && endDateTime ? {
        
            startDateTime : {
                gte : new Date(startDateTime)
            },
            endDateTime : {
                lte : new Date(endDateTime)
            }

        
    } : {}
    const result = await prisma.schedule.findMany({
        where : whereCondition,
        orderBy : {
            startDateTime : "asc"
        }

    })

    const count = await prisma.schedule.count({
        where : whereCondition
    })

    return {
        meta : {
            total : count
        },
        data : result
    }


}


export const scheduleService = {
    scheduleInsert,
    scheduleForDoctor,
} 