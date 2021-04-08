"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_store_1 = require("../data/data.store");
const lodash_1 = __importDefault(require("lodash"));
const mutation = {
    Mutation: {
        cursoNuevo(__, { curso }) {
            const itemCurso = {
                id: String(data_store_1.database.cursos.length + 1),
                title: curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                logo: curso.logo,
                level: curso.level,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            };
            const cursosRepetidos = data_store_1.database.cursos.filter(itemCur => itemCur.title === itemCurso.title);
            if (cursosRepetidos.length === 0) {
                data_store_1.database.cursos.push(itemCurso);
                return itemCurso;
            }
            return {
                id: '-1',
                title: `el curso ya existe con este titulo`,
                description: '',
                clases: -1,
                time: 0.0,
                logo: '',
                level: 'TODOS',
                path: '',
                teacher: '',
                reviews: []
            };
        },
        modificarCurso(__, { curso }) {
            const existeElemento = lodash_1.default.findIndex(data_store_1.database.cursos, function (o) {
                return o.id === curso.id;
            });
            if (existeElemento > -1) {
                const valoraciones = data_store_1.database.cursos[existeElemento].reviews;
                curso.reviews = valoraciones;
                data_store_1.database.cursos[existeElemento] = curso;
                return curso;
            }
            return {
                id: '-1',
                title: `el curso NO existe`,
                description: '',
                clases: -1,
                time: 0.0,
                logo: '',
                level: 'TODOS',
                path: '',
                teacher: '',
                reviews: []
            };
        },
        eliminarCurso(__, { id }) {
            const borrarCurso = lodash_1.default.remove(data_store_1.database.cursos, function (curso) {
                return curso.id === id;
            });
            if (borrarCurso[0] === undefined) {
                return {
                    id: '-1',
                    title: `error al eliminar ya que el curso NO existe`,
                    description: '',
                    clases: -1,
                    time: 0.0,
                    logo: '',
                    level: 'TODOS',
                    path: '',
                    teacher: '',
                    reviews: []
                };
            }
            return borrarCurso[0];
        }
    }
};
exports.default = mutation;
