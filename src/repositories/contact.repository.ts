import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Contact, ContactRelations} from '../models';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {
  // public readonly account: BelongsToAccessor<Account, typeof Contact.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    // @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Contact, dataSource);
    // this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    // this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
