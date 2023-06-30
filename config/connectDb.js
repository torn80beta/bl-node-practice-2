const { connect } = require('mongoose');

const connectDb = async () => {
  try {
    const db = await connect(process.env.DB_URI);
    console.log(
      `Database is connected. Name: ${db.connection.name}. Host: ${db.connection.host}. Port: ${db.connection.port}`
        .green.bold.italic
    );
  } catch (error) {
    console.log(error.message.red.bold);
    process.exit(1);
  }
};

module.exports = connectDb;
