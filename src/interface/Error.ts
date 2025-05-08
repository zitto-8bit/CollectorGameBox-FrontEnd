export interface ValidationErrorResponse {
  status: number;
  erros: {
    [campo: string]: string;
  };
}
