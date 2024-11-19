
interface Option {
    text: string;
    isCorrect: boolean;
  }
  
  interface Quiz {
    question: string;
    options: Option[];
  }

export interface Ilesson{
    title:string;
    description:string;
    video:string;
    quizzes:Quiz[]
}
export interface ISections{
    title:string;
    description:string;
    lessons:Ilesson[]
}

export interface ICourse{
    courseId?:string;
    courseTitle: string;
    courseDesc: string;
    status:boolean;
    coursePrice: number;  
    courseDiscountPrice: number;  
    courseCategory: string;
    courseLevel: string;
    demoURL: string;
    enrolledUsers:string[]
    thumbnail: string;
    prerequisite: string[];
    benifits: string[];
    sections:ISections[]
    
}