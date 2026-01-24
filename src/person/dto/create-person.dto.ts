import { PickType } from '@nestjs/swagger';
import { Person } from '../entities/person.entity';

export class CreatePersonDto extends PickType(Person, [
  // 'id',
  'name',
  'email',
  'password',
]) {}
