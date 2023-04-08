const express=require("express");
// const bodyParser  = require('body-parser');

const port=process.env.PORT||8000;
require("./db/conn");
const User=require("./sc/schema");


app=express();
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.get("/",(req,res)=>{
res.send("hello");
});
app.post("/register", async (req, res) => {
    console.log(req.body);
    const newuser = new User(req.body);
    const { Username, Email, Password, ConfirmPassword, Branch, Semester } = req.body;
  
    if (!Username || !Email || !Password || !ConfirmPassword || !Branch || !Semester) {
        console.log();
      return res.status(400).send({ message: "no its wrong" });
    }
  
    if (Password !== ConfirmPassword) {
      return res.status(401).send({ message: "no its wrong" });
    }
  
    const x = await newuser.save();
    return res.send({ message: "yes all good" });
  });

// app.post("/register",async(req,res)=>{
//     console.log(req.body);
//     const newuser=new User(req.body);
//    const  {Username,Email,Password,Confirmpassword,Branch,Semester}=req.body;
// //    console.log(username);
// if(!Username||!Email||!Password||!Confirmpassword||!Branch||!Semester){
//     res.status(400).send({"message": "no its wrong"});
    
// }
// if(Password!=Confirmpassword){
//     res.status(401).send({"message": "no its wrong"});

// }
// if(Password===Confirmpassword){
//     res.send({"message":"yes all good"});
// }
// // newuser.username=username;
// // newuser.email=email;
// // newuser.password=password;
// // newuser.confirmpassword=confirmpassword;
// // newuser.branch=branch;
// // newuser.semester=semester;
 
// const x= await newuser.save();

    
// })
app.post('/login', async (req, res) => {
    const {Username, password } = req.body;
  
    try {
      // find user by email
      const user = await User.findOne({ Username });
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
  
      // compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).send({ message: 'Invalid password' });
      }
      else{
        return res.send({"message":"yes"});
      }
  
      // generate JWT token
    //   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    //   res.send({ token });
  
    } catch (err) {
      console.error(err);
      res.status(404).send({ message: 'Server error' });
    }
  });



app.listen(port,()=>{
    console.log("connect is stablised");
})
