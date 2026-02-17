import { DefaultEntity } from 'src/enum/common/entity/default.entity';
import { ApplicationStatusEnum } from 'src/enum/common/enums/application.enum';
import { IdType } from 'src/id-type/entities/id-type.entity';
import { UserAccountEntity } from 'src/user-account/entities/user-account.entity';

export class Application extends DefaultEntity {
  userId: String;
  idTypeId: String;
  status: ApplicationStatusEnum;

  User: UserAccountEntity;
  IdType: IdType;
}
