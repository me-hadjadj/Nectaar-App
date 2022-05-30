export default function(user = {}, action){
    if(action.type === 'saveUserInfo'){
        return action.user
    }else if(action.type === 'updateTickets'){
        var ticketsRestants = user.ticketsRemaining - action.number
        return {...user, ticketsRemaining: ticketsRestants}
    }else if(action.type === 'updateSub'){
        return {...user, subscriptionName: action.name}
    }else if(action.type === 'deleteUserInfo'){
        return {}
    }else if(action.type === 'updateTicketsWithSub'){
        return {...user, ticketsRemaining: action.number}
    }else{
        return user
    }
}