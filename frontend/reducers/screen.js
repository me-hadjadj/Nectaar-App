export default function(screen = '',action){
    if(action.type === "saveReturnScreen"){
        return action.screen;
    }else{
        return screen;
    }
}