import { ErrorElement} from "./types";

export class ValidationError extends Error {
    constructor(message: string, errors: ErrorElement) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createValidationError(errors) {
        return new ValidationError('validationError', errors);
    }
}


export class RedirectError extends Error {
    constructor(message: string, errors: any) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createRedirectError(errors) {
        return new ValidationError('redirectError', errors);
    }
}

export class ModalError extends Error {
    message: string
    errors?: any
    constructor(message: string, errors: any) {
        super(message);
        this.message = message,
        this.errors = errors;
    }

    static createModalError(errors) {
        return new ModalError('modalError', errors);
    }
}


export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }

    static createUnauthorizedError(message) {
        return new UnauthorizedError(message);
    }
}

export class UnderfindError extends Error {
    constructor(message: string) {
        super(message);
        this.message = message;
    }
}