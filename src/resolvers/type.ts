import { IResolvers } from "graphql-tools";
import _ from "lodash";
import { database } from "../data/data.store";



const type: IResolvers = {
    Estudiante: {
        courses: parent => {
            const cursosLista: Array<any> = [];
            parent.courses.map((curso: string) => {
                cursosLista.push(_.filter(database.cursos, ['id', curso])[0] )
            });
            return cursosLista;
        }
    },
    Curso: {
        students: parent => {
            const studentsLista: Array<any> = [];
            const idCurso = parent.id;
            database.estudiantes.map( (estudiante: any) => {
                if ( estudiante.courses.filter((id:any) => id === idCurso) > 0 ){
                    studentsLista.push(estudiante);
                }
            })
            return studentsLista;
        },
        path: parent => `https://www.udemy.com${parent.path}`
    }
}




export default type;