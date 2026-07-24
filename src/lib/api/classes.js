const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
 export const getTrainerClasses = async (trainerId)=>{
    const res = await fetch(`${baseUrl}/api/classes?classId=${trainerId}`)
 }