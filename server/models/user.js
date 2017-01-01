import bookshelf from '../bookshelf';

// define model with bookshelf for User model

export default bookshelf.Model.extend({
   tableName: 'users'
});

