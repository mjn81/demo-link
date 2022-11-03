export class BaseError extends Error {
	
  private code: number;
  constructor(message: string, code: number) {
		super(message);
		this.code = code;
  }
  
  public serializeErrors() {
    return { message: this.message };
  }

  public getCode() {
    return this.code;
  }
}
