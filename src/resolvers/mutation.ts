import { IResolvers } from "graphql-tools";
import { database } from "../data/data.store";
import _ from "lodash";




const mutation: IResolvers = {
    Mutation: {
        cursoNuevo(__:void, { curso }): any{
            const itemCurso = {
                id:             String(database.cursos.length + 1),
                title:          curso.title,
                description:    curso.description,
                clases:         curso.clases,
                time:           curso.time,
                logo:           curso.logo,
                level:          curso.level,
                path:           curso.path,
                teacher:        curso.teacher,
                reviews:        []
            }
            
            const cursosRepetidos = database.cursos.filter( itemCur => itemCur.title === itemCurso.title);
            if( cursosRepetidos.length === 0 ){
                database.cursos.push(itemCurso);
                return itemCurso;
            }

            return {
                id:             '-1',
                title:          `el curso ya existe con este titulo`,
                description:    '',
                clases:         -1,
                time:           0.0,
                logo:           '',
                level:          'TODOS',
                path:           '',
                teacher:        '',
                reviews:        []
            }
        },
        modificarCurso(__: void, { curso }): any{
            const existeElemento = _.findIndex(database.cursos, function(o) {
                return o.id === curso.id
            })

            if( existeElemento > -1 ){
                const valoraciones = database.cursos[existeElemento].reviews;
                curso.reviews = valoraciones;
                database.cursos[existeElemento] = curso;
                return curso;
            }

            return {
                id:             '-1',
                title:          `el curso NO existe`,
                description:    '',
                clases:         -1,
                time:           0.0,
                logo:           '',
                level:          'TODOS',
                path:           '',
                teacher:        '',
                reviews:        []
            }
        }        
    }
}




export default mutation;