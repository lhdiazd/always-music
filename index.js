const { Pool } = require('pg');

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'always_music',
    password: '1234',
    port: 5432,
};

const pool = new Pool(config);

async function addStudent(args) {
    const [nombre, rut, curso, nivel] = args;
    try {
        const query = 'INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)';
        const values = [nombre, rut, curso, nivel];
        const result = await pool.query(query, values);
        console.log(`Estudiante ${nombre} agregado con éxito`);
    } catch (error) {
        console.error('Error al agregar estudiante:', error);
    } finally {
        pool.end();
    }
}

async function listStudents() {
    try {
        const query = 'SELECT * FROM estudiantes';
        const result = await pool.query(query);
        console.log(result.rows);
    } catch (error) {
        console.error('Error al traer datos de estudiantes registrados', error);
    } finally {
        pool.end();
    }
}

async function findStudentByRut(rut) {
    try {        
        const query = 'SELECT * FROM estudiantes WHERE rut=$1';
        const result = await pool.query(query, rut );
        console.log(result.rows);
    } catch (error) {
        console.error('Rut no encontrado', error);
    } finally {
        pool.end();
    }
}

async function updateStudent(args) {
    const [nombre, rut, curso, nivel] = args;
    try {
        const query = 'UPDATE estudiantes SET nombre=$1, curso=$3, nivel=$4 WHERE rut=$2';
        const values = [nombre, rut, curso, nivel];
        const result = await pool.query(query, values);
        console.log(`Estudiante ${nombre} actualizado con éxito`);
    } catch (error) {
        console.error('Error al actualizar estudiante:', error);
    } finally {
        pool.end();
    }
}

async function deleteStudentByRut(rut) {
    try {        
        const query = 'DELETE FROM estudiantes WHERE rut=$1';
        const result = await pool.query(query, rut);
        console.log('Estudiante eliminado con éxito');
    } catch (error) {
        console.error('Rut no encontrado', error);
    } finally {
        pool.end();
    }
}



const command = process.argv[2];
const args = process.argv.slice(3);


switch (command) {
    case 'nuevo':
        addStudent(args);
        break;
    case 'consulta':
        listStudents();
        break;
    case 'rut':
        findStudentByRut(args);
        break;
    case 'actualizar':
        updateStudent(args);
        break;
    case 'eliminar':
        deleteStudentByRut(args);
        break;
    default:
        console.log('Error de comando');

}