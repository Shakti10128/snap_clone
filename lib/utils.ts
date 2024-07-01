import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// javaSript code get it from the google
// HW -> we will look into more to know how it's working
export const readFileAsDataURL = async(file : File | Blob) : Promise<string> =>{
  return new Promise((resolve)=>{
    const reader = new FileReader();
    reader.onloadend = () =>{
      if(typeof reader.result === 'string') resolve(reader.result);
    };
    reader.readAsDataURL(file);
  })
}

export const dateToYMD = (date:any):string=> {
  var strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var d = date.getDate();
  var m = strArray[date.getMonth()];
  return ''+ m + ' ' + (d <= 9 ? '0' + d : d);
}