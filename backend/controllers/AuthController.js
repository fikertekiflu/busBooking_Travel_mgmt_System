const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');


//register function
exports.register =  async (req, res) => {
try {
    const { name, email , password } =  req.body;

   let user = await User.findOne({email});
   if (user) return res.status(400).json({ message:'User has already registered '});


   const  hasedPssword = await bcrypt.hash(password, 10);
   user = new User({ name, email, password: hashedPassword});

   await user.save();
   res.status(201).json({message:" user registere successfully"});

} catch( error ) {
     res.status(500).json({message: 'Server error'});

}
};

// login fucntion

exports.login =async (req, res) =>{
    try{
        const { email ,password } = req.body;
         const user = await User.findOne({ email });

         if (!user) return res.status(400). json({message: 'invalid credentials'});

         const isMatch = await bcrypt.compare(password, user.password);
         if(isMatch) return res.status(400).json({message:'invalid credentials'});

         const token = jwt.sign(
            { userId: user._id, role: user.role }, // Payload: User ID & role
             process.env.JWT_SECRET, // Secret key from .env file
            { expiresIn: "1h" } // Token expires in 1 hour
    );

    res.json({ token }); // Send token to user
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
         
};


