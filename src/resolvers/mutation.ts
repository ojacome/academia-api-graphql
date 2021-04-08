import { IResolvers } from "graphql-tools";
import { database } from "../data/data.store";





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
            
            database.cursos.push(itemCurso);
            return itemCurso;
        }        
    }
}




export default mutation;