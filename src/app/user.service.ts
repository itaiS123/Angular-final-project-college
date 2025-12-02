import { UserService as NewUserService } from './services/user-service';

// Provide the new service under the old name for compatibility
export { NewUserService as UserService };
