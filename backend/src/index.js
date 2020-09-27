import app from './app'

async function  main(){
    await app.listen(app.get("port"));
    console.log('Server working in port: ',app.get("port"))
}

main();