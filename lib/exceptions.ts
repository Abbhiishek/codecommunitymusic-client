'use client'

export class AuthRequiredError extends Error {
    constructor(message = "Authentication required for this action") {
        super(message);
        this.name = "AuthRequiredError";
    }
}


export class ResourceNotFoundError extends Error {
    constructor(message = "Resource not found") {
        super(message);
        this.name = "ResourceNotFoundError";
    }
}