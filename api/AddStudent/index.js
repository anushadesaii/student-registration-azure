const sql = require("mssql");

module.exports = async function (context, req) {

    const { name, rollNumber, course } = req.body;

    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        options: {
            encrypt: true
        }
    };

    try {
        await sql.connect(config);

        await sql.query`
            INSERT INTO Students (Name, RollNumber, Course)
            VALUES (${name}, ${rollNumber}, ${course})
        `;

        context.res = {
            status: 200,
            body: "Student added successfully"
        };
    } catch (err) {
        context.res = {
            status: 500,
            body: err.message
        };
    }
};
