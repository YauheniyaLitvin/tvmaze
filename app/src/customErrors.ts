const HTTP_BAD_REQUEST = 400
const HTTP_NOT_FOUND = 404

export class ValidationError extends Error {
    public code:any
    constructor(message:string) {
      super(message)
      this.code = HTTP_BAD_REQUEST
    }
}

export class NotFoundError extends Error {
  public code:any
  constructor(message:string) {
    super(message)
    this.code = HTTP_NOT_FOUND
  }
}