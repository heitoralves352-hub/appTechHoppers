import path from 'path';
import connection from './src/database/connection';

module.exports = {
    client:'sqlite3' ,
    connection: {
        __filename:path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true
};

