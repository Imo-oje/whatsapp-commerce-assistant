declare global {
  namespace Express {
    interface Request {
      userId: string;
      sessionId: string;
      cloudinaryImages?: { secure_url: string; public_id: string }[];
    }
  }
}

export {};
