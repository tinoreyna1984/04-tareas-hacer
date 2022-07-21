require("colors");
const inquirer = require("inquirer");

// arreglo de opciones a escoger en el menu inquirer
const menuOpts = [
  {
    type: "list",
    name: "opcion",
    message: "Que desea hacer?",
    choices: [
      { value: "1", name: "1. Crear tarea".green },
      { value: "2", name: "2. Listar tareas".blue },
      { value: "3", name: "3. Listar tareas terminadas".blue },
      { value: "4", name: "4. Listar tareas pendientes".blue },
      { value: "5", name: "5. Completar tareas".green },
      { value: "6", name: "6. Borrar tarea".red },
      { value: "0", name: "0. Salir".bgYellow },
    ],
  },
];

const pausa = async (msg) => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: msg,
    },
  ];
  await inquirer.prompt(question);
};

// menu de opciones con inquirer
const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".bgMagenta.bold);
  console.log("  Seleccione una opción   ".bgMagenta);
  console.log("==========================\n".bgMagenta.bold);

  const { opcion } = await inquirer.prompt(menuOpts);

  return opcion;
};

// leer una entrada de texto
const leerInput = async (message = "") => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length) return true;
        else return "Por favor, ingrese una descripción: ".bgRed;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas = []) => {

  const choices = tareas.map((tarea, i) => {
    const idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
    };
  });

  choices.push({
    value: "0",
    name: "0. Cancelar",
  })

  const preguntas = [
    {
      type: "list",
      name: "id",
      message: "Borrar",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(preguntas);

  return id;
};

const mostrarListadoChecklist = async (tareas = []) => {

  const choices = tareas.map((tarea, i) => {
    const idx = i + 1;
    return {
      value: tarea.id,
      name: `${idx}. ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false,
    };
  });

  /* choices.push({
    value: "0",
    name: "0. Cancelar",
  }) */

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Seleccione",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);

  return ids;
};

const confirmar = async (message) => {
  const preguntas = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(preguntas);

  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist,
};
