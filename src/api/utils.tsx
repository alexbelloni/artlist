export const GetDisplayableDate = (date: number)=>{
    return (new Date(date)).toString().substring(0,24)
}

export const GetSecondsApart= (dateStart: number, dateEnd:number)=>{
    //number of milliseconds
    return (new Date(dateEnd)).getTime() - (new Date(dateStart)).getTime();
}