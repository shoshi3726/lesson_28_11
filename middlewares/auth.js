const { config } = require("../config/secret");
const jwt = require("jsonwebtoken");


// פונקצית מידל וואר שבודקת טוקן
// middleware
exports.auth = async(req,res,next) => {
  let token = req.header("x-api-key")
  if(!token){
    return res.status(401).json({msg:"You need to send token to this endpoint url 66666"})
  }
  try{
    // מנסה לפענח את הטוקן ויכיל את כל המטען/מידע שבתוכו
    // ובמיוחד את האי די
    let tokenData = jwt.verify(token, config.tokenSecret);
    // דואג להעיבר את המאפיין של הטוקן דאטא לפונקציה הבאה בשרשור
    // שאנחנו מזמנים בנקסט ככה שתיהיה חשופה למידע
    // במקרה הזה האיי די שפענחנו מהטוקן
    req.tokenData = tokenData
    // next() -> אם הכל בסדר לעבור לפונקציה הבאה שרשור
    next()
  }
  catch(err){
   return res.status(401).json({msg:"Token not valid or expired 77777777"})
  }
}
exports.authAdmin = (req,res,next) => {
  let token = req.header("x-api-key");
  if(!token){
    return res.status(401).json({msg:"You need to send token to this endpoint url 7777"})
  }
  try{
    let decodeToken = jwt.verify(token,config.tokenSecret);
    // check if the role in the token of admin
    if(decodeToken.role != "admin"){
      return res.status(401).json({msg:"Token invalid or expired, code: 6A"})
    }
   
    // add to req , so the next function will recognize
    // the tokenData/decodeToken
    req.tokenData = decodeToken;

    next();
  }
  catch(err){
    console.log(err);
    return res.status(401).json({msg:"Token invalid or expired, log in again or you hacker!"})
  }
}