import { injectable } from 'inversify';
import { initMysql } from './connection.manager';
import { mapDbItems, organizationUserMapper } from './dbMapper';
import { IUserRepository } from '@repos/user.repository.interface';
import { User } from '@models/user';

@injectable()
export class MySQLUserRepository implements IUserRepository {
  async add(user: User): Promise<boolean> {
    let connection: any;

    const organizationId = user.organizationId;
    const firstName = user.firstName;
    const lastName = user.lastName;
    const email = user.email;
    const phoneNumber = user.phoneNumber;

    try {
      connection = await initMysql();
      await connection.query(
        `INSERT INTO User(OrganizationId, FirstName, LastName, Email, PhoneNumber) VALUES (${organizationId} , ${firstName} , ${lastName},${email},${phoneNumber})`,
      );
      return true;
    } catch (err) {
      throw err;
    } finally {
      if (connection != null) {
        await connection.close();
      }
    }
  }

  get(_itemId: number): User {
    throw new Error('Method not implemented.');
  }
  update(_itemId: number, _item: User) {
    throw new Error('Method not implemented.');
  }
  delete(_itemId: number) {
    throw new Error('Method not implemented.');
  }
}
