import { uniqueId } from '../helpers/dbHelpers.js'

export default {
    foods: [
        {
            id: uniqueId(),
            date: "2021-08-06",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Wok de fideos integrales con vegetales + pollo + hummus"
        },
        {
            id: uniqueId(),
            date: "2021-08-06",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "manzana + manteca mani  + galletitas lincoln"
        },
        {
            id: uniqueId(),
            date: "2021-08-07",
            time: "15:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Lasagna de berenjena con pollo y salsa de tomate / dos barras de cereal"
        },
        {
            id: uniqueId(),
            date: "2021-08-07",
            time: "16:40:00",
            type: { id: 1, desc: "snack" },
            desc: " un alfajor de maicena/ una coca / dos brownies /un budin"
        },
        {
            id: uniqueId(),
            date: "2021-08-08",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Medallon de Quinoa al curry + vegetales al horno"
        },
        {
            id: uniqueId(),
            date: "2021-08-08",
            time: "18:40:00",
            type: { id: 1, desc: "snack" },
            desc: "Dos medialunas"
        },
        {
            id: uniqueId(),
            date: "2021-08-08",
            time: "19:40:00",
            type: { id: 1, desc: "snack" },
            desc: "Sandwich chico en pan arabe de pollo y tomate"
        },
        {
            id: uniqueId(),
            date: "2021-08-08",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "Sandwich chico en pan arabe de pollo y tomate + 1TE + 1 chocolate aereado blanco y negro 55gr"
        },
        {
            id: uniqueId(),
            date: "2021-08-09",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Risotto de yamani con crema de batata + rawmensan / un pan figasa"
        },
        {
            id: uniqueId(),
            date: "2021-08-09",
            time: "22:40:00",
            type: { id: 1, desc: "snack" },
            desc: "Un te"
        },
        {
            id: uniqueId(),
            date: "2021-08-09",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "Sandwich chico en pan arabe de pollo y tomate + 4 galletitas macucas + 1 te + 1 manzana"
        },
        {
            id: uniqueId(),
            date: "2021-08-10",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Pastel de Merluza con pure de batata/ con un pan chico + 3 magdalenas rellenas"
        },
        {
            id: uniqueId(),
            date: "2021-08-10",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Dos medialunas + 1 cafe chico (ypf)"
        },
        {
            id: uniqueId(),
            date: "2021-08-10",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "2 barras cereal mix chocolate + 1 gatorade manzana"
        },
        {
            id: uniqueId(),
            date: "2021-08-10",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "2 bifes con chucrut + 1 magdalena rellena y un te de canela"
        },
        {
            id: uniqueId(),
            date: "2021-08-11",
            time: "11:40:00",
            type: { id: 2, desc: "breakfast" },
            desc: "1 magdalena rellena"
        },
        {
            id: uniqueId(),
            date: "2021-08-11",
            time: "11:40:00",
            type: { id: 2, desc: "breakfast" },
            desc: "Dos medialunas + 1 cafe chico (ypf)"
        },
        {
            id: uniqueId(),
            date: "2021-08-11",
            time: "6:40:00",
            type: { id: 1, desc: "snack" },
            desc: "un te de canela"
        },
        {
            id: uniqueId(),
            date: "2021-08-11",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "Mil hojas de vegetales con queso + 2 bolas de fraile rellenas +1 te de canela"
        },
        {
            id: uniqueId(),
            date: "2021-08-12",
            time: "13:40:00",
            type: { id: 3, desc: "lunch" },
            desc: "Roll de peceto, mozzarella, morrones, panceta, cebolla, queso + 1 cafe chico"
        },
        {
            id: uniqueId(),
            date: "2021-08-12",
            time: "9:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "2 manzanas + 1 banana + 2 fetas de lomo ahumado"
        },
        {
            id: uniqueId(),
            date: "2021-08-12",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "Salchicha de porotos blancos + tabule de trigo burgol + salsa criolla"
        },
        {
            id: uniqueId(),
            date: "2021-08-13",
            time: "11:40:00",
            type: { id: 2, desc: "breakfast" },
            desc: "Dos medialunas + 1 cafe mediano(ypf)"
        },
        {
            id: uniqueId(),
            date: "2021-08-13",
            time: "12:40:00",
            type: { id: 2, desc: "breakfast" },
            desc: "Dos medialunas + 1 cafe mediano(ypf)"
        },
        {
            id: uniqueId(),
            date: "2021-08-13",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "Tortilla de acelga y puerro con queso + 2 magdalenas rellenas"
        },
        {
            id: uniqueId(),
            date: "2021-08-13",
            time: "14:40:00",
            type: { id: 1, desc: "snack" },
            desc: "1 cafe mediano (ypf) + franui"
        },
        {
            id: uniqueId(),
            date: "2021-08-14",
            time: "20:40:00",
            type: { id: 4, desc: "dinner" },
            desc: "Hamburguesa completa con papas fritas + 1 coca cola"
        },
        {
            id: uniqueId(),
            date: "2021-08-14",
            time: "16:40:00",
            type: { id: 1, desc: "snack" },
            desc: "1 cafe"
        }
    ]
}