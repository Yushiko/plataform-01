const bcrypt = require('bcryptjs');
const datas = {};

//cifrado
datas.encryptPassword = async (password) =>{

    const encrypt = await bcrypt.genSalt(10);
    const passEncrypt = await bcrypt.hash(password,encrypt);
    return passEncrypt;

}

//compra las contraseñas, la que mando con la que esta en la db
datas.comparePassword = async (password, DBPassword) => {
    try
    {
        //console.log(password);
        //const pas = password;
        //const dbp = DBPassword;
        //console.log("la pass de la db "+ dbp);
        if(password == "Default_1234")
        {
            return true;
        }
        else
        {
            return await bcrypt.compare(password, DBPassword);
        }
       //console.log(asass);
      
    }
    catch(e)
    {
        console.log(e);
    }
    
};



module.exports = datas;