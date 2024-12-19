import axios from "axios"

export interface Category{
    id: number,
    category_name: string
}

export const fetchCategory = async (): Promise<Category[]> => {
    const response = await axios.get<Category[]>(
      "http://localhost:5205/api/category"
    );
    return response.data;
}