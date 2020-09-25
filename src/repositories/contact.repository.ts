import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Contact, ContactRelations, Account} from '../models';
import {AccountRepository} from './account.repository';

export class ContactRepository extends DefaultCrudRepository<
  Contact,
  typeof Contact.prototype.id,
  ContactRelations
> {

  public readonly accountid: HasOneRepositoryFactory<Account, typeof Contact.prototype.id>;
  // public readonly account: BelongsToAccessor<Account, typeof Contact.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
    // @repository.getter('AccountRepository') protected accountRepositoryGetter: Getter<AccountRepository>,
  ) {
    super(Contact, dataSource);
    this.accountid = this.createHasOneRepositoryFactoryFor('accountid', accountRepositoryGetter);
    this.registerInclusionResolver('accountid', this.accountid.inclusionResolver);
    // this.account = this.createBelongsToAccessorFor('account', accountRepositoryGetter,);
    // this.registerInclusionResolver('account', this.account.inclusionResolver);
  }
}
