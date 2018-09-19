export function isInteger(param:any):boolean{
    return (!param || (Number.isInteger(+param)&&(+param>=0)))
}