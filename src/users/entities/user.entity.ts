import {
  Permission,
  PermissionType,
} from 'src/iam/authorization/permission.type';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ enum: Role, default: Role.Regular })
  role: Role;

  /**
   * NOTE: permissions and role columns together in a table doesn't make sense.
   * this is used for experiment.
   *
   * also, in real-world applications, permissions should be stored
   * in its dedicated table, and establish a many-to-many relation instead of JSON.
   *
   * you could make a granular access control, by tighting permissions to a specific role.
   */
  @Column({ enum: Permission, default: [], type: 'json' })
  permissions: PermissionType[];
}
