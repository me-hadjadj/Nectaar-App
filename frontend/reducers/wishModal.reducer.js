export default function (wishModalSeen = false, action) {
    if (action.type === "wishModalSeen") {
      let newWishModalSeen = true;
      console.log("log newWishModalSeen :",newWishModalSeen);
      return newWishModalSeen;
    } 
    else {
      return wishModalSeen;
    }
  }