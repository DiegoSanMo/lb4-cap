import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  // name: 'db',
  // connector: 'postgresql',
  // host: 'ec2-34-237-89-96.compute-1.amazonaws.com',
  // port: 5432,
  // user: 'eiivqxktfssoew',
  // password: '7f6f69d2e65112191097ac88408004a13b92c1894f27f2a9e6909c31955dcaaf',
  // database: 'd8amjkh7nbj5lf',
  name: 'db',
  connector: 'postgresql',
  host: 'ec2-54-165-36-134.compute-1.amazonaws.com',
  port: 5432,
  user: 'fkjqfyszutcdic',
  password: '03661bca5994327aea712161da52abee925c1382881fbc9cd79c1db98a4cbecf',
  database: 'd7dbelejd11clt',
  ssl: {rejectUnauthorized: false},
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
