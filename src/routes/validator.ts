export function  validateQuety( query:any ):boolean{  
    let {page, limit} = query
    if ( isNotInteger(page) || isNotInteger(limit) ) return false   
    return true   
}

export function isNotInteger( param:any ):boolean{      
     return ( !!param && ( !Number.isInteger(+param)|| (+param<1)) ) 
}