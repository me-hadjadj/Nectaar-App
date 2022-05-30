export default function(category = '', action){
    if(action.type == 'saveCategory'){
        return action.category;
    }else{
        return category;
    }
}