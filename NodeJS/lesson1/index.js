console.log("Hello Node.js");

//Импортируем модуль
const ansi = require("ansi");

//Создаем курсор
const cursor = ansi(process.stdout);

cursor
  .white() //Color
  .bg.green() // Background
  .write("Hello world!")
  .reset()
  .bg.reset()
  .write("\n");

  //Импортируем colors
  const colors = require("colors");

  console.log('Т'.green + 'ect'.trap + 'овый'.zebra + 'запу'.bgCyan + 'ск мо'.magenta + 'дуля'.america)
