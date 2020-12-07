import app from './app'

 function  main(){
     app.listen(process.env.PORT  || 6000);
    console.log(`Server working with  in port: ${process.env.PORT}`)
}

main();