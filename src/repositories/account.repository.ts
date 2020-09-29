import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Account, AccountRelations, Contact} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ContactRepository} from './contact.repository';

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
> {

  public readonly contacts: HasManyRepositoryFactory<Contact, typeof Account.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ContactRepository') protected contactRepositoryGetter: Getter<ContactRepository>,
  ) {
    super(Account, dataSource);
    this.contacts = this.createHasManyRepositoryFactoryFor('contacts', contactRepositoryGetter,);
    this.registerInclusionResolver('contacts', this.contacts.inclusionResolver);
  }
}
