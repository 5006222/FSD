const events=require("events");
const eventEmitter=new events.EventEmitter();

eventEmitter.on('even',(num)=>{
        console.log(`Even Number are:${num}`);
});

eventEmitter.on('odd',(num)=>{
    console.log(`odd Number are:${num}`);
});

for(let i=1;i<=200;i++)
{
    if(i%2 === 0)
    {
        eventEmitter.emit('even',i);
    }
    else{
        eventEmitter.emit('odd',i);
        
    }
}