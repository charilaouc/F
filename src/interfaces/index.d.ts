export interface ICategory {
    id: string;
    title: string;
}

export interface IPost {
    id: string;
    title: string;
    content: string;
    category?: string;
}

export interface IContacts {
    id: number,
    email: string,
    status: string,
    first_name: string,
    last_name: string,
    phone_number: boolean,
    rating: number,
}