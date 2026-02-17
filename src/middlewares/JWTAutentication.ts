import { inject, injectable } from "inversify";
import { ExpressMiddlewareInterface, Middleware, UnauthorizedError } from "routing-controllers";
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import {
  ILogger,
  ILoggerFactory,
  ILoggerFactoryType,
} from "../utils/LoggerFactory";

@Middleware({ type: "before" })
@injectable()
export class JwtAuthenticationMiddleware implements ExpressMiddlewareInterface {
  private logger: ILogger;

  constructor(@inject(ILoggerFactoryType) loggerFactory: ILoggerFactory) {
    this.logger = loggerFactory.createLogger(this);
  }

  public use(req: Request, res: Response, next: NextFunction): void {   

    if (req.path === '/auth/login' || req.path.startsWith('/menu-items') || req.path === '/docs' || req.path === "/getstream/webhook") {
        return next();
    }
    passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
      if (err) {
        this.logger.error(`Error in JWT Authentication: ${err}`);
        return next(err);
      }
      if (!user) {
        this.logger.warn(`Unauthorized access attempt: ${info}`);
        throw new UnauthorizedError("INVALID_TOKEN");
      }
      res.locals.usuario = user; 
      
      next();
    })(req, res, next);
  }
}