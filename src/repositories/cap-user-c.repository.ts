import {DefaultCrudRepository} from '@loopback/repository';
import {CapUserC, CapUserCRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class CapUserCRepository extends DefaultCrudRepository<
  CapUserC,
  typeof CapUserC.prototype.id,
  CapUserCRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(CapUserC, dataSource);
  }
}
