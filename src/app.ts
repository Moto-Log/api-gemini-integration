import Database from './config/db';
import startUp from './startUp';

let port = process.env.PORT || 3050;

process.on('exit', () => {
    Database.disconnect();
  });

startUp.app.listen(port, function(): void{
    console.log(`executando na porta ${port}`);
});