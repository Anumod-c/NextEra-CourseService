export interface ISections{
    title:string;
    description:string;
    lessons:Ilesson[]
}


export interface Ilesson{
    title:string;
    description:string;
    video:string;
}


export interface ICourse{
    courseId?:string;
    courseTitle: string;
    courseDesc: string;
    status:boolean;
    coursePrice: number;  // Changed to number
    courseDiscountPrice: number;  // Changed to number
    courseCategory: string;
    courseLevel: string;
    demoURL: string;
    enrolledUsers:string[]
    thumbnail: string;
    prerequisite: string[];
    benifits: string[];
    sections:ISections[]
    
}