import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthLoggingMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const startTime = Date.now();

    // Registra la solicitud entrante
    console.log(`[Request] ${method} ${originalUrl}`);

    // Registra la respuesta cuando se completa
    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - startTime;
      console.log(`[Response] ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });

    next();
  }
}