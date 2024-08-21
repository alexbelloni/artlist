export const GetDisplayableDate = (date: number)=>{
    return (new Date(date)).toISOString().replace('T', ' ').replace('Z', ' ')
}

export const GetSecondsApart= (dateStart: number, dateEnd:number)=>{
    //number of milliseconds
    return (new Date(dateEnd)).getTime() - (new Date(dateStart)).getTime();
}