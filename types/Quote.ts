export interface QuoteData {
    message: string;
    time_taken: string;
    server: string;
    data: Quote;
}


export interface Quote {
    id: string;
    author: string;
    en: string;
}